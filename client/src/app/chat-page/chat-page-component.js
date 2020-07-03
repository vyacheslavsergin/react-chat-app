import React, {useEffect, useState, useRef} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import io from 'socket.io-client'
import queryString from 'query-string'

import {setChatUser, setChatUsers} from '../../__data__/actions/chat'
import {isEmpty} from '../../ui/utils/validation'
import {SiteLayoutComponent} from '../../app/shared/layouts/site-layout/site-layout-component'
import {ChatMessage} from '../../components/chat-message/chat-message'
import {keysDev} from '../../config/keys'

import classes from './chat-page.module.scss'

const socket = io(keysDev.BASE_URL)

const ChatPageComponent = (props) => {

    const {history, setChatUser, setChatUsers} = props

    const textareaRef = useRef(null)

    const node = document.documentElement

    const {name, room} = queryString.parse(history.location.search)

    const [formControls, setFormControls] = useState({
        message: {
            value: '',
            type: 'text'
        }
    })

    const [user, setUser] = useState({name, room})
    const [messages, setMessages] = useState([])

    useEffect(() => {

        socket.on('connect', () => {
            console.log('Client connected')
        })

        const scrollToBottom = () => {
            setTimeout(() => {
                document.documentElement.scrollTop = node.scrollHeight
            })
        }

        const initializeConnection = (data) => {

            setChatUser({name, room, id: data.userId})
            setUser({name, room, id: data.userId})

            socket.on('users:update', users => {
                setChatUsers(users)
            })

            socket.on('message:new', message => {
                scrollToBottom()
                setMessages((messages) => [...messages, message])
            })
        }

        /**
         * Новый человек был подключен.
         */
        socket.emit('join', {name, room}, data => {
            if (typeof data === 'string') {
                console.error(data)
            } else {
                initializeConnection(data)
            }
        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [name, node, room, setChatUser, setChatUsers])

    const sendMessage = (event) => {
        event.preventDefault()

        const messageData = {
            text: formControls.message.value,
            name: user.name,
            id: user.id,
        }

        socket.emit('message:create', messageData, err => {
            if (err) {
                console.error(err)
            } else {
                setFormControls((formControls) => {
                    return {...formControls, message: {value: ''}}
                })
            }
        })
    }

    const onChangeHandler = (event) => {
        const formControlsLocal = {...formControls}
        formControlsLocal.message.value = event.target.value
        setFormControls(formControlsLocal)
    }

    const onKeyDownHandler = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
        }

        if (event.key !== 'Enter' || isEmpty(event.target.value)) {
            return
        }

        const messageData = {
            text: formControls.message.value.trim(),
            name: user.name,
            id: user.id,
        }

        socket.emit('message:create', messageData, err => {
            if (err) {
                console.error(err)
            } else {
                textareaRef.current.value = ''
                setFormControls((formControls) => {
                    return {...formControls, message: {value: ''}}
                })
            }
        })
    }

    return (
        <SiteLayoutComponent>
            <div className={classes.chat}>
                {
                    !isEmpty(messages) &&
                    messages.map((message, idx) => {
                        return (
                            <ChatMessage
                                key={idx}
                                message={message}
                                userId={user.id}
                            />
                        )
                    })
                }
                <form
                    className={classes.form}
                    onSubmit={sendMessage}
                >
                    <div className="input-field">
                        <textarea
                            ref={textareaRef}
                            id="textarea1"
                            className="materialize-textarea"
                            onChange={event => onChangeHandler(event)}
                            onKeyDown={event => onKeyDownHandler(event)}
                        />
                        <label htmlFor="textarea1">Write a message...</label>
                    </div>
                </form>
            </div>
        </SiteLayoutComponent>
    )
}

ChatPageComponent.propTypes = {
    setChatUser: PropTypes.func.isRequired,
    setChatUsers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({chat: state.chat})

const mapDispatchToProps = {setChatUser, setChatUsers}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPageComponent)
