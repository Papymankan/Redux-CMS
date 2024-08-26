import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function HeaderLinks() {

    const theme = useSelector(state => state.theme.mode)

    return (
        <ul className="content__tabs">
            <li className="content__tab">
                <Link to="/users" className={`content__tab-link ${theme == 'dark' ? 'dark' : ''}`}>
                    <span className="fa fa-user"></span>
                    کاربران
                </Link>
            </li>
            <li className="content__tab">
                <Link to="/courses" className={`content__tab-link ${theme == 'dark' ? 'dark' : ''}`}>
                    <span className="fa fa-store"></span>
                    دوره‌ها
                </Link>
            </li>

            <li className="content__tab">
                <Link to="/articles" className={`content__tab-link ${theme == 'dark' ? 'dark' : ''}`}>
                    <span className="fa fa-newspaper"></span>
                    وبلاگ
                </Link>
            </li>
        </ul>
    )
}
