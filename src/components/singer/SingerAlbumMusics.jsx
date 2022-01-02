import React, { Fragment, useEffect, useState } from 'react'
import { getAlbumInfo } from '../../services/musicServises';
import { getSingerAlbumMusics } from '../../services/singerServices';
import { errorMessage } from '../../utils/message';
import { scrollTop } from '../../utils/scrollTop';

import SingerAlbumMusicItem from './SingerAlbumMusicItem';

const SingerAlbumMusics = ({ match, history }) => {

    scrollTop();

    const albumId = match.params.id;

    const [albumMusics, setAlbumMusics] = useState([]);
    const [albumInfo, setAlbumInfo] = useState({});

    const handleGetAlbumInfo = async () => {
        const FormAlbum = new FormData();
        FormAlbum.append('albumId', albumId);
        await getAlbumInfo(FormAlbum).then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    setAlbumInfo(data);
                }
            },
            rejected => {
                if (rejected.response) {
                    const { status, data } = rejected.response;

                    if (status === 404) {
                        errorMessage(data);
                        history.goBack();
                    }
                }
            }
        )
    }
    

    const handleRunPlayList = async () => {

        const FormAlbum = new FormData();
        FormAlbum.append('album_id', albumId);

        await getSingerAlbumMusics(FormAlbum).then(
            resolved => {
                const { status, data } = resolved;

                if (status === 200) {
                    setAlbumMusics(data);
                }
            }
        )
    }

    useEffect(() => {
        handleGetAlbumInfo();
        handleRunPlayList();
    }, [])


    return (
        <Fragment>
            <div className="ms_weekly_wrapper">
                <div className="ms_weekly_inner">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ms_heading">
                                <h1>آلبوم {albumInfo.name}</h1>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12 padding_right40">

                            {albumMusics.map((music, index) => (
                                <SingerAlbumMusicItem
                                    key={music.id}
                                    music={music}
                                    index={index}
                                    musics={albumMusics}
                                />
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default SingerAlbumMusics;