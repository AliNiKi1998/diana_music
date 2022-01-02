import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMusics } from '../../../services/musicServises';

//actions
import { fillMusics } from '../../../state_manager/actions/songs';
//services

//utils
import { errorMessage } from '../../../utils/message';
import MusicItem from './MusicItem';

const Musics = () => {

    const musics = useSelector(state => state.songs);
    const dispatch = useDispatch();

    const handleGetMusics = async () => {
        await getMusics().then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    dispatch(fillMusics(data));
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
        handleGetMusics();
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
                            <span>آهنگ ها</span>
                            <div className="mr-auto">
                                <Link
                                to="/admin/new-music"
                                className="btn_gr"
                                >
                                    <i className="fa fa-plus ml-2"></i>
                                    آهنگ جدید
                                </Link>
                            </div>
                        </div>

                        {musics.map((music, index) => (
                            <MusicItem
                                key={music.id}
                                music={music}
                                index={index}
                            />
                        ))}

                    </div>
                </div>

            </div>
        </Fragment>
    );
}

export default Musics;