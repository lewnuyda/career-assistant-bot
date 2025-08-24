// src/utils/sweetToast.js
import Swal from "sweetalert2";

/**
 * Show a reusable SweetAlert2 toast
 * @param {'success'|'error'|'info'|'warning'|'question'} type - Toast icon
 * @param {string} message - Toast message
 */
export const showToast = (type, message) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};
