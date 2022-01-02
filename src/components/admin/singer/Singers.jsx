import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//actions

//services
import { getSingers } from '../../../services/singerServices';
import { setSingers } from '../../../state_manager/actions/singers';
//utils
import { errorMessage } from '../../../utils/message';
import SingerItem from './SingerItem';

const Singers = () => {

    const singers = useSelector(state => state.singers);
    const dispatch = useDispatch();

    const handleGetSingers = async () => {
        await getSingers().then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    dispatch(setSingers(data));
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
        handleGetSingers();
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
                            <span>خواننده ها</span>
                            <div className="mr-auto">
                                <Link
                                to="/admin/new-singer"
                                className="btn_gr"
                                >
                                    <i className="fa fa-plus ml-2"></i>
                                    خواننده جدید
                                </Link>
                            </div>
                        </div>

                        {singers.map((singer, index) => (
                            <SingerItem
                                key={singer.id}
                                singer={singer}
                                index={index}
                            />
                        ))}

                    </div>
                </div>

            </div>
        </Fragment>
    );
}

export default Singers;