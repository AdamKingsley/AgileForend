// pages/createClub/createClub.js
var app = getApp();
var util = require("../../utils/util.js");
var import_data = require("./data.js")
Page({
  data: import_data.data,
  //初始化数据
  init_data: function (clubInfo) {
    console.log(clubInfo);
    let clubinfo = this.data.clubinfo;
    clubinfo.ownerid = wx.getStorageSync('userid');
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (app.globalData.clubinfo) {
      that.init_data(app.globalData.clubinfo);
    } else {
      // wx.getClubInfo({
      //   success: res => {
      //     // console.log(res);
      //     that.init_data(res.clubInfo);
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
    console.log(this.data.clubinfo);
    let complete = true;
    Object.keys(this.data.clubinfo).forEach(key => {
      console.log(key, ":", this.data.clubinfo[key]);
      if (!this.data.clubinfo[key]) {
        complete = false
        return;
      }
    });
    if (!complete) {
      util.showToast("完善信息后提交！", "fail", 2000);
      return;
    }
    //没有空的之后开始提交
    util.postData('/club/create', this.data.clubinfo).then(res => {
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
      this.change_club_data('name', e.detail.value);
  },

  bindDes: function (e) {
    this.change_club_data('des', e.detail.value);
  },

  bindLimit: function (e) {
    this.change_club_data('limit', e.detail.value);
  },

  //统一处理的改变社团信息的对应的数据
  change_club_data: function (name, value) {
    let clubinfo = this.data.clubinfo;
    clubinfo[name] = value;
    this.setData({
      clubinfo
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