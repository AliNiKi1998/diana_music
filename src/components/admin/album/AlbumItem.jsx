import React from 'react'
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { Link } from 'react-router-dom';

//services
import config from '../../../services/config.json';
import { deleteAlbum, getAlbumInfo } from '../../../services/musicServises';

import { updateAlbums } from '../../../state_manager/actions/albums';
import { setAlbum } from '../../../state_manager/actions/album';

import { errorMessage, successMessage } from '../../../utils/message';


const AlbumItem = ({ album, index }) => {

    const dispatch = useDispatch();

    const handleDeleteAlbum = async albumId => {

        const confirm = window.confirm("آلبوم حذف بشه؟");

        if (confirm === true) {
            dispatch(showLoading());
            const FormAlbum = new FormData();
            FormAlbum.append('album_id', albumId);

            await deleteAlbum(FormAlbum).then(
                resolved => {
                    const { status, data } = resolved;
                    if (status === 200) {
                        dispatch(hideLoading());
                        successMessage(data);
                        dispatch(updateAlbums(albumId));
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

     //album info
     const handleAlbumInfo = async (albumId) => {
        const albumFormData = new FormData();
        albumFormData.append('albumId', albumId);
        await getAlbumInfo(albumFormData).then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                   dispatch(setAlbum(data))
                }
            }
        )
    }

    return (
        <div>
            <div className="ms_weekly_box d-flex align-items-center justify-content-between">
                <div className="weekly_right d-flex">
                    <span className="w_top_no">
                        {index + 1}
                    </span>
                    <div className="w_top_song">
                        <div className="w_tp_song_img position-relative">
                            <img
                                src={`${config.nic_music}${album.image}`}
                                className="img-fluid"
                            />
                        </div>
                        <div className="w_tp_song_name">
                            <h3>
                                {album.name}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="weekly_left weekly_left_album">

                    <Link
                        to={`/admin/edit-album/${album.id}`}
                        className="btn btn-info ml-2"
                        onClick={() =>handleAlbumInfo(album.id) }
                    >
                        ویرایش آلبوم
                    </Link>

                    <button
                        onClick={() => handleDeleteAlbum(album.id)}
                    >
                        حذف آلبوم
                    </button>
                </div>

            </div>
        </div>
    );
}

export default AlbumItem;