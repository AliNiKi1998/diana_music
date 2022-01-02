import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { Link } from 'react-router-dom';

// actions
import { setPlayList } from './../../../state_manager/actions/playList';
import { setMusic } from '../../../state_manager/actions/song';

// services
import { deletePlayList, getMusicOfPlayList } from '../../../services/musicServises';
import { errorMessage, successMessage } from '../../../utils/message';
import { updateUserPlayList } from '../../../state_manager/actions/user/userPlayList';


const PlayListItem = ({ playList }) => {

    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    const handleRunPlayList = async () => {

        dispatch(showLoading());
        // formData
        const listFormData = new FormData();
        listFormData.append('user_id', user.id);
        listFormData.append('playListId', playList.id);

        await getMusicOfPlayList(listFormData).then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    setTimeout(() => {
                        dispatch(hideLoading());
                    }, 500)
                    if (data.length != 0) {
                        dispatch(setPlayList(data));
                        let music = data[0];
                        music.index = 0;
                        dispatch(setMusic(music));
                    } else {
                        errorMessage('پلی لیست خالیه')
                    }
                }
            }
        )
    }

    const handleDeletePlayList = async () => {

        const confirm = window.confirm("پلی لیست حذف بشه؟؟؟");
        if (confirm === true) {
            // form data
            const deleteForm = new FormData();
            deleteForm.append('user_id', user.id);
            deleteForm.append('playListId', playList.id);

            await deletePlayList(deleteForm).then(
                resolved => {
                    const { status, data } = resolved;
                    if (status === 200) {
                        successMessage(data);
                        dispatch(updateUserPlayList(playList.id));
                    }
                },
                rejected => {
                    if (rejected.response) {
                        const { status, data } = rejected.response;
                        if (status === 404) {
                            errorMessage(data);
                            dispatch(updateUserPlayList(playList.id));
                        }
                    }
                }
            )
        }
    }

    return (
        <Fragment>
            <div className="col-lg-2 col-md-6">
                <div className="ms_rcnt_box marger_bottom25">
                    <div className="ms_rcnt_box_img">
                        <img src="images/station/station1.jpg" alt="" className="img-fluid" />
                        <div className="ms_main_overlay">
                            <div className="ms_box_overlay"></div>
                            <div
                                className="ms_play_icon"
                                onClick={() => handleRunPlayList()}
                            >
                                <img src="images/svg/play.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="ms_rcnt_box_text d-flex ">
                        <h3>
                            <Link to={`/play-list/${playList.id}`}>{playList.name}</Link>
                            <p className='mt-2'>{playList.musicCount} موسیقی</p>
                        </h3>
                        <i
                            className="fa fa-times mr-auto"
                            onClick={() => handleDeletePlayList()}
                        ></i>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default PlayListItem;