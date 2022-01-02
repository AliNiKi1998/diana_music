import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../../../services/userServices';
import { setUsers } from '../../../state_manager/actions/user/users';
import { errorMessage } from '../../../utils/message';
import UserItem from './UserItem';


const Users = () => {

    const users = useSelector(state => state.users);
    const dispatch = useDispatch();

    const handleUsers = async () => {
        await getUsers().then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    dispatch(setUsers(data));
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
    }

    useEffect(() => {
        handleUsers();
    }, [])


    return (
        <Fragment>
            <div className="ms_releases_wrapper">

                <div className="row">
                    <div className="d-flex mt-4 profile_category">
                        <h5>
                            <Link
                                to="/admin/users"
                            >
                                یوزر ها
                            </Link>
                        </h5>
                        <h5>
                            <Link
                                to="/admin/songs"
                            >
                                آهنگ ها
                            </Link>
                        </h5>
                        <h5>
                            <Link
                                to="/admin/albums"
                            >
                                آلبوم ها
                            </Link>
                        </h5>
                        <h5>
                            <Link
                                to="/admin/singers"
                            >
                                خواننده ها
                            </Link>
                        </h5>
                    </div>
                </div>

                <div className="row">
                    <div className="admin_top_bar">
                        <div className="admin_header">
                            <span>یوزر ها</span>
                        </div>
                        {users.map((user, index) => (
                            <UserItem
                                key={user.id}
                                user={user}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </Fragment>
    );
}

export default Users;