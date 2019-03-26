// pages/createClub/createClub.js
var app = getApp();
var util = require("../../utils/util.js");
var import_data = require("./data.js")
Page({
  data: import_data.data,
  //初始化数据
  init_data: function (tourinfo) {
    console.log(tourinfo);
    let tourInfo = this.data.tourinfo;
    tourInfo.ownerId = wx.getStorageSync('userid');
    tourInfo.sightId = wx.getStorageSync('sightId');
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (app.globalData.tourInfo) {
      that.init_data(app.globalData.tourInfo);
    } else {
      // wx.getTourInfo({
      //   success: res => {
      //     // console.log(res);
      //     that.init_data(res.tourInfo);
      //   },
      //   fail: res => {
      //     util.showToast("创建社团失败！", "fail", 2000);
      //   }
      // });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data);
  },

  //提交社团信息到后台，创建
  confirm: function (e) {
    console.log("点击确认按钮", e);
    console.log(this.data.tourInfo);
    let complete = true;
    Object.keys(this.data.tourInfo).forEach(key => {
      console.log(key, ":", this.data.tourInfo[key]);
      if (!this.data.tourInfo[key]) {
        complete = false
        return;
      }
    });
    // if (!complete) {
    //   util.showToast("完善信息后提交！", "fail", 2000);
    //   return;
    // }
    //没有空的之后开始提交
    util.postData('tour/create', this.data.tourInfo).then(res => {
      console.log(res);
      if (res.data.code == 200) {
        // wx.setStorageSync('userid', res.data.data);
        util.showToast("保存信息成功！", "success", 2000);
        // wx.switchTab({
        //   url: '../index/index',
        // });
      } else {
        util.showToast("初始化信息失败！", "fail", 2000);
      }
    }).catch(e => {
      util.showToast("请求失败，请重试！", "fail", 2000);
    });
  },

  //绑定社团名称
  bindName: function (e) {
    this.change_tour_data('name', e.detail.value);
  },

  bindDes: function (e) {
    this.change_tour_data('des', e.detail.value);
  },

  bindLimit: function (e) {
    this.change_tour_data('limit', e.detail.value);
  },
  
  bindStartTime: function (e) {
    this.change_tour_data('startTime', e.detail.value);
  },

  bindEndTime: function(e) {
    this.change_tour_data('endTime', e.detail.value)
  },

  bindClub: function(e) {
    this.change_tour_data('clubId', e.detail.value)
  },
  bindStartChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      start: e.detail.value
    })
    this.change_tour_data("startTime", e.detail.value)
  },
  bindEndChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      end: e.detail.value
    })
    this.change_tour_data("endTime", e.detail.value)
  },

  

  //统一处理的改变社团信息的对应的数据
  change_tour_data: function (name, value) {
    let tourInfo = this.data.tourInfo;
    tourInfo[name] = value;
    this.setData({
      tourInfo
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}) 