import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { isEmpty } from 'lodash';

import { clearUser, setUser } from "../state_manager/actions/user/user";
import { decodeToken } from "./decodeToken";
import { successMessage } from "./message";
import { renewToken } from "../services/musicServises";
import { useSelector } from "react-redux";

export const CheckUserLogin = async () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const userCookie = new Cookies();
    const dianaCookie = userCookie.get('user');

    const userToken = localStorage.getItem('user_token');


    if (!isEmpty(userToken) && isEmpty(user)) {
        dispatch(setUser(decodeToken(userToken).payload.user));
    }

    const user1 = useSelector(state => state.user);

    if (!isEmpty(dianaCookie) && isEmpty(user1)) {
        const loginFormData = new FormData();
        loginFormData.append('email', dianaCookie.email);
        loginFormData.append('password', dianaCookie.password);
        await renewToken(loginFormData)
            .then(resolved => {
                const { status, data } = resolved;

                if (status == 200) {
                    localStorage.setItem('user_token', data.token);
                    dispatch(setUser(decodeToken(data.token).payload.user));
                    sessionStorage.setItem("user", 'user');
                    const firstName = decodeToken(data.token).payload.user.first_name;
                    const lastName = decodeToken(data.token).payload.user.last_name;
                    const fullname = firstName + ' ' + lastName + ' ';
                    successMessage(fullname + ' عزیر خوش اومدی');
                }
            },
                rejected => {
                    if (rejected) {
                        localStorage.removeItem("user_token");
                        dispatch(clearUser());
                    }
                });
    }
}