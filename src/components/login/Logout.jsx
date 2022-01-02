import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import { clearUser } from "./../../state_manager/actions/user/user";
import { clearUserPlayList } from "../../state_manager/actions/user/userPlayList";


const Logout = ({ history }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.removeItem("user_token");
        dispatch(clearUser());
        dispatch(clearUserPlayList());
        history.push("/");
    }, []);

    return null;
};

export default withRouter(Logout);
