import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
//actions
import { updateUsers } from '../../../state_manager/actions/user/users';
//services
import config from '../../../services/config.json';
import { deleteUser } from '../../../services/userServices';
//utils
import { errorMessage, successMessage } from '../../../utils/message';

const UserItem = ({ user, index }) => {

    const userLogin = useSelector(state => state.user);

    const dispatch = useDispatch();

    const handleDeleteUser = async userId => {
        const confirm = window.confirm("یوزر حذف بشه؟");
        if (confirm === true) {
            dispatch(showLoading());
            const FormUser = new FormData();
            FormUser.append('user_id', userId);

            await deleteUser(FormUser).then(
                resolved => {
                    const { status, data } = resolved;
                    if (status === 200) {
                        dispatch(hideLoading());
                        successMessage(data);
                        dispatch(updateUsers(userId));
                    }
                },
                rejected => {
                    if (rejected.response) {
                        dispatch(hideLoading());
                        const { status, data } = rejected.response
                        if (status === 404) {
                            errorMessage(data);
                        }
                    }
                }
            )
        }
    }

    return (
        <div className="ms_weekly_box d-flex align-items-center justify-content-between">
            <div className="weekly_right d-flex">
                <span className="w_top_no">
                    {index + 1}
                </span>
                <div className="w_top_song">
                    <div className="w_tp_song_img position-relative">
                        <img
                            src={`${config.nic_music}${user.avatar}`}
                            className="img-fluid"
                        />
                    </div>
                    <div className="w_tp_song_name">
                        <h3>{user.first_name}</h3>
                        <p>{user.last_name}</p>
                    </div>
                </div>
            </div>
            <div className="weekly_left">
                {user.id !== userLogin.id ? (
                    <button
                        onClick={() => handleDeleteUser(user.id)}
                    >
                        حذف یوزر
                    </button>
                ) : (null)}
            </div>

        </div>
    );
}

export default UserItem;