import config_server from '@/config/config'
const api = config_server.server_api;

import { httpAgent } from '@/config/utils';


export const newProduct = ({name,typeId,content,summary,cover},successCb,erroCb) => {
    const url = api + '/products.json';
    let param = {
    	name,
        typeId,
        content,
    	summary,
        cover
    }
    httpAgent(url, 'POST', param, successCb,erroCb);

}

export const modifyProduct = ({uuid,name,typeId,content,summary,cover},successCb,erroCb) => {
    const url = api + '/products/'+uuid+'.json';
    let param = {
        name,
        typeId,
        content,
        summary,
        cover
    }

    httpAgent(url, 'PUT', param, successCb,erroCb);
}



