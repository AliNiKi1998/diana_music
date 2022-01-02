import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import DianaMusic from './DianaMusic';

import { isEmpty } from 'lodash';

//action
import { setPlayList } from '../state_manager/actions/playList';

//services
import { getLastMusic, getMusics, getPlayList } from '../services/musicServises';
import { setUserPlayList } from '../state_manager/actions/user/userPlayList';
import { getSingers } from '../services/singerServices';
import { setSingers } from '../state_manager/actions/singers';
import { fillMusics } from '../state_manager/actions/songs';



const App = () => {

    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    (async () => {
        const { data } = await getLastMusic();
        dispatch(setPlayList(data));
    }
    )();

    (async () => {
        const UserId = new FormData();
        UserId.append('user_id', user.id);

        if (!isEmpty(user)) {
            await getPlayList(UserId).then(
                resolved => {
                    const { status, data } = resolved;
                    if (status === 200) {
                        dispatch(setUserPlayList(data))
                    }
                }
            )
        }
    })();

    (async () => {
        if (!isEmpty(user)) {
            await getSingers().then(
                resolved => {
                    const { status, data } = resolved;
                    if (status === 200) {
                        dispatch(setSingers(data))
                    }
                }
            )
        }
    })();
    
    (async () => {
        if (!isEmpty(user)) {
            await getMusics().then(
                resolved => {
                    const { status, data } = resolved;
                    if (status === 200) {
                        dispatch(fillMusics(data))
                    }
                }
            )
        }
    })();

    return (
        <BrowserRouter>
            <LoadingBar
                className="loading_bar"
                maxProgress={100}
            />
            <DianaMusic />
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;