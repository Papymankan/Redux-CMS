import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserItem from "../../components/UserItem/UserItem";
import { createUser, fetchUsers } from "../../Redux/Reducer/users";
import store from "../../Redux/store";


import "./Users.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import HeaderLinks from "../../Components/HeaderLinks/HeaderLinks";

export default function Users() {

  useEffect(() => {
    store.dispatch(fetchUsers('https://redux-cms.iran.liara.run/api/users'))
  }, [])

  const users = useSelector(state => state.users)

  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [city, setCity] = useState('')

  const addNewUser = () => {
    console.log('ppp');
    if (name.length && lastName.length &&
      userName.length &&
      email.length &&
      age.length &&
      city.length) {
      store.dispatch(createUser({
        url: 'https://redux-cms.iran.liara.run/api/users', user: {
          name,
          lastName,
          userName,
          email,
          age,
          city
        }
      }))
    } else {

      Swal.fire({
        title: "<strong>اطلاعات کاربر را کامل وارد کنید</strong>",
        // icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: `
            بستن
          `
      })
    }
  }
  const theme = useSelector(state => state.theme.mode)

  return (
    <div className={`${theme == 'dark' ? 'dark' : ''} col-8 content px-0 `}>
      <div className="content__wrapper">
       <HeaderLinks/>
        {
          users.length > 0 ?
            (
              <>
                <div className={`information ${theme == 'dark' ? 'dark' : ''}`}>
                  <div id="accordion" style={theme == 'dark' ? {border:'1px solid var(--light)'} : {}}>
                    <div className={`card ${theme == 'dark' ? 'dark' : ''}`}>
                      <div className="card-header">
                        <a className="btn" data-bs-toggle="collapse" href="#collapseOne">
                          کاربر جدید
                        </a>
                      </div>
                      <div
                        id="collapseOne"
                        className="collapse show"
                        data-bs-parent="#accordion"
                      >
                        <div className={`card-body information-current-admin-wrapper-form p-4 ${theme == 'dark' ? 'dark' : ''}`}>
                          <form action="#" className="form row mx-0">
                            <div className="form__box-input col-6 px-2 py-3">
                              <span className="fa fa-user form__icon"></span>
                              <input
                                type="text"
                                name=""
                                onChange={(e) => {
                                  setName(e.target.value)
                                }}
                                value={name}
                                placeholder="نام "
                                className="form-control form__input"

                              />
                            </div>

                            <div className="form__box-input col-6 px-2 py-3">
                              <span className="fa fa-user form__icon"></span>

                              <input
                                type="text"
                                name=""
                                onChange={(e) => {
                                  setLastName(e.target.value)
                                }}
                                value={lastName}
                                placeholder="نام خانوادگی"
                                className="form-control form__input"

                              />
                            </div>

                            <div className="form__box-input col-6 px-2 py-3">
                              <span className="fa fa-address-book form__icon"></span>

                              <input
                                lang="en"
                                type="text"
                                name=""
                                onChange={(e) => {
                                  setUserName(e.target.value)
                                }}
                                value={userName}
                                placeholder="نام کاربری"
                                className="form-control form__input"

                              />
                            </div>

                            <div className="form__box-input col-6 px-2 py-3">
                              <span className="fa fa-globe form__icon"></span>

                              <input
                                lang="en"
                                type="email"
                                name=""
                                onChange={(e) => {
                                  setEmail(e.target.value)
                                }}
                                value={email}
                                placeholder="ایمیل"
                                className="form-control form__input"

                              />
                            </div>

                            <div className="form__box-input col-6 px-2 py-3">
                              <span className="fa fa-calendar form__icon"></span>

                              <input
                                lang="en"
                                type="number"
                                onChange={(e) => {
                                  setAge(e.target.value)
                                }}
                                value={age}
                                placeholder="سن "
                                className="form-control form__input"

                              />
                            </div>

                            <div className="form__box-input col-6 px-2 py-3">
                              <span className="fa fa-home form__icon"></span>

                              <input
                                lang="en"
                                type="text"
                                onChange={(e) => {
                                  setCity(e.target.value)
                                }}
                                value={city}
                                placeholder="شهر"
                                className="form-control form__input"

                              />
                            </div>


                            <button className={`btn-custome btn-custome__blue col-6 mb-3 ${theme == 'dark' ? 'dark' : ''}`} onClick={addNewUser}>
                              افزودن کاربر جدید
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="users">
                  <div className="users__list-container">
                    <div className="users__list users__list-wrapper">
                      {
                        users.map(user => <UserItem key={user._id} {...user} />)
                      }
                    </div>
                  </div>
                </div>
              </>
            )
            : <div class="loader"></div>
        }

      </div>
    </div>
  );
}
