import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { errorMessage, successMessage } from '../../../utils/message';

import { Validator } from '../../../utils/validator';
import PlayListItem from './PlayListItem';

//services
import { addPlayList, getPlayList } from '../../../services/musicServises';
//actions
import { setUserPlayList } from '../../../state_manager/actions/user/userPlayList';

const PlayList = () => {
    const user = useSelector(state => state.user);
    const userPlayList = useSelector(state => state.userPlayList);

    const [showForm, setShowForm] = useState(false);
    const [listName, setListName] = useState("");

    const [, forceUpdate] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        handleGetPlayList();
    }, [])

    const validator = Validator();


    const handleSubmit = async e => {
        e.preventDefault();

        if (validator.current.allValid()) {
            dispatch(showLoading());
            // formData
            const listFormData = new FormData();
            listFormData.append('user_id', user.id);
            listFormData.append('name', listName);

            await addPlayList(listFormData).then(
                resolved => {
                    const { status, data } = resolved;
                    if (status === 200) {
                        setTimeout(() => {
                            dispatch(hideLoading());
                            setShowForm(!showForm);
                            setListName("");
                        }, 500)
                        successMessage(data);
                        handleGetPlayList();
                    }
                },
                rejected => {
                    if (rejected.response) {
                        const { status, data } = rejected.response
                        if (status === 401) {
                            setTimeout(() => {
                                dispatch(hideLoading());
                            }, 500)
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

    const handleGetPlayList = async () => {
        const UserId = new FormData();
        UserId.append('user_id', user.id);

        await getPlayList(UserId).then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    dispatch(setUserPlayList(data))
                }
            }
        )
    }

    const handleShowForm = () => {
        setShowForm(!showForm);
    }

    let visibleForm = '';

    if (showForm) {
        visibleForm = 'show_form'
    }

    return (
        <Fragment>
            <div className="ms_top_artist">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ms_heading">
                                <h1>پلی لیست ها</h1>
                            </div>
                        </div>
                        {userPlayList.map(playList => (
                            <PlayListItem
                                key={playList.id}
                                playList={playList}
                            />
                        ))}


                        <div className="col-lg-2">
                            <div className="ms_rcnt_box marger_bottom25">
                                <div
                                    className="create_playlist"
                                    onClick={() => handleShowForm()}
                                >
                                    <i className="ms_icon icon_playlist"></i>
                                </div>
                                <form
                                    onSubmit={e => handleSubmit(e)}
                                    className={`add_play_list_form ${visibleForm}`}
                                >
                                    <div className="form-group input_playlist">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="listName"
                                            value={listName}
                                            onChange={e => {
                                                setListName(e.target.value);
                                                validator.current.showMessageFor('listName')
                                            }}
                                        />
                                    </div>
                                    <div className="form-group add_btn">
                                        <button type="submit" className="btn">
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>

                                    {validator.current.message('listName', listName, 'required')}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default PlayList;