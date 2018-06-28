import { httpAgent } from '@/config/utils'
import qs from 'qs'

export default {
  /**
   * 登录接口
   * @param identify
   * @param password
   * @param successCb
   * @param erroCb
   */
  getAccountList({start,limit}, successCb, erroCb){
    let url = `${config_server.server_api}/users.json`;
    let params = {
      start,
      limit,
    }

    httpAgent(url,'GET', params,successCb,erroCb)
  },
  modifyAccount({account}, successCb, erroCb){
    let url = `${config_server.server_api}/users/${account.uuid}.json`;
    let params = {
    }
    if(account.status){
      params.status = account.status;
    }

    httpAgent(url,'PUT', params,successCb,erroCb)
  },
  getAccountList({start,limit}, successCb, erroCb){
    let url = `${config_server.server_api}/users.json`;
    let params = {
      start,
      limit,
    }

    httpAgent(url,'GET', params,successCb,erroCb)
  },
  deleteAccount({account_id},successCb,erroCb){
    const url = `${config_server.server_api}/users/${account_id}.json`;
    let param = {
    }
    httpAgent(url, 'DELETE', param, successCb,erroCb);
  },


  
}
