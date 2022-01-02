import http from './httpServices';
import config from "./config.json";

export const getSingers = () => {
  return http.get(
    `${config.nic_music_api}/get/singers`);
};

export const getSingerMusics = singerId => {
  return http.post(
    `${config.nic_music_api}/singer/musics`, singerId);
};

export const getSingerInfo = singerId => {
  return http.post(
    `${config.nic_music_api}/singer/info`, singerId);
};

export const getSingerAlbums = singerId => {
  return http.post(
    `${config.nic_music_api}/singer/albums`, singerId);
};

export const getSingerAlbumMusics = albumId => {
  return http.post(
    `${config.nic_music_api}/singer/album/musics`, albumId);
};

export const addSinger = singerInfo => {
  return http.post(
    `${config.nic_music_api}/add/singer`, singerInfo);
};
export const editSinger = singerInfo => {
  return http.post(
    `${config.nic_music_api}/edit/singer`, singerInfo);
};
export const deleteSinger = singerId => {
  return http.post(
    `${config.nic_music_api}/delete/singer`, singerId);
};