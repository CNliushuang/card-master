import config_server from '@/config/config'
const api = config_server.server_api;

import { httpAgent } from '@/config/utils';
import qs from 'qs'

export function uploadImg(base64,successCb,erroCb){
    const url = api + '/file/base64.json';
    let param = {base64};
    httpAgent(url, 'POST', qs.stringify(param), successCb,erroCb);
}

