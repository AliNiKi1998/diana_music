import http from './httpServices';
import config from "./config.json";

export const getUsers = () => {
  return http.get(
    `${config.nic_music_api}/users`);
};

export const deleteUser = (userId) => {
  return http.post(
    `${config.nic_music_api}/delete/user`,userId);
};
