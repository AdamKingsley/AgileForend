//index.js 主页
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
    tours: [{
      id: 1,
      pic: '../../images/sight_template.jpg',
      name: "总统府一日游",
      description: "去总统府一天的旅行",
      score: 4.7,
      state: "已结束",
      nums: 5,
      limit: 100,
      startTime: "2019-01-22:08:00",
      endTime: "2019-01-22:17:00",
      joinOrNot: false,
      publicOrNot: true,
    }, {
      id: 2,
      pic: '../../images/sight_template.jpg',
      name: "夫子庙两日游",
      description: "探寻夫子庙的两天之旅",
      state: "未开始",
      nums: 5,
      limit: 100,
      startTime: "2019-02-22:19:00",
      endTime: "2019-02-23:22:00",
      joinOrNot: false,
      publicOrNot: true,
    }]
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
  init_tours: function () {
    let that = this;
    //TODO 之后改为分页||暂时为了应付检查先不分页
    util.getData('tour/all/' + this.data.cityId).then(res => {
      if (res.data.code == 200) {
        console.log(res);
        this.setData({
          tours: res.data.data
        });
      } else {
        util.showToast("获取数据出错！", "fail", 200);
      }
      wx.hideNavigationBarLoading();
    }).catch(e => {
      util.showToast("获取数据出错！", "fail", 200);
      wx.hideNavigationBarLoading();
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