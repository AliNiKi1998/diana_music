import React, { Fragment, useEffect, useState } from 'react';

import SingerAlbum from './SingerAlbum';

//services
import { getSingerAlbums, getSingerInfo } from '../../services/singerServices';
import ShowImage from '../common/ShowImage';

import { scrollTop } from '../../utils/scrollTop';

const Singer = ({ match, history }) => {
    scrollTop();
    
    const singerId = match.params.id;

    const [singerInfo, setSingerInfo] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        handleAlbums();
        handleSingerInfo();
    }, [])

    const handleSingerInfo = async () => {
        const FormSinger = new FormData();
        FormSinger.append('singer_id', singerId);

        await getSingerInfo(FormSinger).then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    setSingerInfo(data);
                }
            },
            rejected => {
                if (rejected.response) {
                    const { status, data } = rejected.response;
                    if (status === 404) {
                        history.goBack();
                    }
                }
            }
        )
    }

    const handleAlbums = async () => {
        const FormSinger = new FormData();
        FormSinger.append('singer_id', singerId);

        await getSingerAlbums(FormSinger).then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    setAlbums(data);
                }
            }
        )
    }

    return (
        <Fragment>
            <div className="ms_releases_wrapper">
                <div className="col-12 singer_info">
                    <div className="row">
                        <div className="col-sm-6 col-md-3 singer_image">
                            <ShowImage image={singerInfo.image} size={80}/>
                        </div>
                        <div className="col-sm-6 col-md-9 singer_description">
                            <div className="singer_info_top d-flex align-items-center">
                                <h3>{singerInfo.name}</h3>
                                <div className="music_icon">
                                    {singerInfo.music}
                                    <i className="mr-2 fa fa-music"></i>
                                </div>
                                <div className="album_icon">
                                    {singerInfo.album}
                                    <i className="mr-2 fa fa-list"></i>
                                </div>
                            </div>
                            <p>{singerInfo.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <h4 className="w-100">آلبوم ها</h4>
                {albums ? albums.map(album => (
                    <SingerAlbum
                        key={album.id}
                        album={album}
                    />
                )) : null}
            </div>
        </Fragment>
    );
}

export default Singer;