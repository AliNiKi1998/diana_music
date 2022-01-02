import React, { useRef } from 'react'
import SimpleReactValidator from 'simple-react-validator';

export const Validator = () => (

    useRef(new SimpleReactValidator({
        messages: {
            required: "پر کردن این فیلد الزامی میباشد!!!",
            min: "حداقل 8 کاراکتر وارد کنید",
            max: "حجم عکس نباید بیشتر از 2 مگ باشه",
            email: "ایمیل وارد شده صحیح نیست",
            in: "تکرار رمز عبور صحیح نیست",
            numeric: " "
        },
        element: message => <div style={{ color: "#EE4461" }}>{message}</div>
    }))
)