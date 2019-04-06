//index.js 主页
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    current: 0,
    tours: [{
      id: 1,
      pic: '../../images/sight_template.jpg',
      name: "雨花台一日游",
      description: "",
      score: 4.6,
      state: "已结束",
      nums: 5,
      limit: 100,
      startTime: "2019-01-22:19:00",
      endTime: "2019-01-22:22:00",
      joinOrNot: true,
      publicOrNot: true,
    }, {
      id: 2,
      pic: '../../images/sight_template.jpg',
      name: "玄武湖一日游",
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
      name: "中山陵一日游",
      description: "这里一百分",
      score: 5.0,
      state: "已结束",
      nums: 5,
      limit: 100,
      startTime: "2019-01-12:19:00",
      endTime: "2019-01-22:22:00",
      joinOrNot: true,
      publicOrNot: true,
    }, {
      id: 4,
      pic: '../../images/sight_template.jpg',
      name: "明孝陵一日游",
      description: "这里还可以",
      score: 4.0,
      state: "已结束",
      nums: 5,
      limit: 100,
      startTime: "2019-01-22:19:00",
      endTime: "2019-01-22:22:00",
      joinOrNot: true,
      publicOrNot: true,
    }, {
      id: 5,
      pic: '../../images/sight_template.jpg',
      name: "南大一日游",
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
      id: 6,
      name: "雨花台",
      pic: '../../images/sight_template.jpg',
      name: "东南一日游",
      description: "这里还不错",
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
      name: "仙林一日游",
      description: "",
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
      name: "火车站一日游",
      description: "",
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
  switchSlider: function (e) {
    this.setData({
      current: e.target.dataset.index
    })
  },
  changeSlider: function (e) {
    this.setData({
      current: e.detail.current
    })
  }
})