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
  login({identify,password}, successCb, erroCb){
    let url = `${config_server.server_api}/users/login.json`;
    let params = {
      loginName:identify,
      password
    }
    httpAgent(url,'POST', params,successCb,erroCb)
  },
  userMy( successCb, erroCb){
    let url = `${config_server.server_api}/users/my.json`;
    let params = {
    }
    httpAgent(url,'GET', params,successCb,erroCb)
  },
  getUserDetail({user_id}, successCb, erroCb){
    let url = `${config_server.server_api}/users/${user_id}.json`;
    let params = {
    }
    httpAgent(url,'GET', params,successCb,erroCb)
  },




}
