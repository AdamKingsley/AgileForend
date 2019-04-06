// pages/mynotice/mynotice.js
var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    //page: 1,
    //userid: 39,
    mynotification: [{
      id: 0,
      club: '南大社团',
      senderid: 144,
      userid: 39,
      state: 0,
      time: '2019-04-06 19:00:00',
      tourid: 0,
      type: club,
    }, {
        id: 1,
        club: '东南社团',
        senderid: 144,
        userid: 39,
        state: 0,
        time: '2019-04-06 19:00:00',
        tourid: 104,
        type: tour,
      }],
    // club:[{
    //   id: 0,
    //   name: '南园一舍',
    // }],
    // tour: [{
    //   id: 0,
    //   name: null,
    // }]
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    console.log("this is onLoad!");
  },

  onShow: function (options) {
    this.onLoad(options);
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      select_text: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      select_text: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      select_text: e.detail.value
    });
  },
})