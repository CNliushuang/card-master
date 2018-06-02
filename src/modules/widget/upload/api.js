import config_server from '@/config/config'
const api = config_server.server_api;
const proxy = config_server.server_user;

import { httpAgent } from '@/config/utils.js';
/*
 *获获取 uptoken
 *@param 
 *@param 
 *@param 
 *
 */
export const filesQiniuUploadTicket = ({ reqType, name, expand, size, resId, folderId, projectId }, cb, errorcb) => {
  const param = {
    req_type: reqType,
    name: name,
    expand: expand,
    size: size
  }
  if(!!resId){
    param.res_id = resId;
  }
  if(!!folderId){
    param.folder_id = folderId;
  }
  if(!!projectId){
    param.project_id = projectId;
  }
  httpAgent(`${api}/files/storage/ticket.json`, 'GET', param, cb, errorcb);
}
