import { toast } from "react-toastify";

export const successMessage = message => {
    toast.success(message, {
        position: "bottom-left",
        closeOnClick: true,
        theme: "colored",
    });
};

export const errorMessage = message => {
    toast.error(message, {
        position: "bottom-left",
        closeOnClick: true,
        theme: "colored",
        className: "bg_error"
    });
};

export const warningMessage = message => {
    toast.warning(message, {
        position: "bottom-left",
        closeOnClick: true,
        theme: "colored",
    });
};