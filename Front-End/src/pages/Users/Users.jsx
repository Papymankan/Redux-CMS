import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import UserItem from "../../components/UserItem/UserItem";
import { fetchUsers } from "../../Redux/Reducer/users";
import store from "../../Redux/store";


import "./Users.css";
import { useSelector } from "react-redux";

export default function Users() {

  useEffect(() => {
    store.dispatch(fetchUsers('https://redux-cms.iran.liara.run/api/users'))
  }, [])

  const users = useSelector(state => state.users)

  console.log(users);


  return (
    <div className="col-8 content px-0">
      <div className="content__wrapper">
        <ul className="content__tabs">
          <li className="content__tab">
            <Link to="/users" className="content__tab-link">
              <span className="fa fa-user"></span>
              کاربران
            </Link>
          </li>
          <li className="content__tab">
            <Link to="/infos" className="content__tab-link">
              <span className="fa fa-book"></span>
              اطلاعات
            </Link>
          </li>
          <li className="content__tab">
            <Link to="/courses" className="content__tab-link">
              <span className="fa fa-store"></span>
              دوره‌ها
            </Link>
          </li>

          <li className="content__tab">
            <Link to="/articles" className="content__tab-link">
              <span className="fa fa-newspaper"></span>
              وبلاگ
            </Link>
          </li>
        </ul>

        <div className="users">

          <div className="users__list-container">
            <div className="users__list users__list-wrapper">
              {
                users.length > 0 ?
                  users.map(user => <UserItem key={user._id} {...user} />) :
                  <div class="loader"></div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
