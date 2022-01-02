import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AlbumItem from './AlbumItem';
//actions
import { setAlbums } from '../../../state_manager/actions/albums';
//services
import { getAlbums } from '../../../services/musicServises';
//utils
import { errorMessage } from '../../../utils/message';

const Albums = () => {

    const albums = useSelector(state => state.albums);
    const dispatch = useDispatch();

    const handleGetAlbums = async () => {
        await getAlbums().then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    dispatch(setAlbums(data));
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
        handleGetAlbums();
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
                            <span>آلبوم ها</span>
                            <div className="mr-auto">
                                <Link
                                to="/admin/new-album"
                                className="btn_gr"
                                >
                                    <i className="fa fa-plus ml-2"></i>
                                    آلبوم جدید
                                </Link>
                            </div>
                        </div>

                        {albums.map((album, index) => (
                            <AlbumItem
                                key={album.id}
                                album={album}
                                index={index}
                            />
                        ))}

                    </div>
                </div>

            </div>
        </Fragment>
    );
}

export default Albums;