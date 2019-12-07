import React from 'react';
// import PropTypes from 'prop-types';
import s from "./header.less";
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
// import { list } from 'postcss';


class NavHeader extends React.Component {
    // static PropTypes = {
    //     children: PropTypes.node.isRequired
    // }
    
    
    render() { 
        console.log(this.props, 'header');
        const { match, links } = this.props
        
        return (
            <header className={s.header_container}>
                <nav className={s.header_inner}>
                    <span className={s.logo}>React-Hackernews</span>
                    <span className={s.nav_links}>
                        {links.map(e => {
                            return <NavLink activeClassName={s.activeLink} to={`${match.url}${e.to}`} key={e.to}>{e.title}</NavLink>
                        })}
                    </span>
                </nav>
            </header>
        );
    }
}

export default connect()(withRouter(NavHeader))