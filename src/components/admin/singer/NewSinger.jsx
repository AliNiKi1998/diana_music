import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { errorMessage, successMessage } from '../../../utils/message';
import { Validator } from '../../../utils/validator';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router';
import { addSinger } from '../../../services/singerServices';


const NewSinger = ({ history }) => {

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [, forceUpdate] = useState();

    // validator
    const validator = Validator();

    const handleAddSinger = async e => {
        e.preventDefault();


        if (validator.current.allValid()) {
            dispatch(showLoading());
            // formData
            const singerFormData = new FormData();
            singerFormData.append('name', name);
            singerFormData.append('description', description);
            singerFormData.append('image', image);

            setTimeout(() => {
                dispatch(hideLoading());
            }, 500);

            await addSinger(singerFormData).then(
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
                <title>ثبت خواننده جدید</title>
            </Helmet>
            <div className="ms_profile_wrapper">
                <h1>ثبت خواننده جدید</h1>
                <div className="ms_profile_box">
                    <div className="album_dialog d-flex justify-content-center">
                        <form onSubmit={e => handleAddSinger(e)}>
                            <div className="ms_pro_form">
                                <div className="form-group">
                                    <label>اسم خواننده *</label>
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
                                    <label>توضیحات *</label>
                                    <textarea
                                        placeholder="توضیحات"
                                        name="description"
                                        className="form-control"
                                        value={description}
                                        onChange={e => {
                                            setDescription(e.target.value);
                                            validator.current.showMessageFor('description');
                                        }}>

                                    </textarea>
                                    {validator.current.message('description', description, 'required')}
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
                                        to="/admin/singers"
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

export default withRouter(NewSinger);