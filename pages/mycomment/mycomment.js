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
      description: "这里真好玩",
      score: 4.7,
      state: "未开始",
      nums: 5,
      limit: 100,
      startTime: "2019-01-22:19:00",
      endTime: "2019-01-22:22:00",
      joinOrNot: true,
      publicOrNot: true,
    }, {
      id: 2,
      pic: '../../images/sight_template.jpg',
      name: "总统府一日游",
      description: "这里一般般",
      score: 3.0,
      state: "已结束",
      nums: 5,
      limit: 100,
      startTime: "2019-01-22:19:00",
      endTime: "2019-01-22:22:00",
      joinOrNot: true,
      publicOrNot: true,
    }, {
      id: 3,
      pic: '../../images/sight_template.jpg',
      name: "总统府一日游",
      description: "这里不好玩",
      score: 5.0,
      state: "进行中",
      nums: 5,
      limit: 100,
      startTime: "2019-01-12:19:00",
      endTime: "2019-01-22:22:00",
      joinOrNot: false,
      publicOrNot: true,
    }, {
      id: 4,
      pic: '../../images/sight_template.jpg',
      name: "总统府一日游",
      description: "这里真好玩",
      score: 4.7,
      state: "进行中",
      nums: 5,
      limit: 100,
      startTime: "2019-01-22:19:00",
      endTime: "2019-01-22:22:00",
      joinOrNot: true,
      publicOrNot: true,
    }, {
      id: 5,
      pic: '../../images/sight_template.jpg',
      name: "总统府一日游",
      description: "这里真好玩",
      score: 4.7,
      state: "进行中",
      nums: 5,
      limit: 100,
      startTime: "2019-01-22:19:00",
      endTime: "2019-01-22:22:00",
      joinOrNot: false,
      publicOrNot: true,
    }, {
      id: 6,
      name: "雨花台",
      pic: '../../images/sight_template.jpg',
      name: "总统府一日游",
      description: "这里还可以",
      score: 4.5,
      state: "已结束",
      nums: 5,
      limit: 100,
      startTime: "2019-01-22:19:00",
      endTime: "2019-01-22:22:00",
      joinOrNot: true,
      publicOrNot: true,
    }, {
      id: 7,
      pic: '../../images/sight_template.jpg',
      name: "总统府一日游",
      description: "这里真好玩",
      score: 4.7,
      state: "已结束",
      nums: 5,
      startTime: "2019-01-22:19:00",
      endTime: "2019-01-22:22:00",
      joinOrNot: false,
      publicOrNot: true,
    }, {
      id: 8,
      pic: '../../images/sight_template.jpg',
      name: "总统府一日游",
      description: "这里真好玩",
      score: 4.7,
      state: "已结束",
      nums: 19,
      startTime: "2019-01-22:19:00",
      endTime: "2019-01-22:22:00",
      joinOrNot: true,
      clubId: 11000,
      clubName: "社团A",
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
  }
})