import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
//action
import { setPlayList } from '../../../../state_manager/actions/playList';
import { setMusic } from '../../../../state_manager/actions/song';
//services
import config from './../../../../services/config.json';
import { getSingerMusics } from '../../../../services/singerServices';
import { errorMessage } from '../../../../utils/message';
// import { ShowImage } from '../../../common/ShowImage';


const DianaSliderItem = ({ image, singerName, musics, id }) => {

    const dispatch = useDispatch();

    const handleSetMusicPlayList = async singerId => {

        const singerIdForm = new FormData();
        singerIdForm.append('singer_id', singerId);

        await getSingerMusics(singerIdForm).then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    if (!isEmpty(data)) {
                        dispatch(setPlayList(data));
                        let music = data[0];
                        music.index = 0;
                        dispatch(setMusic(music));
                    } else {
                        errorMessage('لیست آهنگ ها خالیه')
                    }
                }
            }
        )
    }

    return (
        <div className="swiper-slide">
            <div className="ms_rcnt_box">
                <div className="ms_rcnt_box_img">
                    <img src={`${config.nic_music}${image}`} alt="" />
                    <div className="ms_main_overlay">
                        <div className="ms_box_overlay"></div>

                        <div className="ms_play_icon">
                            <img
                                src="images/svg/play.svg"
                                onClick={() => handleSetMusicPlayList(id)}
                            />
                        </div>
                    </div>
                </div>
                <div className="ms_rcnt_box_text">
                    <h3>
                        <Link
                            to={`/singer/${id}`}
                        >
                            {singerName}
                        </Link>
                    </h3>
                    <p>موسیقی {musics}</p>
                </div>
            </div>
        </div>
    );
}

export default DianaSliderItem;