import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';
//services
import { getStyleMusics, getStyles } from '../../../services/styleServices';
//actions
import { setPlayList } from '../../../state_manager/actions/playList';
import { setMusic } from '../../../state_manager/actions/song';
import { errorMessage } from '../../../utils/message';

const Style = () => {

    const [styles, setStyles] = useState([]);

    const dispatch = useDispatch();

    const handleGetStyles = async () => {
        await getStyles().then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    setStyles(data);
                }
            }
        )
    }

    const handleSetPlayList = async styleId => {
        const FormStyleId = new FormData();
        FormStyleId.append('genreId', styleId);

        await getStyleMusics(FormStyleId).then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    if (isEmpty(data)) {
                        errorMessage('هیچ موزیکی پیدا نشد')
                    } else {
                        dispatch(setPlayList(data));
                        let music = data[0];
                        music.index = 0;
                        dispatch(setMusic(music));
                    }
                }
            },
            rejected => {
                if (rejected.response) {
                    const { status, data } = rejected.response;
                    if (status === 404) {
                        errorMessage(data);
                    }
                }
            }
        )
    }

    useEffect(() => {
        handleGetStyles();
    }, [])

    let love, pop, rak, rap, happy, clasic = {};

    if (!isEmpty(styles)) {
        styles.map(style => {
            if (style.name === "پاپ") {
                pop = style;
            }
            if (style.name === 'عاشقانه') {
                love = style;
            }
            if (style.name === 'راک') {
                rak = style;
            }
            if (style.name === 'رپ') {
                rap = style;
            }
            if (style.name === 'شاد') {
                happy = style;
            }
            if (style.name === 'کلاسیک') {
                clasic = style;
            }
        })
    }

    return (
        <Fragment>
            {!isEmpty(styles) ?
                <div className="ms_genres_wrapper">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ms_heading">
                                <h1>سبک های پرمخاطب</h1>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="ms_genres_box">
                                <img src="images/genrs/img1.jpg" alt="" className="img-fluid" />
                                <div className="ms_main_overlay">
                                    <div className="ms_box_overlay"></div>
                                    <div className="ms_play_icon">
                                        <img
                                            src="images/svg/play.svg"
                                            onClick={() => handleSetPlayList(love.id)}
                                        />
                                    </div>
                                    <div className="ovrly_text_div">
                                        <span className="ovrly_text1">
                                            <Link
                                                to={`style/musics/${love.id}`}
                                            >
                                                {love.name}
                                            </Link>
                                        </span>
                                    </div>
                                </div>
                                <div className="ms_box_overlay_on">
                                    <div className="ovrly_text_div">
                                        <span className="ovrly_text1">
                                            <Link
                                                to={`style/musics/${love.id}`}
                                            >
                                                {love.name}
                                            </Link>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="ms_genres_box">
                                        <img src="images/genrs/img2.jpg" alt="" className="img-fluid" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay"></div>
                                            <div className="ms_play_icon">
                                                <img
                                                    src="images/svg/play.svg"
                                                    onClick={() => handleSetPlayList(clasic.id)}
                                                />
                                            </div>
                                            <div className="ovrly_text_div">
                                                <span className="ovrly_text1">
                                                    <Link
                                                        to={`style/musics/${clasic.id}`}
                                                    >
                                                        {clasic.name}
                                                    </Link>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ms_box_overlay_on">
                                            <div className="ovrly_text_div">
                                                <span className="ovrly_text1">
                                                    <Link
                                                        to={`style/musics/${clasic.id}`}
                                                    >
                                                        {clasic.name}
                                                    </Link>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="ms_genres_box">
                                        <img src="images/genrs/img3.jpg" alt="" className="img-fluid" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay"></div>
                                            <div className="ms_play_icon">
                                                <img
                                                    src="images/svg/play.svg"
                                                    onClick={() => handleSetPlayList(rap.id)}
                                                />
                                            </div>
                                            <div className="ovrly_text_div">
                                                <span className="ovrly_text1">
                                                    <Link
                                                        to={`style/musics/${rap.id}`}
                                                    >
                                                        {rap.name}
                                                    </Link>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ms_box_overlay_on">
                                            <div className="ovrly_text_div">
                                                <span className="ovrly_text1">
                                                    <Link
                                                        to={`style/musics/${rap.id}`}
                                                    >
                                                        {rap.name}
                                                    </Link>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="ms_genres_box">
                                        <img src="images/genrs/img5.jpg" alt="" className="img-fluid" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay"></div>
                                            <div className="ms_play_icon">
                                                <img
                                                    src="images/svg/play.svg"
                                                    onClick={() => handleSetPlayList(happy.id)}
                                                />
                                            </div>
                                            <div className="ovrly_text_div">
                                                <span className="ovrly_text1">
                                                    <Link
                                                        to={`style/musics/${happy.id}`}
                                                    >
                                                        {happy.name}
                                                    </Link>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ms_box_overlay_on">
                                            <div className="ovrly_text_div">
                                                <span className="ovrly_text1">
                                                    <Link
                                                        to={`style/musics/${happy.id}`}
                                                    >
                                                        {happy.name}
                                                    </Link>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="ms_genres_box">
                                        <img src="images/genrs/img6.jpg" alt="" className="img-fluid" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay"></div>
                                            <div className="ms_play_icon">
                                                <img
                                                    src="images/svg/play.svg"
                                                    onClick={() => handleSetPlayList(pop.id)}
                                                />
                                            </div>
                                            <div className="ovrly_text_div">
                                                <span className="ovrly_text1">
                                                    <Link
                                                        to={`style/musics/${pop.id}`}
                                                    >
                                                        {pop.name}
                                                    </Link>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ms_box_overlay_on">
                                            <div className="ovrly_text_div">
                                                <span className="ovrly_text1">
                                                    <Link
                                                        to={`style/musics/${pop.id}`}
                                                    >
                                                        {pop.name}
                                                    </Link>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="ms_genres_box">
                                <img src="images/genrs/img4.jpg" alt="" className="img-fluid" />
                                <div className="ms_main_overlay">
                                    <div className="ms_box_overlay"></div>
                                    <div className="ms_play_icon">
                                        <img
                                            src="images/svg/play.svg"
                                            onClick={() => handleSetPlayList(rak.id)}
                                        />
                                    </div>
                                    <div className="ovrly_text_div">
                                        <span className="ovrly_text1">
                                            <Link
                                                to={`style/musics/${rak.id}`}
                                            >
                                                {rak.name}
                                            </Link>
                                        </span>
                                    </div>
                                </div>
                                <div className="ms_box_overlay_on">
                                    <div className="ovrly_text_div">
                                        <span className="ovrly_text1">
                                            <Link
                                                to={`style/musics/${rak.id}`}
                                            >
                                                {rak.name}
                                            </Link>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : null
            }
        </Fragment>
    );
}

export default Style;