import React from "react";
import PropTypes from "prop-types";

// TODO: Migrate to use AuthContext
export function RoomSignInModalContainer({ onClose, step, onSubmitEmail, message, onContinue }) {
  return (
    <>
      Unauthorized
    </>
  );
}

RoomSignInModalContainer.propTypes = {
  onClose: PropTypes.func,
  onSubmitEmail: PropTypes.func,
  step: PropTypes.string,
  message: PropTypes.object,
  onContinue: PropTypes.func
};
