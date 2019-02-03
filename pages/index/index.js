//index.js 主页
var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    inputShowed: false,
    select_text: "",
    province: '江苏省',
    provinceId: '320000',
    city: '南京',
    cityId: '320100',
    sights: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('index onload');
    console.log(app.globalData)
    // this.init_data();
    // this.init_sights();
  },
  onShow: function(options) {
    wx.showNavigationBarLoading();
    console.log('index onShow');
    console.log(app.globalData)
    this.init_data();
    this.init_sights();
  },
  init_data: function(){
    this.setData({
      city: app.globalData.city ? app.globalData.city.itemName : this.data.city,
      cityId: app.globalData.city ? app.globalData.city.id : this.data.cityId,
      province: app.globalData.province ? app.globalData.province.itemName : this.data.province,
      provinceId: app.globalData.province ? app.globalData.province.id : this.data.provinceId,
    });
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
      wx.hideNavigationBarLoading();
    }).catch(e => {
      util.showToast("获取数据出错！", "fail", 200);
      wx.hideNavigationBarLoading();
    });
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