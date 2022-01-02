import React from 'react'
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { Link } from 'react-router-dom';

//services
import config from '../../../services/config.json';
import { deleteSinger } from '../../../services/singerServices';
import { updateSingers } from '../../../state_manager/actions/singers';

import { errorMessage, successMessage } from '../../../utils/message';


const SingerItem = ({ singer, index }) => {

    const dispatch = useDispatch();

    const handleDeleteSinger = async singerId => {

        const confirm = window.confirm("خواننده حذف بشه؟");

        if (confirm === true) {
            dispatch(showLoading());
            const FormSinger = new FormData();
            FormSinger.append('singer_id', singerId);

            await deleteSinger(FormSinger).then(
                resolved => {
                    const { status, data } = resolved;
                    if (status === 200) {
                        dispatch(hideLoading());
                        successMessage(data);
                        dispatch(updateSingers(singerId));
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
                                src={`${config.nic_music}${singer.image}`}
                                className="img-fluid"
                            />
                        </div>
                        <div className="w_tp_song_name">
                            <h3>
                                {singer.name}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="weekly_left weekly_left_album">

                    <Link
                        to={`/admin/edit-singer/${singer.id}`}
                        className="btn btn-info ml-2"
                    >
                        ویرایش خواننده
                    </Link>

                    <button
                        onClick={() => handleDeleteSinger(singer.id)}
                    >
                        حذف خواننده
                    </button>
                </div>

            </div>
        </div>
    );
}

export default SingerItem;