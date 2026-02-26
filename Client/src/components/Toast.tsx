import { useEffect, useState } from "react";

type IProps = {
  message: String;
  alertType: String;
};

const Toast = ({ message, alertType }: IProps) => {
  return (
    <div className='toast toast-top toast-center'>
      <div className={`alert alert-${alertType}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
