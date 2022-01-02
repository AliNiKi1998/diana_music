import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';


import MainLayoout from '../components/layout/MainLayout';
import Register from '../components/register/Register';
import Login from '../components/login/Login';
import Logout from '../components/login/Logout';
import PlayList from '../components/content/playList/PlayList';
import Index from './../components/content/Index';
import PlayListMusic from '../components/content/playList/PlayListMusic';
import { useDispatch } from 'react-redux';
import { setUser } from '../state_manager/actions/user/user';
import { decodeToken } from '../utils/decodeToken';
import Singer from '../components/singer/Singer';
import SingerAlbumMusics from '../components/singer/SingerAlbumMusics';
import StyleMusics from '../components/content/style/StyleMusics';
import Profile from '../components/profile/Profile';
import Users from '../components/admin/user/Users';
import Albums from '../components/admin/album/ALbums';
import NewAlbum from '../components/admin/album/NewAlbum';
import EditAlbum from '../components/admin/album/EditAlbum';
import Singers from '../components/admin/singer/Singers';
import NewSinger from '../components/admin/singer/NewSinger';
import EditSinger from '../components/admin/singer/EditSinger';
import Musics from '../components/admin/musics/Musics';
import NewMusic from '../components/admin/musics/NewMusic';
import EditMusic from '../components/admin/musics/EditMusic';


const DianaMusic = () => {
    const dispatch = useDispatch();
    const userCheck = useSelector(state => state.user);


    const checkUser = () => {
        const userToken = localStorage.getItem('user_token');

        if (!isEmpty(userToken) && isEmpty(userCheck)) {
            dispatch(setUser(decodeToken(userToken).payload.user));
        }
    }
    checkUser();


    const user = useSelector(state => state.user);

    return (
        <MainLayoout>
            <Switch>
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/logout" exact render={() => isEmpty(user) ? <Redirect to="/" /> : <Logout />} />

                <Route path="/profile" exact render={() => isEmpty(user) ? <Redirect to="/" /> : <Profile />} />

                <Route path="/play-lists" exact render={() => isEmpty(user) ? <Redirect to="/" /> : <PlayList />} />


                <Route path="/play-list/:id" exact render={() => isEmpty(user) ? <Redirect to="/" /> : <PlayListMusic />} />

                <Route path="/singer/:id" exact component={Singer} />

                <Route path="/style/musics/:id" exact component={StyleMusics} />

                <Route path="/singer/album/musics/:id" exact component={SingerAlbumMusics} />
                {/* admin */}
                <Route path="/admin/users" exact render={() => user.is_admin === false ? <Redirect to="/" /> : <Users />} />

                <Route path="/admin/albums" exact render={() => user.is_admin === false ? <Redirect to="/" /> : <Albums />} />

                <Route path="/admin/new-album" exact render={() => user.is_admin === false ? <Redirect to="/" /> : <NewAlbum />} />

                <Route path="/admin/edit-album/:id" exact render={() => user.is_admin === false ? <Redirect to="/" /> : <EditAlbum />} />


                <Route path="/admin/singers" exact render={() => user.is_admin === false ? <Redirect to="/" /> : <Singers />} />

                <Route path="/admin/new-singer" exact render={() => user.is_admin === false ? <Redirect to="/" /> : <NewSinger />} />

                <Route path="/admin/edit-singer/:id" exact render={() => user.is_admin === false ? <Redirect to="/" /> : <EditSinger />} />

                <Route path="/admin/songs" exact render={() => user.is_admin === false ? <Redirect to="/" /> : <Musics />} />

                <Route path="/admin/new-music" exact render={() => user.is_admin === false ? <Redirect to="/" /> : <NewMusic />} />

                <Route path="/admin/edit-music/:id" exact render={() => user.is_admin === false ? <Redirect to="/" /> : <EditMusic />} />

                <Route path="/" exact component={Index} />
            </Switch>
        </MainLayoout>
    );
}

export default DianaMusic;