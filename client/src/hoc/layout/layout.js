import React from 'react';

import classes from './layout.module.scss'

export const Layout = (props) => {
  return (
    <main className={classes.main}>
      <header></header>
      <div className={classes.wrapper}>
        {props.children}
      </div>
      <footer></footer>
    </main>
  );
};
