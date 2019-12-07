import React from 'react';
import logo from '@/assets/images/logo.svg';
import s from '@/assets/style/App.less';
import Navheader from "@/components/header/header.js";
import Articlelist from "@/components/articleList/articleList.js";
import UserPage from "@/components/pages/userPage/userPageLayout.js";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// 引入router


function App() {

  const routerLinks = [
    {
      title: 'TOP',
      to: 'top'
    },
    {
      title: 'NEW',
      to: 'new'
    },
    {
      title: 'SHOW',
      to: 'show'
    },
    {
      title: 'ASK',
      to: 'ask'
    },
    {
      title: 'JOB',
      to: 'job'
    },
  ]

  return (
    <div className={s.App}>
      <Router>
        <Navheader links={routerLinks} />
        <div className={s.content_wrap}>
          <Switch>
            {/* <Redirect to="/top" component={Articlelist}/> */}
            <Route path="/top" component={Articlelist}></Route>
            <Route path="/new" component={Articlelist}></Route>
            <Route path="/user/:user" component={UserPage}></Route>
            {/* <Redirect to="/top" component={Articlelist}/> */}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

      // <header className={s.App_header}>
      //   <img src={logo} className={s.App_logo} alt="logo" />
      //   <p>
      //     Edit <code>src/App.js</code> and save to reload.
      //   </p>
      //   <a
      //     className={s.App_link}
      //     href="https://reactjs.org"
      //     target="_blank"
      //     rel="noopener noreferrer"
      //   >
      //     Learn React
      //   </a>
      // </header>
export default App;
