var app = getApp()
var version = app.globalData.version
var url_prefix = "http://" + app.globalData[version + 'Ip'] + ":" + app.globalData[version + 'Port']
//get请求
function getData(url) {
  console.log(url_prefix)
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url_prefix + "/" + url,
      header: {
        //'Content-Type': 'application/json'
      },
      success: function(res) {
        resolve(res)
      },
      fail: function(res) {
        reject(res)
      }
    })
  })
}

//post请求
function postData(url, data) {
  console.log(url_prefix)
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url_prefix + "/" + url,
      method: "POST",
      data: data,
      header: {
        //'Content-Type': 'application/json'
      },
      success: function(res) {
        resolve(res)
      },
      fail: function(res) {
        reject(res)
      }
    })
  })
}

//获取当前登录用户的ownerid
const getOwnerId = () => {
  return new Promise(function(resolve, reject) {
    wx.getStorage({
      key: 'ownerid',
      success: res => {
        resolve(res.data)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}
//获取当前登录用户的ownerid
const getOpenId = () => {
  return new Promise(function(resolve, reject) {
    wx.getStorage({
      key: 'openid',
      success: res => {
        resolve(res.data)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}
module.exports.getData = getData;
module.exports.postData = postData;
module.exports.getOwnerId = getOwnerId