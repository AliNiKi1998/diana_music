import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { scrollTop } from '../../utils/scrollTop';
import ShowImage from '../common/ShowImage';


const Profile = () => {
    scrollTop();

    const user = useSelector(state => state.user);

    return (
        <Fragment>
            <div className="ms_releases_wrapper">
                <div className="singer_info">
                    <div className="row">
                        <div className="col-sm-6 col-md-3 singer_image mb-2">
                            <ShowImage image={user.avatar} size={80} />
                        </div>
                        <div className="col-sm-6 col-md-9 singer_description">
                            <div className="singer_info_top d-flex align-items-center">
                                <h3>{user.first_name} {user.last_name}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {user.is_admin === true ? (
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
                ) : (null)}
            </div>
        </Fragment>
    );
}

export default Profile;