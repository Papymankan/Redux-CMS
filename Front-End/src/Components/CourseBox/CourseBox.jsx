import React from "react";
import Swal from "sweetalert2";
import { removeCourse } from "../../Redux/Reducer/courses";
import store from "../../Redux/store";
import { useSelector } from "react-redux";

export default function CourseBox({ title, category, price, registersCount, discount, desc, _id }) {

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
        console.log(res);
        store.dispatch(removeCourse(`https://redux-cms.iran.liara.run/api/courses/${id}`))
      }
    })
  }
  const theme = useSelector(state => state.theme.mode)

  return (
    <div className={`products__item ${theme == 'dark' ? 'dark' : ''}`}>
      <img
        src="../../img/store/redux.png"
        alt="product-img-1"
        className={`products__img ${theme == 'dark' ? 'dark' : ''}`}
      />
      <div className="products__details w-100">
        <div className="products__info">
          <h3 className="products__name">{title}</h3>
          <p className="products__short-desc">
            {desc}
          </p>
        </div>
        <div className={`products__tags ${theme == 'dark' ? 'dark' : ''}`}>
          <div className="products__boxes">
            <div className="products__price-box">
              <span className="fa fa-wallet"></span>

              <span className="product__teg-text">قیمت :</span>
              <span className="product__teg-text products__price-value">{price ? price.toLocaleString() : 'رایگان'}</span>
            </div>
            <div className="products__category-box">
              <span className="fa fa-folder"></span>

              <span className="product__teg-text">دسته بندی :</span>
              <span className="product__teg-text products__category">
                {'' + category}
              </span>
            </div>
            <div className="products__shop-box">
              <span className="fa fa-users"></span>

              <span className="product__teg-text">تعداد فروش :</span>
              <span className="product__teg-text products__sell">{registersCount.toLocaleString()}</span>
            </div>
          </div>
          <div className="products__btns">
            <button className="btn btn-danger btn-lg" onClick={() => removeHandler(_id)}>حذف</button>
            <button className="btn btn-info btn-lg">ویرایش</button>
          </div>
        </div>
      </div>
      {
        discount != 100 && discount != 0 && <div className="product__discount-Box">{discount + '%'}</div>
      }

    </div>
  );
}
