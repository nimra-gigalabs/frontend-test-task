import React from 'react';
import ReactDOM from 'react-dom';

import './modal.css';

const Modal = props => {
  const content = (
    props.show && (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : event => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
    ) 
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

export default Modal;
