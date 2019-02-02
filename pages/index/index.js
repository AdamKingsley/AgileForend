//index.js 主页
var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    inputShowed: false,
    select_text: "",
    province: '江苏省',
    provinceId: '320000',
    city: '南京市',
    cityId: '320100',
    sights: []
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
    this.init_sights();
  },
  init_sights: function() {
    let that = this;
    //TODO 之后改为分页||暂时为了应付检查先不分页
    util.getData('sight/all/' + this.data.cityId).then(res => {
      if (res.data.code == 200) {
        console.log(res);
        this.setData({
          sights: res.data.data
        });
      } else {
        util.showToast("获取数据出错！", "fail", 200);
      }
    }).catch(e => {
      util.showToast("获取数据出错！", "fail", 200);
    });
  },

  onShow: function(options) {
    //this.onLoad(options);
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