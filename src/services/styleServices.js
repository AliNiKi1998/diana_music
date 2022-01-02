import http from './httpServices';
import config from "./config.json";

export const getStyles = () => {
  return http.get(
    `${config.nic_music_api}/styles`);
};

export const getStyleInfo = styleId => {
  return http.post(
    `${config.nic_music_api}/style/info`,styleId);
};

export const getStyleMusics = styleId => {
  return http.post(
    `${config.nic_music_api}/style/musics`,styleId);
};