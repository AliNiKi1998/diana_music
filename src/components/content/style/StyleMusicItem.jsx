import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { errorMessage, successMessage } from '../../../utils/message';
//actions
import { setPlayList } from '../../../state_manager/actions/playList';
import { setMusic } from '../../../state_manager/actions/song';

//services
import { addToPlayList } from '../../../services/musicServises';
import config from './../../../services/config.json';

const StyleMusicItem = ({ music, index, musics }) => {

    const user = useSelector(state => state.user);
    const song = useSelector(state => state.song);
    const userPlayList = useSelector(state => state.userPlayList);

    const dispatch = useDispatch();

    const handleSetMusic = (index) => {
        dispatch(setPlayList(musics));
        let music = musics[index];
        music.index = index;
        dispatch(setMusic(music));
    }

    const handleAddToPlayList = async (musicId, playListId) => {
        dispatch(showLoading());
        const FormAddToPlayList = new FormData();
        FormAddToPlayList.append('user_id', user.id);
        FormAddToPlayList.append('musicId', musicId);
        FormAddToPlayList.append('playListId', playListId);

        await addToPlayList(FormAddToPlayList).then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    successMessage(data);
                    dispatch(hideLoading());
                }
            },
            rejected => {
                if (rejected.response) {
                    const { status, data } = rejected.response;
                    if (status === 401) {
                        errorMessage(data);
                        dispatch(hideLoading());
                    }
                }
            }
        )
    }

    let showOverlay = '';
    let playIcon = '';

    if (music.id === song.id) {
        showOverlay = 'show_overlay';
        playIcon = 'ms_play_icon_active';
    }

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

                            <div className={`ms_picture_overlay ${showOverlay}`} ></div>
                            <div className={`ms_play_icon ${playIcon}`}>
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
                        <div className="ms_more_icon">
                            <i className="fa fa-music">
                                <ul className="more_option">
                                    <li className="more_option_li position-relative">
                                        <span className="opt_icon">
                                            <span className="icon icon_playlst"></span>
                                        </span>
                                        <h6>افزودن به پلی لیست</h6>
                                        <ul className="more_option_2">
                                            {!isEmpty(userPlayList) ? userPlayList.map(item => (
                                                <li
                                                    key={item.id}
                                                >
                                                    <span className="opt_icon">
                                                        <span className="icon icon_playlst"></span>
                                                    </span>
                                                    <h5
                                                        onClick={() => handleAddToPlayList(music.id, item.id)}
                                                    >{item.name}</h5>
                                                </li>

                                            ))
                                                : null
                                            }
                                        </ul>
                                    </li>
                                    <li>

                                        <a href={`${config.nic_music}/${music.src}`}>
                                            <span className="opt_icon">
                                                <span className="icon icon_dwn"></span>
                                            </span>
                                            دانلود
                                        </a>
                                    </li>
                                </ul>
                            </i>
                        </div>
                    </div>



                </div>

            </div>
        </Fragment>
    );
}

export default StyleMusicItem;