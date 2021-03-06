var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    inputShowed: false,
    select_text: "",
    province: '江苏省',
    provinceId: 2,
    city: '南京',
    cityId: 1,
    clubs: [{
      id: 1,
      pic: '../../images/club.jpg',
      name: "南大社团",
      description: "南京大学",
      // score: 4.7,
      // state: "未开始",
      nums: 5,
      limit: 100,
      // startTime: "2019-01-22:19:00",
      // endTime: "2019-01-22:22:00",
      joinOrNot: false,
      publicOrNot: true,
    }, {
      id: 2,
      pic: '../../images/club.jpg',
      name: "东大社团",
      description: "东南大学",
      // score: 3.0,
      // state: "未开始",
      nums: 5,
      limit: 100,
      // startTime: "2019-01-22:19:00",
      // endTime: "2019-01-22:22:00",
      joinOrNot: false,
      publicOrNot: true,
    }, {
      id: 3,
      pic: '../../images/club.jpg',
      name: "南航社团",
      description: "南京航空航天大学",
      // score: 5.0,
      // state: "进行中",
      nums: 5,
      limit: 100,
      // startTime: "2019-01-12:19:00",
      // endTime: "2019-01-22:22:00",
      joinOrNot: false,
      publicOrNot: true,
    }, {
      id: 4,
      pic: '../../images/club.jpg',
      name: "南理工社团",
      description: "南京理工大学",
      // score: 4.7,
      // state: "进行中",
      nums: 5,
      limit: 100,
      // startTime: "2019-01-22:19:00",
      // endTime: "2019-01-22:22:00",
      joinOrNot: false,
      publicOrNot: true,
    }, {
      id: 5,
      pic: '../../images/club.jpg',
      name: "河海社团",
      description: "河海大学",
      // score: 4.7,
      //state: "进行中",
      nums: 5,
      limit: 100,
      // startTime: "2019-01-22:19:00",
      // endTime: "2019-01-22:22:00",
      joinOrNot: false,
      publicOrNot: true,
    }, {
      id: 6,
      pic: '../../images/club.jpg',
      name: "南财社团",
      description: "南京财经大学",
      // score: 4.7,
      //state: "进行中",
      nums: 5,
      limit: 100,
      // startTime: "2019-01-22:19:00",
      // endTime: "2019-01-22:22:00",
      joinOrNot: false,
      publicOrNot: true,
    }, {
      id: 7,
      pic: '../../images/club.jpg',
      name: "南邮社团",
      description: "南京邮电大学",
      // score: 4.7,
      //state: "已结束",
      nums: 5,
      limit: 100,
      // startTime: "2019-01-22:19:00",
      // endTime: "2019-01-22:22:00",
      joinOrNot: false,
      publicOrNot: true,
    }, {
      id: 8,
      pic: '../../images/club.jpg',
      name: "南林社团",
      description: "南京林业大学",
      // score: 4.7,
      //state: "已结束",
      nums: 19,
      limit: 100,
      // startTime: "2019-01-22:19:00",
      // endTime: "2019-01-22:22:00",
      joinOrNot: false,
      clubId: 11000,
      clubName: "社团A",
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('club onload');
    console.log(app.globalData)
    this.setData({
      city: app.globalData.city ? app.globalData.city.itemName : this.data.city,
      cityId: app.globalData.city ? app.globalData.city.id : this.data.cityId,
      province: app.globalData.province ? app.globalData.province.itemName : this.data.province,
      provinceId: app.globalData.province ? app.globalData.province.id : this.data.provinceId,
    });
  },
  onShow: function (options) {
    this.onLoad(options);
  },
  selectCity: function () {
    wx.navigateTo({
      url: '../city_selector/city_selector?cityId=' + this.data.cityId + '&city=' + this.data.city + '&province=' + this.data.province + '&provinceId=' + this.data.provinceId,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
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
  goToCreateClub:function(parm){
    console.log('a');
    wx.navigateTo({
      url: '/pages/createClub/createClub',
    })
  }
})