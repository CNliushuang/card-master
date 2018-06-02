import config_server from '@/config/config'
const api = config_server.server_api;

import { httpAgent } from '@/config/utils';


export const changePassword = ({password,oldPassword},successCb,erroCb) => {
    const url = api + '/users/password.json';
    let param = {
        oldPassword:oldPassword,
        password:password,
    }
    httpAgent(url, 'POST', param, successCb,erroCb);
}



