import Toast from '@/modules/widget/toast'


/*路由跳转*/
export const Link = (url, query) => {
  const router = {
    path: url,
    query:{}
  }
 
  // /*获取平台，初始化时，添加参数*/
  // let app_plat = localStorage.getItem("app_plat");
  // if(app_plat && (app_plat.toLowerCase() == 'mac' || app_plat.toLowerCase() == 'windows')){
  //   var param = getRequestParam();
  //   if(param){
  //     router.query.token = param.token;
  //     router.query.comp_id = param.comp_id;
  //     router.query.plat = app_plat;
  //     router.query.build = param.build;
  //   }
  // }
  $router.push(router);
}


export const getUuid = (len) => {
  if(!len){
    len = 8;
  }
  const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  let chars = CHARS, uuid = [], i, radix = chars.length;
  for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
  return uuid.join('');
}





export const setCookie = (c_name,value,expiredays) =>
{
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}





export const getCookie = (c_name) =>
{
if (document.cookie.length>0)
  {
  var c_start=document.cookie.indexOf(c_name + "=");
  var c_end;
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return ""
}








/*时间戳转换为日期格式*/
export const timesToDate = (tm, pattern) => { //pattern示例：yyyy年MM月dd日 hh:mm:ss  yyyy-MM-dd hh:mm:ss
  if (tm == "" || tm == null || tm == undefined) {
    return '';
  }
  const date = new Date(parseInt(tm));
  if (pattern) {
    return datePattern(date, pattern);
  } else {
    return datePattern(date, 'yyyy-MM-dd HH:mm:ss');
  }
}

/*日期转换时间戳*/
export const dateToTimes = (date) => {
  date = date.substring(0, 19);
  date = date.replace(/-/g, '/');
  var timestamp = new Date(date).getTime();
  return timestamp;
}




export const datePattern = (date, fmt) => {
  const o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
    'H+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    'S': date.getMilliseconds() //毫秒
  };
  const week = {
    '0': '/u65e5',
    '1': '/u4e00',
    '2': '/u4e8c',
    '3': '/u4e09',
    '4': '/u56db',
    '5': '/u4e94',
    '6': '/u516d'
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[date.getDay() + '']);
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
}


export const httpAgent = function(url, requestType, param, successCb,erroCb){
  let config = {
    method: requestType,
    url: url,
  }
  if(requestType.toLowerCase() == 'get'){
    if(typeof(param) == 'string'){
      config.url = config.url + '?' +param;
    }else{
      config.params = param;
    }
  }else{
    config.data = param;
  }
  $axios(config)
  .then(function (resp) {
    const data = resp.data;
    if (data.result && data.result != 0) {
      if(data.result == 12){//token过期了
        //tokenIsOverdue();
        Link('/login');//跳转登录
      }else if(data.result == -10100){//强制升级客户端
        //mandatoryUpgrade();
      }else{
        if(erroCb){
          erroCb && erroCb(data);
        }else{
          Toast({
            content:data.msg || "报错了",
            type:"error"
          })
        }
      }
    }else{
      successCb && successCb(data);
    }
  })
  .catch(function (error,b,c) {
    console.log(error);
    if(erroCb){
      erroCb(error);
     }else{
      console.log("报错了");
     }
  });
}

export const addZero = (v) => {if (v < 10) return '0' + v;return v.toString();}


/*base64 start*/
var base64encodechars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64decodechars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

export const base64encode=(str) =>{
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64encodechars.charAt(c1 >> 2);
            out += base64encodechars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64encodechars.charAt(c1 >> 2);
            out += base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
            out += base64encodechars.charAt((c2 & 0xf) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64encodechars.charAt(c1 >> 2);
        out += base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
        out += base64encodechars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
        out += base64encodechars.charAt(c3 & 0x3f);
    }
    //console.log(out);
    return out;
};

export const base64decode=(str) =>{
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {

        do {
            c1 = base64decodechars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1) break;

        do {
            c2 = base64decodechars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1) break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61) return out;
            c3 = base64decodechars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1) break;
        out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2));

        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61) return out;
            c4 = base64decodechars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1) break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    //console.log(out);
    return out;
};

export const utf16to8=(str)=> {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007f)) {
            out += str.charAt(i);
        } else if (c > 0x07ff) {
            out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
        } else {
            out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
        }
    }
    return out;
};

export const utf8to16=(str)=>{
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                // 0xxxxxxx
                out += str.charAt(i - 1);
                break;
            case 12:
            case 13:
                // 110x xxxx   10xx xxxx
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0));
                break;
        }
    }
    return out;
};
/*base64 end*/


/*base64解码数据*/
export const decodeBase64 = (data) => {
    if(typeof data == 'string'){
        if(data != ''){
            var temp = utf8to16(base64decode(data)).replace(/\s/gi," ");
            return JSON.parse(temp);
        }else{
            return "";
        }
    }else{
        return data;
    }
}

/*base64编码*/
export const encodeBase64 = (data) => {
    if(data){
        return base64encode(utf16to8(data));
    }else{
        return '';
    }
}





export const filterFilesName = (str, ext) => {//处理附件名字
  var totalLen = ext.length + 11;
  var lastLen = ext.length + 3;
  if (str.length > totalLen) {
    var temp = str.substr(0, 5) + '...' + str.substr(str.length - lastLen, lastLen);
    return temp;
  } else {
    return str;
  }
}


export const filterFilesSize = (size) => {//处理附件名字
  var str = '';
  if (size < 1024) {
    str = size + 'B'
  } else if (size > 1024 && size < 1048576) {
    str = (size / 1024).toFixed(2) + 'K'
  } else if (size > 1048576 && size < 1048576 * 1024) {
    str = (size / 1048576).toFixed(2) + 'M'
  } else {
    str = (size / (1048576 * 1024)).toFixed(2) + 'G'
  }
  return str;
}





export const getCurrentMonthFirst = (cur_date) => {
 var date=new Date(cur_date);
 date.setDate(1);
 return date.getTime();
}



export const getCurrentMonthLast = (cur_date) =>{
 var date=new Date(cur_date);
 var currentMonth=date.getMonth();
 var nextMonth=++currentMonth;
 var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
 var oneDay=1000*60*60*24;
 return new Date(nextMonthFirstDay-oneDay).getTime();
}












