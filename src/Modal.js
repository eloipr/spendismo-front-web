import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import "./Modal.scss";

const Modal = ({ show, handleAccept, handleClose, content }) => {
    const showHideClass = show ? "modal" : "modal hidden";

    return (
        <div className={showHideClass}>
            <section className="modal-content">
                {content}
                <CloseIcon className="button-close" onClick={handleClose}></CloseIcon>
            </section>
        </div>
    );
};

export default Modal;
