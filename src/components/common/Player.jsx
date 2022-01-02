import React, { Fragment } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import config from './../../services/config.json';

//action
import { setMusic } from '../../state_manager/actions/song';
import { plusPlayedMusic } from '../../services/musicServises';


const Player = () => {

    const playList = useSelector(state => state.playList);
    const song = useSelector(state => state.song);

    const listLength = playList.length;

    const dispatch = useDispatch();
    //set music on load
    if (!isEmpty(playList) && isEmpty(song)) {
        setTimeout(() => {
            const music = playList[0];
            music.index = 0;
            dispatch(setMusic(music));
        }, 1000);
    }

    //prev music
    const handleClickPrevious = () => {
        let songIndex = song.index - 1;

        playList.map((music, index) => {
            if (index === songIndex) {
                music.index = index;
                dispatch(setMusic(music));
            }
        })

        if (songIndex < 0) {
            const music = playList[listLength - 1];
            music.index = listLength - 1;
            dispatch(setMusic(music));
        }
    }

    //next music
    const handleClickNext = () => {
        let songIndex = song.index + 1;

        playList.map((music, index) => {
            if (index === songIndex) {
                music.index = index;
                dispatch(setMusic(music));
            }
        })

        if (songIndex > listLength - 1) {
            const music = playList[0];
            music.index = 0;
            dispatch(setMusic(music));
        }
    }

    //end music
    const handleEndMusic = () => {
        let songIndex = song.index + 1;

        playList.map((music, index) => {
            if (index === songIndex) {
                music.index = index;
                dispatch(setMusic(music));
            }
        })

        if (songIndex > listLength - 1) {
            const music = playList[0];
            music.index = 0;
            dispatch(setMusic(music));
        }
    }

    //on play music
    const handleOnPlay = async () => {
        const music = new FormData();
        music.append('id' , song.id)
        await plusPlayedMusic(music).then(
            resolved => {
                const { status, data } = resolved;
            }
        )
    }

    return (
        <Fragment>
            <div className="player">
                <AudioPlayer
                    src={`${config.nic_music}/${song.src}`}
                    volume={.5}
                    showFilledVolume={true}
                    showSkipControls={true}
                    showJumpControls={false}
                    layout="horizontal-reverse"
                    progressUpdateInterval={10}
                    onClickPrevious={() => handleClickPrevious()}
                    onClickNext={() => handleClickNext()}
                    onEnded={() => handleEndMusic()}
                    onPlay={() => handleOnPlay()}
                />
            </div>
        </Fragment>
    );
}

export default Player;