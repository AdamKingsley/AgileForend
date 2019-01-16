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
    sights: [{
      id: 1,
      pic: '../../images/sight_template.jpg',
      name: "总统府",
      description: "这里美如画，这里贼好玩，这里的山路十八弯，这里的水路九连环",
      score: 4.7,
      price: 20,
      labels:['4A景区','名楼','俯瞰长江']
    }, {
      id: 2,
      name: '夫子庙',
      pic: '../../images/sight_template.jpg',
      description: "这里美如画，这里贼好玩，这里的山路十八弯，这里的水路九连环",
      score: 3.2,
      price: 20,
    }, {
      id: 3,
      name: '老门东',
      pic: '../../images/sight_template.jpg',
      description: "这里美如画，这里贼好玩，这里的山路十八弯，这里的水路九连环",
      score: 5.0,
      price: 20,
    }, {
      id: 4,
      name: "狮子桥",
      pic: '../../images/sight_template.jpg',
      description: "这里美如画，这里贼好玩，这里的山路十八弯，这里的水路九连环",
      score: 4.7,
      price: 0,
    }, {
      id: 5,
      name: "中山陵",
      pic: '../../images/sight_template.jpg',
      description: "这里美如画，这里贼好玩，这里的山路十八弯，这里的水路九连环",
      score: 1.7,
    }, {
      id: 6,
      name: "雨花台",
      pic: '../../images/sight_template.jpg',
      description: "这里美如画，这里贼好玩，这里的山路十八弯，这里的水路九连环",
      score: 3.7,
    }, {
      id: 7,
      pic: '../../images/sight_template.jpg',
      name: "燕子矶",
      description: "这里美如画，这里贼好玩，这里的山路十八弯，这里的水路九连环",
      score: 5.0,
      price: 150,
    }, {
      id: 8,
      name: "阅江楼",
      pic: '../../images/sight_template.jpg',
      description: "这里美如画，这里贼好玩，这里的山路十八弯，这里的水路九连环",
      score: 5.0,
      price: 100,
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('index onload');
    console.log(app.globalData)
    this.setData({
      city: app.globalData.city ? app.globalData.city.itemName : this.data.city,
      cityId: app.globalData.city ? app.globalData.city.id : this.data.cityId,
      province: app.globalData.province ? app.globalData.province.itemName : this.data.province,
      provinceId: app.globalData.province ? app.globalData.province.id : this.data.provinceId,
    });
  },
  onShow: function(options) {
    this.onLoad(options);
  },
  selectCity: function() {
    wx.navigateTo({
      url: '../city_selector/city_selector?cityId=' + this.data.cityId + '&city=' + this.data.city + '&province=' + this.data.province + '&provinceId=' + this.data.provinceId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      select_text: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      select_text: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      select_text: e.detail.value
    });
  }
})