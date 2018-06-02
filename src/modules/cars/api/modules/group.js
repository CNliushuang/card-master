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
  getGroupList({orgId,parentId,filter,status,searchKey,start,limit}, successCb, erroCb){
    let url = `${config_server.server_api}/org.json`;
    let params = {
      orgId,
      orgType:"UNION",
      start,
      limit,
    }
    if(status){
      params.status = status;
    }
    if(searchKey){
      params.searchKey = searchKey;
    }
    if(parentId){
      params.parentId = parentId;
    }

    if(filter){
      if(filter.name){
        params.searchKey = filter.name
      }
      if(filter.status || filter.status == 0){
        params.status = filter.status
      }
      if(filter.id){
        params.id = filter.id
      }
      if(filter.orgId){
        params.orgId = filter.orgId
      }
      if(filter.adminName){
        params.adminName = filter.adminName
      }


      
    }

    httpAgent(url,'GET', params,successCb,erroCb)
  },
  deleteGroup({uuid},successCb, erroCb){
    let url = `${config_server.server_api}/org/${uuid}.json`;
    let params = {
    }
    httpAgent(url,'DELETE', params,successCb,erroCb)
  },

  
}
