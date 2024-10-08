import React from "react";
import store from "../../Redux/store";
import { removeArticle } from "../../Redux/Reducer/articles";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

export default function ArticleBox({ title, category, views, desc, _id }) {

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
        store.dispatch(removeArticle(`https://redux-cms.iran.liara.run/api/articles/${id}`))

      }
    })
  }
  const theme = useSelector(state => state.theme.mode)

  return (
    <div className="articles__item">
      <img
        src="../../img/store/products/product-img-1.jpg"
        alt="product-img-1"
        className={`articles__img ${theme == 'dark' ? 'dark' : ''}`}
      />
      <div className="articles__details w-100">
        <div className="articles__info">
          <h3 className="articles__name">{title}</h3>
          <p className="articles__short-desc">
            {desc}
          </p>
        </div>
        <div className={`articles__tags ${theme == 'dark' ? 'dark' : ''}`}>
          <div className="articles__boxes">
            <div className="articles__category-box d-flex gap-2 align-items-center">
              <span className="fa fa-tags"></span>
              <p className="articles__tag-text articles__category my-0">
                <span>دسته بندی :</span>
                <span className="articles__category-value">{category}</span>
              </p>
            </div>
            <div className="articles__visited-box d-flex gap-2 align-items-center">
              <span className="fa fa-users"></span>
              <p className="articles__tag-text articles__visited my-0">
                <span>تعداد بازدید :</span>
                <span className="articles__visited-count">{views}</span>
              </p>
            </div>
          </div>
          <div className="articles__btns">
            <button className="op-btn btn btn-danger btn-lg" onClick={() => removeHandler(_id)}>حذف</button>
            <button className="op-btn btn btn-info btn-lg">ویرایش</button>
          </div>
        </div>
      </div>
    </div>
  );
}
