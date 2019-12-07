import React from 'react';
// import PropTypes from 'prop-types';
import s from "./userPageLayout.less";
// import { NavLink, withRouter } from 'react-router-dom'

class UserPageLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const { match } = this.props
        let userName = match.params.user
        return (
            <div className={s.user_wrapper}>
                <h1 className={s.title}>{userName}</h1>
                <ul>
                    <li>创建日期：{1} 天前</li>
                    <li>贡献值：{2}</li>
                    <li className={s.about}></li>
                </ul>
                <p className={s.links}>
                    <a target="_blank" href={``}>Comment</a> | <a target="_blank" href={``}>Link</a>
                </p>
            </div>
        );
    }
}

export default UserPageLayout;