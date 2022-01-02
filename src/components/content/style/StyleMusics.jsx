import React, { Fragment, useEffect, useState } from 'react';
import StyleMusicItem from './StyleMusicItem';
//services
import { getStyleInfo, getStyleMusics } from '../../../services/styleServices';
//utils
import { errorMessage } from '../../../utils/message';
import { scrollTop } from '../../../utils/scrollTop';


const StyleMusics = ({ match, history }) => {

    scrollTop();

    const styleId = match.params.id;

    const [styleMuics, setStyleMusics] = useState([]);
    const [styleInfo, setStyleInfo] = useState({});

    const handleStyleInfo = async () => {

        const FormStyleId = new FormData();
        FormStyleId.append('genreId', styleId);

        await getStyleInfo(FormStyleId).then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    setStyleInfo(data);
                }
            },
            rejected => {
                if (rejected.response) {
                    const { status, data } = rejected.response;
                    if (status === 404) {
                        errorMessage(data);
                        setTimeout(() => {
                            history.goBack()
                        }, 1000)
                    }
                }
            }
        )
    }

    const handleStyleMuiscs = async () => {

        const FormStyleId = new FormData();
        FormStyleId.append('genreId', styleId);

        await getStyleMusics(FormStyleId).then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    setStyleMusics(data);
                }
            }
        )
    }

    useEffect(() => {
        handleStyleInfo();
        handleStyleMuiscs();
    }, [])

    return (
        <Fragment>
            <div className="ms_weekly_wrapper">
                <div className="ms_weekly_inner">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ms_heading">
                                <h1>سبک {styleInfo.name}</h1>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12 padding_right40">

                            {styleMuics.map((music, index) => (
                                <StyleMusicItem
                                    key={music.id}
                                    music={music}
                                    index={index}
                                    musics={styleMuics}
                                />
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default StyleMusics;