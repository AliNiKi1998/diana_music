import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//action
import { setMusic } from '../../state_manager/actions/song';

import config from './../../services/config.json';


const PlayListMusic = (props) => {

    const song = useSelector(state => state.song);
    const dispatch = useDispatch();

    const { image, musicName, singerName, index, music } = props;

    const handlePlayListMusic = () => {
        music.index = index;
        dispatch(setMusic(music))
    }
    let active = song.index === index ? 'list_music_active' : '';

    let showOverlay = '';
    let playIcon = '';
    
    if (active) {
        showOverlay = 'show_overlay';
        playIcon = 'ms_play_icon_active';
    }

    return (
        <Fragment>
            <div className={`song ${active}`}>
                <div className="song_picture position-relative">
                    <img
                        src={`${config.nic_music}${image}`}
                        alt=""
                        onClick={() => handlePlayListMusic()}
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
                <div className="song_content">
                    <h3>{musicName}</h3>
                    <h5>{singerName}</h5>
                </div>
            </div>
        </Fragment>
    );
}

export default PlayListMusic;