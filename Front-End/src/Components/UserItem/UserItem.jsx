import React from 'react'
import store from '../../Redux/store'
import { removeUser } from '../../Redux/Reducer/users'
import Swal from 'sweetalert2'

export default function UserItem({ firstname, lastname, email, _id }) {

    const removeHandler = (id) => {
        Swal.fire({
            title: "<strong>آیا از حذف اطمینان دارید ؟</strong>",
            icon: "warning",
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            showLoaderOnConfirm: true,
            confirmButtonText: `
              بله
            `,
            cancelButtonText: `
              خیر
            `
        }).then(res => {
            if (res.isConfirmed) {
                store.dispatch(removeUser(`https://redux-cms.iran.liara.run/api/users/${id}`))
            }
        });
    }


    return (
        <div className="uesrs__item">
            <div className="users__info">
                <img
                    src="../../img/admin/profile/banana.png"
                    alt="photo user"
                    className="users__img"
                />
                <div className="users__details">
                    <p className="users__name my-0">{firstname} {lastname}</p>
                    <p lang="en" className="users__email">
                        {email}
                    </p>
                </div>
            </div>
            <div className="users__btns">
                <button className="btn-custome btn-custome--gray">پیام ها</button>
                <button className="btn-custome btn-custome__blue">اطلاعات</button>
                <button className="btn-custome btn-custome__red" onClick={() => removeHandler(_id)}>حذف</button>
            </div>
        </div>
    )
}
