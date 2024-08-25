import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleBox from "./../../components/ArticleBox/ArticleBox";

import "./Articles.css";
import store from "../../Redux/store";
import { useSelector } from "react-redux";
import { createArticle, fetchArticles } from "../../Redux/Reducer/articles";
import { fetchCategories } from "../../Redux/Reducer/categories";
import Swal from "sweetalert2";

export default function Articles() {


  useEffect(() => {
    store.dispatch(fetchArticles('https://redux-cms.iran.liara.run/api/articles'))
    store.dispatch(fetchCategories('https://redux-cms.iran.liara.run/api/categories'))
  }, [])

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [views, setViews] = useState('')
  const [desc, setDesc] = useState('')

  const [isShowModal, setIsShowModal] = useState(false)

  const articles = useSelector(state => state.articles)
  const categories = useSelector(state => state.categories)

  const addNewArticle = () => {
    if (title.length && category.length && views.length && desc.length) {
      store.dispatch(createArticle({
        url: 'https://redux-cms.iran.liara.run/api/articles', article: {
          title,
          category,
          views,
          desc,
        }
      }))
      setIsShowModal(false)
    } else {
      Swal.fire({
        title: "<strong>اطلاعات مقاله را کامل وارد کنید</strong>",
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
                  </div>

                  <div class="form__box-input col-12 px-2">
                    <span class="fa fa-bars form__icon"></span>
                    <select name="category"
                      id="categories-box"
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
                      placeholder={'تعداد بازدید ها'}
                      type="number"
                      name=""
                      onChange={(e) => {
                        setViews(e.target.value)
                      }}
                      value={views}
                      id="email"
                      class="form-control form__input input-user-email"
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
                  onClick={() => addNewArticle()}
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

        <div className="articles">
          <div className="articles__list">
            {

              articles.length > 0 ?
                articles.map(articles => <ArticleBox key={articles._id} {...articles} />) :
                <div class="loader"></div>
            }
          </div>
        </div>

        <div className="new-article">
          <button
            className="btn-custome btn-custome__blue"
            data-bs-toggle="modal"
            data-bs-target="#new-article"
            id="btn-modal-new-article"
            onClick={() => setIsShowModal(true)}
          >
            افزودن مقاله جدید
          </button>
        </div>
      </div>
    </div>
  );
}
