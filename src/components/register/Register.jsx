import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { registerUser } from '../../services/musicServises';
import { Validator } from '../../utils/validator';
import { successMessage, errorMessage } from '../../utils/message';
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { useSelector, useDispatch } from 'react-redux';

import { scrollTop } from './../../utils/scrollTop';

// actions
import { clearFirstName, setFirstName } from "./../../state_manager/actions/user/firstName";
import { clearLastName, setLastName } from "./../../state_manager/actions/user/lastName";
import { setEmail } from "./../../state_manager/actions/user/email";
import { setPassword } from "./../../state_manager/actions/user/password";
import { setConfirmPassword, clearConfirmPassword } from "./../../state_manager/actions/user/confirmPassword";
import { clearAvatar, setAvatar } from "./../../state_manager/actions/user/avatar";

const Register = ({ history }) => {
    
    scrollTop();

    // states
    const firstName = useSelector(state => state.firstName);
    const lastName = useSelector(state => state.lastName);
    const email = useSelector(state => state.email);
    const password = useSelector(state => state.password);
    const confirmPassword = useSelector(state => state.confirmPassword);
    const avatar = useSelector(state => state.avatar);

    const [, forceUpdate] = useState();

    //dispatch
    const dispatch = useDispatch();

    // validator
    const validator = Validator();

    //reset form
    const resetForm = () => {
        dispatch(clearFirstName());
        dispatch(clearLastName());
        dispatch(clearConfirmPassword());
        dispatch(clearAvatar());
    }

    //register user
    const handleRegister = async e => {
        e.preventDefault();
        if (validator.current.allValid()) {
            dispatch(showLoading());
            // formData
            const registerFormData = new FormData();
            registerFormData.append('first_name', firstName);
            registerFormData.append('last_name', lastName);
            registerFormData.append('email', email);
            registerFormData.append('password', password);
            registerFormData.append('confirm_password', confirmPassword);
            registerFormData.append('avatar', avatar);

            setTimeout(() => {
                dispatch(hideLoading())
            }, 500);

            await registerUser(registerFormData).then(
                resolved => {
                    const { status, data } = resolved;
                    if (status === 200) {
                        setTimeout(() => {
                            dispatch(hideLoading())
                            history.push('/login');
                        }, 500)
                        successMessage(data);
                        resetForm();
                    }
                },
                rejected => {
                    if (rejected.response) {
                        const { status, data } = rejected.response
                        if (status === 401) {
                            errorMessage(data);
                        }
                    }
                }
            )
        } else {
            validator.current.showMessages();
            forceUpdate(1);
            errorMessage('اطلاعات وارد شده صحیح نیست')
        }
    }
    return (
        <Fragment>
            <Helmet>
                <title>ثبت نام در دیانا موزیک</title>
            </Helmet>
            <div className="ms_profile_wrapper">
                <h1>ثبت نام در سایت</h1>
                <div className="ms_profile_box">
                    <form onSubmit={e => handleRegister(e)}>
                        <div className="ms_pro_form">
                            <div className="form-group">
                                <label>نام *</label>
                                <input
                                    type="text"
                                    placeholder="علی"
                                    name="first_name"
                                    className="form-control"
                                    value={firstName}
                                    onChange={e => {
                                        dispatch(setFirstName(e.target.value));
                                        validator.current.showMessageFor('first_name');
                                    }}
                                />
                                {validator.current.message('first_name', firstName, 'required')}
                            </div>
                            <div className="form-group">
                                <label>نام خانوادگی *</label>
                                <input
                                    type="text"
                                    placeholder="نیکی"
                                    name="last_name"
                                    className="form-control"
                                    value={lastName}
                                    onChange={e => {
                                        dispatch(setLastName(e.target.value));
                                        validator.current.showMessageFor('last_name');
                                    }}
                                />
                                {validator.current.message('last_name', lastName, 'required')}
                            </div>
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
                            <div className="form-group">
                                <label>تکرار رمز عبور *</label>
                                <input
                                    type="password"
                                    name="confirm_password"
                                    placeholder="********"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={e => {
                                        dispatch(setConfirmPassword(e.target.value));
                                        validator.current.showMessageFor('confirm_password');
                                    }}
                                />
                                {validator.current.message('confirm_password', confirmPassword, 'required|in:' + password)}
                            </div>
                            <div className="form-group">
                                <label>آپلود عکس *</label>
                                {validator.current.message('avatar', avatar, 'required')}
                                {validator.current.message('avatar', Math.floor(avatar.size / 1024), 'numeric|max:2048,num')}
                                <div className="fileUpload">
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="upload"
                                        onChange={e => {
                                            dispatch(setAvatar(e.target.files[0]));
                                            validator.current.showMessageFor('avatar')
                                        }}
                                    />
                                    <span>انتخاب عکس</span>
                                </div>
                            </div>
                            <div className="pro-form-btn text-center marger_top15 d-flex alignitems-center justify-content-center"
                            >
                                <button className="ms_btn" type="submit">ثبت نام</button>
                                <Link
                                    to="/login"
                                    className="ms_btn"
                                >
                                    ورود
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default Register;