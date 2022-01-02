import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { errorMessage, successMessage } from '../../../utils/message';
import { Validator } from '../../../utils/validator';
import { isEmpty } from 'lodash';

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router';
import { getStyles } from '../../../services/styleServices';
import { editMusic, getAlbumOfSinger } from '../../../services/musicServises';


const EditMusic = ({ history, match }) => {
    const singers = useSelector(state => state.singers);
    const musicId = match.params.id;
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [audio, setAudio] = useState("");
    const [singerId, setSingerId] = useState("");
    const [albumId, setAlbumId] = useState("");
    const [singerAlbums, setSingerAlbums] = useState([]);
    const [gernres, setGernres] = useState([]);
    const [genreId, setGenreId] = useState("");
    const [, forceUpdate] = useState();

    // validator
    const validator = Validator();

    const handleEditMusic = async e => {
        e.preventDefault();

        if (validator.current.allValid()) {
            dispatch(showLoading());
            
            // formData
            const musicFormData = new FormData();
            musicFormData.append('music_id', musicId);
            musicFormData.append('name', name);
            musicFormData.append('image', image);
            musicFormData.append('src', audio );
            musicFormData.append('singer_id', singerId);
            musicFormData.append('album_id', albumId);
            musicFormData.append('genre_id', genreId);

            setTimeout(() => {
                dispatch(hideLoading());
            }, 500);

            await editMusic(musicFormData).then(
                resolved => {
                    const { status, data } = resolved;
                    if (status === 200) {
                        dispatch(hideLoading())
                        successMessage(data);
                        history.goBack();
                    }
                },
                rejected => {
                    if (rejected.response) {
                        const { status, data } = rejected.response
                        if (status === 401) {
                            errorMessage(data);
                        }
                    }
                }
            )
        } else {
            validator.current.showMessages();
            forceUpdate(1);
            errorMessage('اطلاعات وارد شده صحیح نیست')
        }
    }

    const handleGetAlbum = async singerId => {
        const singerFormData = new FormData();
        singerFormData.append('singer_id', singerId);

        await getAlbumOfSinger(singerFormData).then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {

                    setSingerAlbums(data);
                }
            },
            rejected => {
                if (rejected.response) {
                    const { status, data } = rejected.response
                    if (status === 404) {
                        setSingerAlbums([]);
                        errorMessage(data);
                    }
                }
            }
        )


    }

    const handleGetGenres = async () => {


        await getStyles().then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    setGernres(data);
                }
            },
            rejected => {
                if (rejected.response) {
                    const { status, data } = rejected.response
                    if (status === 404) {
                        errorMessage(data);
                    }
                }
            }
        )


    }

    useEffect(() => {
        handleGetGenres()
    }, [])


    return (
        <Fragment>
        <Helmet>
            <title>ثبت خواننده جدید</title>
        </Helmet>
        <div className="ms_profile_wrapper">
            <h1>ثبت خواننده جدید</h1>
            <div className="ms_profile_box">
                <div className="album_dialog d-flex justify-content-center">
                    <form onSubmit={e => handleEditMusic(e)}>
                        <div className="ms_pro_form">
                            <div className="form-group">
                                <label>اسم آهنگ *</label>
                                <input
                                    type="text"
                                    placeholder="آلبوم رگ خواب"
                                    name="name"
                                    className="form-control"
                                    value={name}
                                    onChange={e => {
                                        setName(e.target.value);
                                        
                                    }}
                                />
                                
                            </div>

                            <div className="form-group">
                                <label> انتخاب خواننده *</label>
                                <select
                                    name="singer_id"
                                    onChange={e => {
                                        setSingerId(e.target.value);
                                        handleGetAlbum(e.target.value);
                                    }}
                                >
                                    <option></option>
                                    {singers ? (
                                        singers.map(singer => (
                                            <option key={singer.id} value={singer.id}>{singer.name}</option>
                                        ))
                                    ) : (null)}

                                </select>
                            </div>

                            {!isEmpty(singerAlbums) ? (
                                <div className="form-group">
                                    <label> انتخاب آلبوم *</label>
                                    <select
                                        name="singer_id"
                                        onChange={e => {
                                            setAlbumId(e.target.value);
                                        }}
                                    >
                                        <option></option>
                                        {singerAlbums ? (
                                            singerAlbums.map(album => (
                                                <option key={album.id} value={album.id}>{album.name}</option>
                                            ))
                                        ) : (null)}

                                    </select>
                                </div>
                            ) :
                                !isEmpty(singerId) ? (<p>ابتدا یک آلبوم برای این خواننده ثبت کنید</p>) : (null)
                            }

                            <div className="form-group">
                                <label> انتخاب سبک *</label>
                                <select
                                    name="singer_id"
                                    onChange={e => {
                                        setGenreId(e.target.value);
                                    }}
                                >
                                    <option></option>
                                    {gernres ? (
                                        gernres.map(gernre => (
                                            <option key={gernre.id} value={gernre.id}>{gernre.name}</option>
                                        ))
                                    ) : (null)}

                                </select>
                            </div>


                            <div className="form-group">
                                <label>آپلود عکس *</label>
                               
                                <div className="fileUpload">
                                    <input
                                        type="file"
                                        name="image"
                                        className="upload"
                                        onChange={e => {
                                            setImage(e.target.files[0]);
                                            
                                        }}
                                    />
                                    <span>انتخاب عکس</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>آپلود آهنگ *</label>
                                
                                <div className="fileUpload">
                                    <input
                                        type="file"
                                        name="audio"
                                        className="upload"
                                        onChange={e => {
                                            setAudio(e.target.files[0]);
                                          
                                        }}
                                    />
                                    <span>انتخاب آهنگ</span>
                                </div>
                            </div>

                            <div className="pro-form-btn text-center marger_top15 d-flex alignitems-center justify-content-around"
                            >
                                <button className="btn btn-success" type="submit">ویرایش0.</button>
                                <Link
                                    to="/admin/songs"
                                    className="btn_wa"
                                >
                                    بازگشت
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Fragment>
    );
}

export default withRouter(EditMusic);