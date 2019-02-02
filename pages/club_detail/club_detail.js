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
    }, ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('index onload');
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
  }
})