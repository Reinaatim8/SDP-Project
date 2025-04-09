import { ToastContainer } from "react-toastify";

const Toast = ()=> {
  return(
    <ToastContainer
    position="top-center"
    autoClose={9000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
  );
};
export default Toast;