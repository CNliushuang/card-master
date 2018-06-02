import axios from 'axios'
import User from '@/modules/user/api'


axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// axios.defaults.baseURL = 'http://localhost:8092/';
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
/**
 * 公共上行信息
 * @type {{}}
 */




global.getRequestParam = function() {
  let param = localStorage.getItem("requestParam") || JSON.stringify({plat:'web'});
  return JSON.parse(param);
}

global.$axios = axios.create({
  baseURL: '/',
  validateStatus: function(status) {
    return status < 400;
  },
  params: getRequestParam()
});




// $req.use(unauthorizedRedirect)
global.$API = {
  user: User,
};
