import { httpAgent } from '@/config/utils'
import qs from 'qs'

export default {
  getBrandList({}, successCb, erroCb){
    let url = `${config_server.server_api}/product/brand.json`;
    let params = {
    }

    httpAgent(url,'GET', params,successCb,erroCb)
  },
  getProductTypes({brandId,status,parentId}, successCb, erroCb){
    let url = `${config_server.server_api}/product/type.json`;
    let params = {
      brandId,
      parentId
    }

    httpAgent(url,'GET', params,successCb,erroCb)
  },
  getProductList({typeId,start,limit}, successCb, erroCb){
    let url = `${config_server.server_api}/products.json`;
    let params = {
      typeId,
      start,
      limit
    }
    httpAgent(url,'GET', params,successCb,erroCb)
  },

  modifyProduct({product},successCb,erroCb){
    const url = `${config_server.server_api}/products/${product.uuid}.json`;
    let param = {
    }
    if(product.status || product.status == 0){
      param.status = product.status
    }

    httpAgent(url, 'PUT', param, successCb,erroCb);
  },

  deleteProduct({product_id},successCb,erroCb){
    const url = `${config_server.server_api}/products/${product_id}.json`;
    let param = {
    }
    httpAgent(url, 'DELETE', param, successCb,erroCb);
  },
  deleteProductType({productType},successCb,erroCb){
    const url = `${config_server.server_api}/product/type/${productType.uuid}.json`;
    let param = {
    }
    httpAgent(url, 'DELETE', param, successCb,erroCb);
  },




  
}
