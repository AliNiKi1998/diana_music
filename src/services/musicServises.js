import http from './httpServices';
import config from "./config.json";

export const registerUser = user => {
  return http.post(
    `${config.nic_music_api}/register`, user);
};

export const loginUser = user => {
  return http.post(
    `${config.nic_music_api}/login`, user , );
};

export const renewToken = user => {
  return http.post(
    `${config.nic_music_api}/renew-token`, user);
};

//music
export const getLastMusic = () => {
  return http.get(
    `${config.nic_music_api}/last/music`);
};

export const searchMusic = search => {
  return http.post(
    `${config.nic_music_api}/search/music`,search);
};

export const getWeeklyPublishMusic = () => {
  return http.get(
    `${config.nic_music_api}/weekly/music/publish`);
};

export const plusPlayedMusic = id => {
  return http.post(
    `${config.nic_music_api}/plus/played` , id);
};

export const getWeeklyPopularMusic = () => {
  return http.get(
    `${config.nic_music_api}/weekly/popular/music`);
};

export const getMonthPopularMusic = () => {
  return http.get(
    `${config.nic_music_api}/month/music/popular`);
};

export const  getMusics = () => {
  return http.get(
    `${config.nic_music_api}/musics`);
};

export const  addMusic = musicInfo => {
  return http.post(
    `${config.nic_music_api}/add/music` , musicInfo);
};

export const  editMusic = musicInfo => {
  return http.post(
    `${config.nic_music_api}/edit/music` , musicInfo);
};

export const  deleteMusic = musicId => {
  return http.post(
    `${config.nic_music_api}/delete/music` , musicId);
};

export const  getAlbumOfSinger = singerId => {
  return http.post(
    `${config.nic_music_api}/album-of-singer` , singerId);
};


//play list
export const addPlayList = playList => {
  return http.post(
    `${config.nic_music_api}/add-play-list`, playList);
};

export const addToPlayList = info => {
  return http.post(
    `${config.nic_music_api}/add-to-play-list`, info);
};

export const getPlayList = userId => {
  return http.post(
    `${config.nic_music_api}/get-play-list`, userId);
};

export const getPlayListMusic = playListId => {
  return http.post(
    `${config.nic_music_api}/get-play-list-music`, playListId);
};

export const getMusicOfPlayList = playListId => {
  return http.post(
    `${config.nic_music_api}/get-music-of-play-list`, playListId);
};

export const getPlayListInfo = playListId => {
  return http.post(
    `${config.nic_music_api}/get-play-list-info`, playListId);
};

export const deleteItemPlayList = playListMusic => {
  return http.post(
    `${config.nic_music_api}/delete-item-play-list`, playListMusic);
};

export const deletePlayList = playListId => {
  return http.post(
    `${config.nic_music_api}/delete-play-list`, playListId);
};


//album
export const addAlbum = albumInfo => {
  return http.post(
    `${config.nic_music_api}/add/album`, albumInfo);
};
export const editAlbum = albumInfo => {
  return http.post(
    `${config.nic_music_api}/edit/album`, albumInfo);
};

export const getAlbumInfo = albumId => {
  return http.post(
    `${config.nic_music_api}/album/info`, albumId);
};

export const getAlbums = () => {
  return http.get(
    `${config.nic_music_api}/albums`);
};

export const deleteAlbum = albumId => {
  return http.post(
    `${config.nic_music_api}/delete/album`, albumId);
};