import React from 'react';
import s from "./listItem.less";
import { NavLink } from 'react-router-dom'

class Listitem extends React.Component {
    
    render() {
        const { item } = this.props
        return (
            <li className={s.list_item}>
                <span className={s.score}>{item.comment}</span>
                <span className={s.title}>
                    <a>Blizzard Suspends Professional Hearthstone Player for Hong Kong Comments</a>
                    <span className={s.host}>(playhearthstone.com)</span>
                </span>
                <br />
                <span className={s.meta}>
                    <span className={s.by}>
                        {'By  '}
                        <a href='/user/Dick'>hownottowrite</a>
                    </span>
                    <span className={s.time}>
                        {' '}
                        6 hours ago
                    </span>
                    <span className={s.comments_links}>
                        {'  |  '}
                        <a>641 Comments</a>
                    </span>

                </span>
            </li>
        );
    }
}

export default Listitem;