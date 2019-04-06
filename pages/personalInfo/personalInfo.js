// pages/personalInfo/personalInfo.js
var util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      id: '0',
      openid: '0',
      sex: 'MALE',
      nickname: '',
      avatar: '',
      tel: '',
      province: '',
      city: '',
      area: '',
      province_id: '',
      city_id: '',
      area_id: '',
      address: '', 
      comment: '这个人很懒，什么都没有留下。',
      school: ''
    },
    userCommentForm: {
      id: 0,
      comment: null,
    },
    curWord: 0,
    comment: '',
    maxWord: 50,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log('index onload');
    console.log(app.globalData);

    this.setData({
      userId: wx.getStorageSync('userid'),
      userInfo: app.globalData.user ? app.globalData.user.userInfo : this.data.userInfo,
    });

    this.getUser();
  },

  modify: function (e) {
    let that = this;
    var userCommentFormUserId = 'userCommentForm.id';
    var userCommentFormComment = 'userCommentForm.comment';
    that.setData({
      [userCommentFormComment]: this.data.comment,
      [userCommentFormUserId]: wx.getStorageSync("userid")
    })
    util.postData('user/comment/update/', this.data.userCommentForm).then(res => {
      console.log(res);
      if (res.data.code == 200) {
        util.showToast("修改成功！", "success", 2000);
      } else {
        util.showToast("修改失败！", "fail", 2000);
      }
    }).catch(e => {
      util.showToast("请求失败，请重试！", "fail", 2000);
    });
  },

  getUser: function () {
    let that = this
    let url = "user/" + this.data.userId

    var user = util.getData(url).then(function (res) {
      that.setData({
        userInfo: res.data.data
      });
    }).catch(function (e) { return Promise.reject(e); });
  },

  bindTextAreaBlur: function (e) {
    this.setData({
      comment: e.detail.value
    })
  },

  limit: function (e) {
    var value = e.detail.value;
    var length = parseInt(value.length);
    if (length > this.data.maxWord) {
      return;
    }
    this.setData({
      curWord: length,
      comment: e.detail.value
    });
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUser()
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