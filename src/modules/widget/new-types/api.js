import config_server from '@/config/config'
const api = config_server.server_api;

import { httpAgent } from '@/config/utils';


export const createProductType = ({productType},successCb,erroCb) => {
    const url = api + '/product/type.json';
    let param = {
        name:productType.name,
        parentId:productType.parentId,
        content:productType.content,
        brandId:productType.brandId,
    	cover:productType.cover
    }

    httpAgent(url, 'POST', param, successCb,erroCb);

}

export const modifyProductType = ({productType},successCb,erroCb) => {
    const url = api + '/product/type/'+productType.uuid+'.json';
    let param = {
        name:productType.name,
        parentId:productType.parentId,
        content:productType.content,
        brandId:productType.brandId,
        cover:productType.cover,
        status:productType.status
    }
    httpAgent(url, 'PUT', param, successCb,erroCb);
}



