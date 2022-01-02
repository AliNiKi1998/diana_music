import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";

import { songReducer } from "./song";
import { songsReducer } from "./songs";
import { playListReducer } from "./playList";
import { userReducer } from "./user/user";
import { firstNameReducer } from "./user/firstName";
import { lastNameReducer } from "./user/lastName";
import { emailReducer } from "./user/email";
import { passwordReducer } from "./user/password"
import { confirmPasswordReducer } from "./user/confirmPassword";
import { avatarReducer } from "./user/avatar";
import { listMusicReducer } from './listMusic';
import { weeklyPopularMusicReducer } from "./weeklyPopularMusic";
import { singersReducer } from "./singers";
import { userPlayListReducer } from "./user/userPlayList";
import { usersReducer } from "./user/users";
import { albumsReducer } from "./albums";
import { addAlbumDialogReducer } from "./dialogs/addAlbumDialog";
import { editAlbumDialogReducer } from "./dialogs/editAlbumDialog";
import { albumReducer } from "./album";

export const reducers = combineReducers({
    song: songReducer,
    songs: songsReducer,
    singers: singersReducer,
    playList: playListReducer,
    albums: albumsReducer,
    album: albumReducer,
    user: userReducer,
    users: usersReducer,
    userPlayList : userPlayListReducer,
    firstName: firstNameReducer,
    lastName: lastNameReducer,
    email: emailReducer,
    password: passwordReducer,
    confirmPassword: confirmPasswordReducer,
    avatar: avatarReducer,
    loadingBar: loadingBarReducer,
    listMusic: listMusicReducer,
    weeklyPopularMusic: weeklyPopularMusicReducer,
    addAlbumDialog: addAlbumDialogReducer,
    editAlbumDialog: editAlbumDialogReducer,
});