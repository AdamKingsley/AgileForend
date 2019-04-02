// pages/init_info/init_info.js
var app = getApp();
var util = require("../../utils/util.js");
var import_data = require("./data.js")
Page({
  data: import_data.data,
  //初始化数据
  init_data: function(userInfo) {
    console.log(userInfo);
    let userinfo = this.data.userinfo;
    let sex_list = this.data.sex_list;
    userinfo.avatar = userInfo.avatarUrl;
    userinfo.openid = wx.getStorageSync('openid');
    userinfo.sex = this.data.sex[userInfo.gender];
    userinfo.nickname = userInfo.nickName;
    //默认设置性别展示(由用户信息提供)
    sex_list.forEach((item, index) => {
      if (item.value == userInfo.gender) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    });
    this.setData({
      userinfo,
      sex_list
    });
    //默认省市区
    this.init_address();
    //默认手机号 貌似只能通过button来获取，需触发//TODO
    //this.init_tel();
  },
  //初始化获取微信手机号TODO
  init_tel: function() {},
  //生命周期函数--监听页面加载
  onLoad: function(options) {
    let that = this;
    if (app.globalData.userinfo) {
      // this.setData({
      //   userinfo: app.globalData.userInfo,
      //   avatar: app.globalData.userInfo.avatarUrl,
      // });
      that.init_data(app.globalData.userinfo);
    } else {
      wx.getUserInfo({
        success: res => {
          // console.log(res);
          that.init_data(res.userInfo);
        },
        fail: res => {
          util.showToast("获取微信用户信息失败！", "fail", 2000);
        }
      });
    }
  },
  //监听页面加载完毕
  onReady() {
    console.log(this.data);
  },
  //提交用户信息到后台，创建
  confirm: function(e) {
    console.log("点击确认按钮", e);
    console.log(this.data.userinfo);
    //先检验验证码是否正确
    if (this.data.vcode_check && (this.data.vcode == this.data.vcode_check)) {
      //继续提交，查看信息是否完整[校验比较轻并未进行深层的检查，比如手机号是否为11位等]
      let complete = true;
      Object.keys(this.data.userinfo).forEach(key => {
        console.log(key, ":", this.data.userinfo[key]);
        if (!this.data.userinfo[key]) {
          complete = false
          return;
        }
      });
      // if (!complete) {
      //   util.showToast("完善信息后提交！", "fail", 2000);
      //   return;
      // }
      //没有空的之后开始提交
      util.postData('/user/create', this.data.userinfo).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          wx.setStorageSync('userid', res.data.data);
          util.showToast("保存信息成功！","success",2000);
          wx.switchTab({
            url: '../index/index',
          });
        } else {
          util.showToast("初始化信息失败！", "fail", 2000);
        }
      }).catch(e => {
        util.showToast("请求失败，请重试！", "fail", 2000);
      });
    } else {
      util.showToast("验证码错误！", "fail", 2000);
    }
  },
  //发送验证码
  send_vcode: function(e) {
    let that = this;
    console.log("获取验证码", e);
    //验证手机号是否正确
    if (!util.checkPhone(this.data.userinfo.tel)) {
      util.showToast("手机号不正确！", "fail", 2000);
      return;
    }
    this.setData({
      // vcode_btn_disabled: true,
      vcode_btn_disabled: true ^ this.data.vcode_btn_disabled
    });
    //发送验证码后台请求
    util.getData('message/send?tel=' + this.data.userinfo.tel).then(res => {
      console.log(res);
      if (res.data.code == 200) {
        that.setData({
          vcode_check: res.data.data
        });
      } else {
        util.showToast("请求错误！", "fail", 2000);
      }
    }).catch(e => {
      util.showToast("获取验证码失败！", "fail", 2000);
    });
    //倒计时1min
    this.final_count(this.data.vcode_final_count);
  },
  //倒计时60s才能重发验证码
  final_count: function(finalcount) {
    let task = setInterval(() => {
      finalcount -= 1
      this.setData({
        vcode_btn_text: '等待' + finalcount + '秒'
      });
      if (finalcount == 0) {
        this.setData({
          vcode_btn_text: '获取验证码',
          vcode_btn_disabled: false
        });
        clearInterval(task);
      }
    }, 1000);
  },
  //用户更改自己的性别
  sex_change: function(e) {
    console.log("更改性别:", e.detail.value);
    this.change_user_data('sex', this.data.sex[e.detail.value]);
  },
  //用户更改自己的省市区
  area_change: function(e) {
    console.log("更改省市区", e.detail.value);
    //更改维护的this.data.area_list
    this.setData({
      area_value: e.detail.value
    });
    let value = e.detail.value;
    //更改用户的省市区信息
    this.change_user_data("province", this.data.province_list[value[0]].itemName);
    this.change_user_data("province_id", this.data.province_list[value[0]].id);
    this.change_user_data("city", this.data.city_list[value[1]].itemName);
    this.change_user_data("city_id", this.data.city_list[value[1]].id);
    this.change_user_data("area", this.data.area_list[value[2]].itemName);
    this.change_user_data("area_id", this.data.area_list[value[2]].id);
  },
  //用户滑动picker的column事件
  area_column_change: function(e) {
    console.log(e);
    //省份发生变化
    if (e.detail.column == 0) {
      let province_id = this.data.province_list[e.detail.value].id;
      this.province_change(province_id);
    }
    //城市发生变化
    if (e.detail.column == 1) {
      let city_id = this.data.city_list[e.detail.value].id;
      this.city_change(city_id);
    }
  },
  //头像选择
  chooseAvatar: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res);
        that.change_user_data('avatar', res.tempFilePaths[0]);
      }
    })
  },
  // previewImage: function(e) {
  //   wx.previewImage({
  //     current: e.currentTarget.id, // 当前显示图片的http链接
  //     urls: [this.data.userinfo.avatar] // 需要预览的图片http链接列表
  //   })
  // },
  //用于动态调整修改用户名的样式
  /* 文本框聚焦时更改状态*/
  focus: function(e) {
    this.setData({
      status: 1
    })
  },
  /* 文本框失焦时更改状态*/
  blur: function(e) {
    this.setData({
      status: 0
    })
  },
  //绑定输入的昵称
  bindNickname: function(e) {
    // console.log(e.detail.value);
    this.change_user_data('nickname', e.detail.value);
  },
  //绑定手机号
  bindTel: function(e) {
    this.change_user_data('tel', e.detail.value);
  },
  //绑定验证码
  bindVcode: function(e) {
    this.setData({
      vcode: e.detail.value,
    });
  },
  //绑定学校
  bindSchool: function(e) {
    console.log("绑定学校输入", e);
    this.change_user_data('school', e.detail.value);
  },
  //绑定住址
  bindAddress: function(e) {
    this.change_user_data('address', e.detail.value);
  },
  //统一处理的改变用户信息的对应的数据
  change_user_data: function(name, value) {
    let userinfo = this.data.userinfo;
    userinfo[name] = value;
    this.setData({
      userinfo
    });
  },
  init_address: function() {
    //初始化省市区picker
    let that = this;
    util.getData('address/provinces').then(response1 => {
      //获取省份
      console.log('response', response1)
      if (response1.data.code == '200') {
        that.setData({
          province_list: response1.data.data,
        });
        let province_id = this.data.province_list[0].id;
        //默认用户省份
        that.change_user_data('province', this.data.province_list[0].itemName);
        that.change_user_data('province_id', this.data.province_list[0].id);
        util.getData("address/cities?province_id=" + province_id).then(response2 => {
          //获取城市
          console.log('response', response2)
          if (response2.data.code == '200') {
            that.setData({
              city_list: response2.data.data,
            });
            let city_id = this.data.city_list[0].id;
            //默认用户城市
            that.change_user_data('city', this.data.city_list[0].itemName);
            that.change_user_data('city_id', this.data.city_list[0].id);
            util.getData("address/areas?city_id=" + city_id).then(response3 => {
              //获取县区
              console.log('response', response3)
              if (response3.data.code == '200') {
                that.setData({
                  area_list: response3.data.data,
                });
                //默认用户县区
                that.change_user_data('area', this.data.area_list[0].itemName);
                that.change_user_data('area_id', this.data.area_list[0].id);
              } else {
                util.showToast("系统内部异常！", "fail", 2000);
              }
            });
          } else {
            util.showToast("系统内部异常！", "fail", 2000);
          }
        });
      } else {
        util.showToast("系统内部异常！", "fail", 2000);
      }
    }).catch(e => {
      console.log(e);
      util.showToast("网络请求失败！", "fail", 2000);
    });
  },
  province_change: function(province_id) {
    let that = this;
    util.getData("address/cities?province_id=" + province_id).then(response2 => {
      //获取城市
      console.log('response', response2)
      if (response2.data.code == '200') {
        that.setData({
          city_list: response2.data.data,
        });
        let city_id = this.data.city_list[0].id;
        //默认用户城市
        // that.change_user_data('city', this.data.city_list[0].itemName);
        // that.change_user_data('city_id', this.data.city_list[0].id);
        util.getData("address/areas?city_id=" + city_id).then(response3 => {
          //获取县区
          console.log('response', response3)
          if (response3.data.code == '200') {
            that.setData({
              area_list: response3.data.data,
            });
            //默认用户县区
            // that.change_user_data('area', this.data.area_list[0].itemName);
            // that.change_user_data('area_id', this.data.area_list[0].id);
          } else {
            util.showToast("系统内部异常！", "fail", 2000);
          }
        });
      } else {
        util.showToast("系统内部异常！", "fail", 2000);
      }
    }).catch(e => {
      console.log(e);
      util.showToast("网络请求失败！", "fail", 2000);
    });
  },
  city_change: function(city_id) {
    let that = this;
    util.getData("address/areas?city_id=" + city_id).then(response3 => {
      //获取县区
      console.log('response', response3)
      if (response3.data.code == '200') {
        that.setData({
          area_list: response3.data.data,
        });
        //默认用户县区
        // that.change_user_data('area', this.data.area_list[0].itemName);
        // that.change_user_data('area_id', this.data.area_list[0].id);
      } else {
        util.showToast("系统内部异常！", "fail", 2000);
      }
    }).catch(e => {
      console.log(e);
      util.showToast("网络请求失败！", "fail", 2000);
    });
  },
})