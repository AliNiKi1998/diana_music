import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { errorMessage, successMessage } from '../../../utils/message';
import { Validator } from '../../../utils/validator';
import { isEmpty } from 'lodash';
import { addAlbum } from '../../../services/musicServises';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router';


const NewAlbum = ({ history }) => {

    const singers = useSelector(state => state.singers);

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [singerId, setSingetId] = useState("");
    const [, forceUpdate] = useState();

    // validator
    const validator = Validator();

    const handleAddAlbum = async e => {
        e.preventDefault();


        if (validator.current.allValid()) {
            dispatch(showLoading());
            // formData
            const albumFormData = new FormData();
            albumFormData.append('name', name);
            albumFormData.append('singer_id', singerId);
            albumFormData.append('image', image);

            if (isEmpty(singerId)) {
                errorMessage('خواننده انتخاب نشده است');
                dispatch(hideLoading());
                return false;
            }

            setTimeout(() => {
                dispatch(hideLoading());
            }, 500);

            await addAlbum(albumFormData).then(
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

    return (
        <Fragment>
            <Helmet>
                <title>ثبت آلبوم جدید</title>
            </Helmet>
            <div className="ms_profile_wrapper">
                <h1>ثبت آلبوم جدید</h1>
                <div className="ms_profile_box">
                    <div className="album_dialog d-flex justify-content-center">
                        <form onSubmit={e => handleAddAlbum(e)}>
                            <div className="ms_pro_form">
                                <div className="form-group">
                                    <label>اسم آلبوم *</label>
                                    <input
                                        type="text"
                                        placeholder="آلبوم رگ خواب"
                                        name="name"
                                        className="form-control"
                                        value={name}
                                        onChange={e => {
                                            setName(e.target.value);
                                            validator.current.showMessageFor('name');
                                        }}
                                    />
                                    {validator.current.message('name', name, 'required')}
                                </div>
                                <div className="form-group">
                                    <label> انتخاب خواننده *</label>
                                    <select
                                        name="singer_id"
                                        onChange={e => setSingetId(e.target.value)}
                                    >
                                        <option></option>
                                        {singers ? (
                                            singers.map(singer => (
                                                <option key={singer.id} value={singer.id}>{singer.name}</option>
                                            ))
                                        ) : (null)}

                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>آپلود عکس *</label>
                                    {validator.current.message('image', image, 'required')}
                                    {validator.current.message('image', Math.floor(image.size / 2048), 'numeric|max:2048,num')}
                                    <div className="fileUpload">
                                        <input
                                            type="file"
                                            name="image"
                                            className="upload"
                                            onChange={e => {
                                                setImage(e.target.files[0]);
                                                validator.current.showMessageFor('image')
                                            }}
                                        />
                                        <span>انتخاب عکس</span>
                                    </div>
                                </div>

                                <div className="pro-form-btn text-center marger_top15 d-flex alignitems-center justify-content-around"
                                >
                                    <button className="btn btn-success" type="submit">افزودن</button>
                                    <Link
                                        to="/admin/albums"
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

export default withRouter(NewAlbum);