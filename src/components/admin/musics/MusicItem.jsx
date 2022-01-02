import React from 'react'
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { Link } from 'react-router-dom';

//services
import config from '../../../services/config.json';
import { deleteMusic } from '../../../services/musicServises';
import { updateMusics } from '../../../state_manager/actions/songs';

import { errorMessage, successMessage } from '../../../utils/message';


const MusicItem = ({ music, index }) => {

    const dispatch = useDispatch();

    const handleDeleteMusic = async musicId => {

        const confirm = window.confirm("آهنگ حذف بشه؟");

        if (confirm === true) {
            dispatch(showLoading());
            const FormMusic = new FormData();
            FormMusic.append('music_id', musicId);

            await deleteMusic(FormMusic).then(
                resolved => {
                    const { status, data } = resolved;
                    if (status === 200) {
                        dispatch(hideLoading());
                        successMessage(data);
                        dispatch(updateMusics(musicId));
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
        <div>
            <div className="ms_weekly_box d-flex align-items-center justify-content-between">
                <div className="weekly_right d-flex">
                    <span className="w_top_no">
                        {index + 1}
                    </span>
                    <div className="w_top_song">
                        <div className="w_tp_song_img position-relative">
                            <img
                                src={`${config.nic_music}${music.image.small}`}
                                className="img-fluid"
                            />
                        </div>
                        <div className="w_tp_song_name">
                            <h3>
                                {music.name}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="weekly_left weekly_left_album">

                    <Link
                        to={`/admin/edit-music/${music.id}`}
                        className="btn btn-info ml-2"
                    >
                        ویرایش آهنگ
                    </Link>

                    <button
                        onClick={() => handleDeleteMusic(music.id)}
                    >
                        حذف آهنگ
                    </button>
                </div>

            </div>
        </div>
    );
}

export default MusicItem;