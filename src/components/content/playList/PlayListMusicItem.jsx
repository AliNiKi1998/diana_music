import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { deleteItemPlayList, getMusicOfPlayList } from '../../../services/musicServises';
import { setListMusic, updateListMusic } from '../../../state_manager/actions/listMusic';
import { setPlayList, updatePlayList } from '../../../state_manager/actions/playList';
import { setMusic } from '../../../state_manager/actions/song';
import { successMessage } from '../../../utils/message';
import { withRouter } from 'react-router';

import config from './../../../services/config.json';

const PlayListMusicItem = ({ music, index, currentPlayList , match }) => {

    const user = useSelector(state => state.user);
    const song = useSelector(state => state.song);
    const playList = useSelector(state => state.playList);

    const dispatch = useDispatch();

    const handleDeleteMusicPlayList = async e => {

        const confirm = window.confirm("آهنگ از پلی لیست حذف بشه؟؟؟");

        if (confirm === true) {
            // form data
            const deleteForm = new FormData();
            deleteForm.append('user_id', user.id);
            deleteForm.append('musicId', e.target.dataset.value);
            deleteForm.append('playListId', match.params.id);

            await deleteItemPlayList(deleteForm).then(
                resolved => {
                    const { status, data } = resolved;
                    if (status === 200) {
                        successMessage(data);
                        dispatch(updateListMusic(index));
                        dispatch(updatePlayList(index));
                        let music = playList[0];
                        music.index = 0;
                        if (!isEmpty(music)) {
                            dispatch(setMusic(music));
                        }
                    }
                }
            )
        }
    }

    const handleGetMusics = async () => {
        // formData
        const listFormData = new FormData();
        listFormData.append('user_id', user.id);
        listFormData.append('playListId', currentPlayList.id);

        await getMusicOfPlayList(listFormData).then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    dispatch(setListMusic(data));
                    dispatch(setPlayList(data));
                }
            }
        )


    }

    const handleSetMusic = (index) => {
        handleGetMusics();
        let music = playList[index];
        music.index = index;
        dispatch(setMusic(music));
    }

    let showOverlay = 'show_overlay';
    let playIcon = 'ms_play_icon_active';

    return (
        <Fragment>

            <div className="ms_weekly_box d-flex align-items-center justify-content-between">
                <div className="weekly_right">
                    <span className="w_top_no">
                        {index + 1}
                    </span>
                    <div className="w_top_song">
                        <div className="w_tp_song_img position-relative">
                            <img
                                src={`${config.nic_music}${music.image.small}`}
                                className="img-fluid"
                                onClick={() => handleSetMusic(index)}
                            />

                            <div className={`ms_picture_overlay ${song.id === music.id ? showOverlay : ''}`} ></div>
                            <div className={`ms_play_icon ${song.id === music.id ? playIcon : ''}`}>
                                <div className="ms_bars">
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                </div>
                            </div>
                        </div>
                        <div className="w_tp_song_name">
                            <h3>{music.name}</h3>
                            <p>{music.singerName}</p>
                        </div>
                    </div>
                </div>
                <div className="weekly_left">
                    <div className="song_options" >
                        <i
                            className="fa fa-times"
                            onClick={(e) => handleDeleteMusicPlayList(e)}
                            data-value={music.id}
                        ></i>
                    </div>



                </div>

            </div>
        </Fragment>
    );
}

export default withRouter(PlayListMusicItem);