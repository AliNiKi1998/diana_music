import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
//actions
import { setPlayList } from '../../../state_manager/actions/playList';
import { setMusic } from '../../../state_manager/actions/song';
//srvices
import { getWeeklyPublishMusic } from '../../../services/musicServises';
import { errorMessage } from '../../../utils/message';


const Banner = () => {

    const dispatch = useDispatch();

    const handleWeeklyPublish = async () => {
        await getWeeklyPublishMusic().then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    dispatch(setPlayList(data));
                    if (!isEmpty(data)) {
                        let music = data[0];
                        music.index = 0;
                        dispatch(setMusic(music));
                    } else {
                        errorMessage('در این هفته موزیکی منتشر نشده')
                    }

                }
            }
        )
    }

    return (
        <Fragment>
            <div className="ms-banner">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="ms_banner_img">
                                <img src="images/banner.png" alt="" className="img-fluid" />
                            </div>
                            <div className="ms_banner_text">
                                <h1>آهنگ های</h1>
                                <h1 className="ms_color">منتشر شده این هفته !</h1>
                                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. <br /> چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.</p>
                                <div className="ms_banner_btn">
                                    <h6
                                        className="ms_btn"
                                        onClick={() => handleWeeklyPublish()}
                                    >پخش آهنگ ها</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Banner;