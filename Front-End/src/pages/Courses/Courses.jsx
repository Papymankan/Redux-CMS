import React, { useEffect, useState } from "react";
import store from "../../Redux/store";
import "./Courses.css";
import CourseBox from "../../Components/CourseBox/CourseBox";
import { Link } from "react-router-dom";
import { createCourse, fetchCourses } from "../../Redux/Reducer/courses";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function Courses() {

  useEffect(() => {
    store.dispatch(fetchCourses('https://redux-cms.iran.liara.run/api/courses'))
  }, [])

  const [isShowModal, setIsShowModal] = useState(false)

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [registersCount, setRegistersCount] = useState('')
  const [discount, setDiscount] = useState('')
  const [desc, setDesc] = useState('')

  const courses = useSelector(state => state.courses)
  console.log(courses);

  const addNewCourse = () => {
    if (title.length && price.length &&
      category.length &&
      registersCount.length &&
      discount.length &&
      desc.length) {
      store.dispatch(createCourse('https://redux-cms.iran.liara.run/api/courses', {
        title,
        price,
        category,
        registersCount,
        discount,
        desc,
      }))
    } else {
      Swal.fire({
        title: "<strong>اطلاعات دوره را کامل وارد کنید</strong>",
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

  return (
    <div className="col-8 content px-0">
      <div className="content__wrapper d-flex flex-column align-content-between">
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

        <div
          className={`modal ${isShowModal ? "show-modal" : null}`}
          id="show-info-modal"
        >
          <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">دوره جدید</h4>
                <button
                  type="button"
                  class="btn-close py-0"
                  data-bs-dismiss="modal"
                  onClick={() => setIsShowModal(false)}
                ></button>
              </div>

              <div class="modal-body position-relative">
                <form action="#" class="form row mx-0">
                  <div class="form__box-input col-12 px-2">
                    <span class="fa fa-comment form__icon icon-name-article"></span>
                    <input
                      placeholder={'عنوان'}
                      type="text"
                      name=""
                      id="firstname"
                      onChange={(e) => {
                        setTitle(e.target.value)
                      }}
                      value={title}
                      class="form-control form__input input-user-firstname"
                    />
                    <label for="firstname" class="form__label my-0">
                      نام{" "}
                    </label>
                  </div>

                  <div class="form__box-input col-12 px-2">
                    <span class="fa fa-credit-card form__icon"></span>
                    <input
                      placeholder={'قیمت'}
                      type="number"
                      name=""
                      onChange={(e) => {
                        setPrice(e.target.value)
                      }}
                      value={price}
                      id="lastname"
                      class="form-control form__input input-user-lastname"
                    />
                    <label for="lastname" class="form__label my-0">
                      نام خانوادگی
                    </label>
                  </div>

                  <div class="form__box-input col-12 px-2">
                    <span class="fa fa-bars form__icon"></span>
                    <input
                      lang="en"
                      placeholder={'دسته بندی'}
                      type="text"
                      name=""
                      onChange={(e) => {
                        setCategory(e.target.value)
                      }}
                      value={category}
                      id="username"
                      class="form-control form__input input-user-username"
                    />
                    <label for="username" class="form__label my-0">
                      نام کاربری
                    </label>
                  </div>

                  <div class="form__box-input col-12 px-2">
                    <span class="fa fa-users form__icon"></span>
                    <input
                      lang="en"
                      placeholder={'تعداد ثبت نامی ها'}
                      type="number"
                      name=""
                      onChange={(e) => {
                        setRegistersCount(e.target.value)
                      }}
                      value={registersCount}
                      id="email"
                      class="form-control form__input input-user-email"
                    />
                    <label for="email" class="form__label my-0" lang="en">
                      ایمیل
                    </label>
                  </div>

                  <div class="form__box-input col-12 px-2">
                    <span class="fa fa-percent form__icon"></span>
                    <input
                      placeholder={'تخفیف'}
                      type="number"
                      name=""
                      id="text"
                      onChange={(e) => {
                        setDiscount(e.target.value)
                      }}
                      value={discount}
                      class="form-control form__input input-user-password"
                    />
                    <label for="password" class="form__label my-0">
                      {" "}
                      شهر
                    </label>
                  </div>
                  <div class="form__box-input col-12 px-2">
                    <span class="fa fa-paragraph form__icon"></span>
                    <input
                      placeholder={'توضیحات'}
                      type="text"
                      name=""
                      onChange={(e) => {
                        setDesc(e.target.value)
                      }}
                      value={desc}
                      id="count-product"
                      class="form-control form__input input-user-product"
                      readonly
                    />
                    <label for="count-product" class="form__label my-0">
                      سن
                    </label>
                  </div>
                </form>
              </div>

              <div class="modal-footer">
                <button
                  class="btn btn-primary btn-lg"
                  data-bs-dismiss="modal"
                  onClick={() => addNewCourse()}
                >
                  افزودن
                </button>

                <button
                  class="btn btn-danger btn-lg"
                  data-bs-dismiss="modal"
                  onClick={() => setIsShowModal(false)}
                >
                  بستن
                </button>

              </div>
            </div>
          </div>
        </div>

        <div className="products products-container">
          <div className="products__list products-wrapper">
            {
              courses.length > 0 ?
                courses.map(course => <CourseBox key={course._id} {...course} />) :
                <div class="loader"></div>
            }

          </div>
        </div>
      </div>
      <div className="new-course d-flex gap-2">
        <button
          className="btn-custome btn-custome__blue"
          data-bs-toggle="modal"
          data-bs-target="#new-product"
          onClick={() => setIsShowModal(true)}
        >
          افزودن دوره جدید
        </button>
        <button
          className="btn-custome btn-custome__red"
          data-bs-toggle="modal"
          data-bs-target="#add-discount-all-product"
        >
          اعمال تخفیف همه دوره‌ها
        </button>
        <button
          className="btn-custome btn-custome__green btn-modal-new-category"
          data-bs-toggle="modal"
          data-bs-target="#add-new-category"
        >
          افزودن دسته بندی
        </button>
      </div>


    </div>
  );
}
