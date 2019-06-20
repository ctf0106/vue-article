import axios from 'axios';
import queryString from 'query-string';
import router from '../router'
var baseUrl = '/api';
if (process.env.NODE_ENV === 'production') {
  baseUrl = '';
}

axios.interceptors.request.use(
  function (config) {
    let token=sessionStorage.getItem('token');
    if (token=="undefined" || token=="" || token==null) {
      router.replace({
        name: 'login'
        // query: {redirect: router.currentRoute.fullPath}
      })
    } 
    console.log(config)
    return config;
  }, function (error) {
    return Promise.reject(error);
})
axios.interceptors.response.use(function (response) {
    let data = response.data.data;
    if (data.code !=200) {
      router.replace({
        name: 'login'
      })
    }
    return response;
  }, function (err) {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break;
        case 401:
          err.message = '未授权，请登录'
          break;
        case 403:
          err.message = '拒绝访问'
          break;
        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break;
        case 408:
          err.message = '请求超时'
          break;
        case 500:
          err.message = '服务器内部错误'
          break;
        case 501:
          err.message = '服务未实现'
          break;
        case 502:
          err.message = '网关错误'
          break;
        case 503:
          err.message = '服务不可用'
          break;
        case 504:
          err.message = '网关超时'
          break;
        case 505:
          err.message = 'HTTP版本不受支持'
          break;
      }
    }
    return Promise.reject(err);
  });


function getHeaders(type) {
  switch (type) {
    case 'json':
      return {
        'Content-Type': 'application/json'
      };
    case 'upload':
      return {
        'Content-Type': 'multiple/form-data'
      };
    default:
      return {
        'Content-Type': 'application/x-www-form-urlencoded'
      };
  }
}
export const fetch = (method, type, url, data) => {
  let obj = {
    url: baseUrl + url,
    method: method || 'post',
    headers: getHeaders(type),
  };
  if (type === 'json') {
    obj.data = JSON.stringify(data);
  } else if (type === 'upload') {
    obj.data = data;
  } else {
    obj.data = queryString.stringify(data);
  }
  return axios.request(obj);
};
export const exportExcel = (url, data, _callback) => {
  axios.post(baseUrl + url, queryString.stringify(data), { responseType: 'arraybuffer' }).then((res) => {
    let fileName = decodeURI(res.headers['filename']);
    var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8' }); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
    var downloadElement = document.createElement('a');
    var href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = fileName; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
    return _callback()
  });

};

