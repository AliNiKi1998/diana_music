import React, { Fragment, useRef } from 'react'
import { useSelector } from 'react-redux';

import PlayListMusic from './PlayListMusic';


const PlayList = () => {

    const playListMusic = useSelector(state => state.playList);

    let openMenu = false;
    
    const playList = useRef()
    
    const swiperMenu = (e) => {
        openMenu = !openMenu;

        if (openMenu) {
            playList.current.style.left = "0"
            if(e.target.tagName === "I"){
                e.target.style.transform = "translateY(-50%) rotate(180deg)";
            }
            if(e.target.tagName === "DIV"){
                e.target.childNodes[0].style.transform = "translateY(-50%) rotate(180deg)";
            }
        }

        if (openMenu === false) {
            playList.current.style.left = "-20%"
            if(e.target.tagName === "I"){
                e.target.style.transform = "translateY(-50%) rotate(0deg)";
            }
            if(e.target.tagName === "DIV"){
                e.target.childNodes[0].style.transform = "translateY(-50%) rotate(0deg)";
            }
        }


    }

    return (
        <Fragment>
            <div 
            className="play_list_main"
            ref={playList}
            >
                <div className="play_list">
                    <div className="songs">
                        {playListMusic.map((music, index) => (
                            <PlayListMusic
                                key={music.id}
                                image={music.image.small}
                                musicName={music.name}
                                singerName={music.singerName}
                                index={index}
                                music={music}
                            />
                        ))}

                    </div>
                </div>

                <div
                    className="ms_nav_close"
                    onClick={(e) => swiperMenu(e)}
                >
                    <i 
                    className="fa fa-angle-right"
                    aria-hidden="true"
                    ></i>
                </div>
            </div>
        </Fragment>
    );
}

export default PlayList;