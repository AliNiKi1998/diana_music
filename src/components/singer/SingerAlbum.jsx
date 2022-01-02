import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
//action
import { setMusic } from '../../state_manager/actions/song';
import { setPlayList } from '../../state_manager/actions/playList';
//services
import { getSingerAlbumMusics } from '../../services/singerServices';
import config from './../../services/config.json';
import { errorMessage } from '../../utils/message';

const SingerAlbum = ({ album }) => {

    

    const dispatch = useDispatch();

    const handleRunPlayList = async () => {
        
        const FormAlbum = new FormData();
        FormAlbum.append('album_id', album.id);

        await getSingerAlbumMusics(FormAlbum).then(
            resolved => {
                const { status, data } = resolved;

                if (status === 200) {
                    if (!isEmpty(data)) {
                        dispatch(setPlayList(data));
                        let music = data[0];
                        music.index = 0;
                        dispatch(setMusic(music));
                    }else{
                        errorMessage('آلبوم خالیه')
                    }
                }
            }
        )
    }

    return (
        <Fragment>
            <div className="col-lg-2 col-md-6">
                <div className="ms_rcnt_box marger_bottom25">
                    <div className="ms_rcnt_box_img">
                        <img src={`${config.nic_music}${album.image}`} alt="" className="img-fluid" />
                        <div className="ms_main_overlay">
                            <div className="ms_box_overlay"></div>
                            <div
                                className="ms_play_icon"
                                onClick={() => handleRunPlayList()}
                            >
                                <img src="../images/svg/play.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="ms_rcnt_box_text">
                        <h3>
                            <Link to={`/singer/album/musics/${album.id}`}>{album.name}</Link>
                        </h3>
                        <p>{album.musicCount} موسیقی</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default SingerAlbum;