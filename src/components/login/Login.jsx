import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Validator } from '../../utils/validator';
import { successMessage, errorMessage } from '../../utils/message';
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { useSelector, useDispatch } from 'react-redux';
import { decodeToken } from './../../utils/decodeToken';


import { scrollTop } from './../../utils/scrollTop';

// action
import { setEmail } from "./../../state_manager/actions/user/email";
import { setPassword } from "./../../state_manager/actions/user/password";
import { loginUser } from '../../services/musicServises';
import { setUser } from './../../state_manager/actions/user/user';

const Login = ({ history }) => {
 
    scrollTop();
    
    // state
    const email = useSelector(state => state.email);
    const password = useSelector(state => state.password);
    const [, forceUpdate] = useState();

    //dispatch
    const dispatch = useDispatch();

    // validator
    const validator = Validator();

    //login user
    const handleLogin = async e => {
        e.preventDefault();
        if (validator.current.allValid()) {
            dispatch(showLoading());
            // formData
            const loginFormData = new FormData();
            loginFormData.append('email', email);
            loginFormData.append('password', password);

            setTimeout(() => {
                dispatch(hideLoading())
            }, 500)

            await loginUser(loginFormData)
                .then(resolved => {
                    const { status, data } = resolved;
                    if (status === 200) {
                        setTimeout(() => {
                            dispatch(hideLoading())
                            history.replace('/');
                        }, 500);

                        localStorage.setItem('user_token', data.token);
                        const decodeTokenUser = decodeToken(data.token).payload.user;
                        dispatch(setUser(decodeTokenUser));

                        const firstName = decodeToken(data.token).payload.user.first_name;
                        const lastName = decodeToken(data.token).payload.user.last_name;
                        const fullname = firstName + ' ' + lastName + ' ';
                        successMessage(fullname + ' عزیر خوش اومدی');
                    }
                },
                    rejected => {
                        if (rejected.response) {
                            const { status, data } = rejected.response;
                            if (status === 401) {
                                errorMessage(data);
                            }
                        }
                    });
        } else {
            validator.current.showMessages();
            forceUpdate(1);
            errorMessage('اطلاعات وارد شده صحیح نیست')
        }

    }

    return (
        <Fragment>
            <Helmet>
                <title>ورود به حساب کاربری</title>
            </Helmet>
            <div className="ms_profile_wrapper">
                <h1>ورود به حساب کاربری</h1>
                <div className="ms_profile_box">
                    <form onSubmit={(e) => handleLogin(e)} >
                        <div className="ms_pro_form">


                            <div className="form-group">
                                <label>ایمیل *</label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="example@yahoo.com"
                                    className="form-control"
                                    value={email}
                                    onChange={e => {
                                        dispatch(setEmail(e.target.value));
                                        validator.current.showMessageFor('email');
                                    }}
                                />
                                {validator.current.message('email', email, 'required|email')}
                            </div>
                            <div className="form-group">
                                <label>رمز عبور *</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="********"
                                    className="form-control"
                                    value={password}
                                    onChange={e => {
                                        dispatch(setPassword(e.target.value));
                                        validator.current.showMessageFor('password');
                                    }}
                                />
                                {validator.current.message('password', password, 'required|min:8')}
                            </div>


                            <div className="pro-form-btn text-center marger_top15 d-flex alignitems-center justify-content-center"
                            >
                                <button className="ms_btn" type="submit">ورود</button>
                                <Link
                                    to="/register"
                                    className="ms_btn"
                                >
                                    ثبت نام
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default Login;