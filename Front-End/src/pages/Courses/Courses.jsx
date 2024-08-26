import React, { useEffect, useState } from "react";
import store from "../../Redux/store";
import "./Courses.css";
import CourseBox from "../../Components/CourseBox/CourseBox";
import { Link } from "react-router-dom";
import { addDiscount, createCourse, fetchCourses } from "../../Redux/Reducer/courses";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { createCategory, fetchCategories } from "../../Redux/Reducer/categories";
import HeaderLinks from "../../Components/HeaderLinks/HeaderLinks";

export default function Courses() {

  useEffect(() => {
    store.dispatch(fetchCourses('https://redux-cms.iran.liara.run/api/courses'))
    store.dispatch(fetchCategories('https://redux-cms.iran.liara.run/api/categories'))
  }, [])

  const [isShowModal, setIsShowModal] = useState(false)

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [registersCount, setRegistersCount] = useState('')
  const [discount, setDiscount] = useState('')
  const [desc, setDesc] = useState('')

  const courses = useSelector(state => state.courses)
  const categories = useSelector(state => state.categories)
  console.log(categories);

  const addNewCourse = () => {
    if (title.length && price.length &&
      category.length &&
      registersCount.length &&
      discount.length &&
      desc.length) {
      store.dispatch(createCourse({
        url: 'https://redux-cms.iran.liara.run/api/courses', course: {
          title,
          price,
          category,
          registersCount,
          discount,
          desc,
        }
      }))
      setIsShowModal(false)
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

  const fireDiscountModal = () => {
    Swal.fire({
      title: 'مقدار تخفیف را وارد کنید',
      input: 'number',
      inputAttributes: {
        placeholder: 'مثال 50',
        // min: 0,
        // max: 100,
      },
      preConfirm: (value) => {
        if (value > 100 || value < 0) {
          console.log(value);
          Swal.showValidationMessage('درصد باید بین 0 تا 100 باشد');
          return false;
        } else true
      },
      confirmButtonText: 'اعمال',
      showCancelButton: true,
      cancelButtonText: 'انصراف'
    }).then(res => {
      if (res.isConfirmed) {
        console.log(res.value);

        store.dispatch(addDiscount({ url: 'https://redux-cms.iran.liara.run/api/courses/discount', discount: res.value }))
      }
    })
  }

  const fireCatModal = () => {
    Swal.fire({
      title: 'دسته بندی جدید را وارد کنید',
      input: 'text',
      inputAttributes: {
        placeholder: 'مثال فرانت اند',
      },
      preConfirm: (value) => {
        if (!value) {
          return false;
        } else true
      },
      confirmButtonText: 'اعمال',
      showCancelButton: true,
      cancelButtonText: 'انصراف'
    }).then(res => {
      if (res.isConfirmed) {
        store.dispatch(createCategory({url : 'https://redux-cms.iran.liara.run/api/categories' , title : res.value}))
      }
    })
  }
  const theme = useSelector(state => state.theme.mode)

  return (
    <div className={`col-8 content px-0 ${theme == 'dark' ? 'dark' : ''}`}>
      <div className="content__wrapper d-flex flex-column align-content-between">
       <HeaderLinks/>

        <div
          className={`modal ${isShowModal ? "show-modal" : null}`}
          id="show-info-modal"
        >
          <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
            <div class={`modal-content ${theme == 'dark' ? 'dark' : ''}`}>
              <div class="modal-header">
                <h4 class="modal-title">دوره جدید</h4>
                <button
                  type="button"
                  class={`btn-close py-0 ${theme == 'dark' ? 'dark' : ''}`}
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

                  </div>

                  <div class="form__box-input col-12 px-2">
                    <span class="fa fa-bars form__icon"></span>
                    <select name="category"
                      id="categories-box"
                      className="form__input"
                      onChange={(e) => {
                        setCategory(e.target.value)
                      }}
                      value={category}
                    >
                      <option value="none" hidden selected>دسته بندی</option>
                      {
                        categories.map(cat => <option value={cat.title}>{cat.title}</option>)
                      }

                    </select>
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
      <div className={`new-course d-flex gap-2 ${theme == 'dark' ? 'dark' : ''}`}>
        <button
          className={`btn-custome btn-custome__blue ${theme == 'dark' ? 'dark' : ''}`}
          data-bs-toggle="modal"
          data-bs-target="#new-product"
          onClick={() => setIsShowModal(true)}
        >
          افزودن دوره جدید
        </button>
        <button
          className={`btn-custome btn-custome__red ${theme == 'dark' ? 'dark' : ''}`}
          data-bs-toggle="modal"
          data-bs-target="#add-discount-all-product"
          onClick={fireDiscountModal}
        >
          اعمال تخفیف همه دوره‌ها
        </button>
        <button
          className={`btn-custome btn-custome__green btn-modal-new-category ${theme == 'dark' ? 'dark' : ''}`}
          data-bs-toggle="modal"
          data-bs-target="#add-new-category"
          onClick={fireCatModal}
        >
          افزودن دسته بندی
        </button>
      </div>


    </div>
  );
}
