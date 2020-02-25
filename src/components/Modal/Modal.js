import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import "./Modal.scss";

const Modal = ({ show, handleClose, children }) => {
    const showHideClass = show ? "modal" : "modal hidden";

    return (
        <div className={showHideClass}>
            <section className="modal-content">
                {children}
                <CloseIcon className="button-close" onClick={handleClose}></CloseIcon>
            </section>
        </div>
    );
};

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func
};

export default Modal;
