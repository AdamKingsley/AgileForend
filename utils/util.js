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

function showToast(title, icon, duration = 2000) {
  let data = {
    title: title,
    icon: icon,
    duration: 2000
  };
  if (icon == "fail") {
    data.image = '../../images/fail.png'
  }
  wx.showToast(data);
}

function checkPhone(phone) {
  // var phone = document.getElementById('phone').value;
  if (!(/^1[34578]\d{9}$/.test(phone))) {
    // alert("手机号码有误，请重填");
    return false;
  }
  return true;
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
module.exports.getOwnerId = getOwnerId;
module.exports.showToast = showToast;
module.exports.checkPhone = checkPhone;