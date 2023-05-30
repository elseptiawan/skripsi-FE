import React from 'react';
import style from "./modal.module.css";

const Modal = props => {
  return (
    <div className={style.modal}>
      <div className={style.modal_content}>
        <div className={style.modal_header}>
          <h4>{props.title}</h4>
        </div>
        <div className={style.modal_body}>
          This is modal content
        </div>
      </div>
    </div>
  )
}

export default Modal