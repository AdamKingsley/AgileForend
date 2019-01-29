// pages/city_selector/city_selector.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    inputShowed: false,
    select_text: "",
    select_province: {
      id: '320000',
      itemName: '江苏省'
    },
    select_city: {
      id: '320100',
      itemName: '南京市'
    },
    province_list_visiable: false,
    province_list: [],
    city_list: []
  },

  //点击最外层列表展开收起
  listTap(e) {
    console.log('触发了最外层');
    //变换其打开、关闭的状态;
    this.setData({
      province_list_visiable: !this.data.province_list_visiable || false
    })
  },
  select_province(e) {
    console.log(e);
    this.listTap(e);
    let that = this;
    this.setData({
      select_province: {
        id: e.currentTarget.dataset.index,
        itemName: e.currentTarget.dataset.name
      }
    });
    this.cityList(e.currentTarget.dataset.index).then(()=>{
      that.setData({select_city:{
        id : that.data.city_list[0].id,
        itemName : that.data.city_list[0].itemName,
      }})
    });
    //选择省份之后应该向后端请求该省份包含的城市
    //然后展示城市列表
  },
  select_city(e) {
    //选择城市
    console.log(e);
    console.log(e.currentTarget.dataset.index, e.currentTarget.dataset.name);
    this.setData({
      city: {
        id: e.currentTarget.dataset.index,
        itemName: e.currentTarget.dataset.name,
      }
    });
    app.globalData.city = {
      id: e.currentTarget.dataset.index,
      itemName: e.currentTarget.dataset.name
    };
    app.globalData.province = {
      id: this.data.select_province.id,
      itemName: this.data.select_province.itemName
    };
    // console.log(app.globalData)
    wx.switchTab({
      url: '../index/index',
      success: function(res) {
        console.log(res);
        console.log("成功跳转！");
      },
      fail: function(res) {
        console.log(res)
        console.log("跳转失败！")
      },
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    //初始化首页中固定选择的城市和省份
    this.setData({
      select_province: {
        id: options.provinceId ? options.provinceId : this.data.select_province.id,
        itemName: options.province ? options.province : this.data.select_province.itemName,
      },
      select_city: {
        id: options.cityId ? options.cityId : this.data.select_city.id,
        itemName: options.city ? options.city : this.data.select_city.itemName,
      }
    });
    this.provinceList();
    //对应的城市进行刷新
    this.cityList(options.provinceId ? options.provinceId : this.data.select_province.id);
  },
  cityList(province_id){
    let that = this;
    // let province_id = that.getData.select_province.id;
    return util.getData("address/cities?province_id="+province_id).then(response=>{
      //获取省份
      console.log('response', response)
      if (response.data.code == '200') {
        that.setData({
          city_list: response.data.data,
        })
      } else {
        util.showToast("系统内部异常！", "fail", 2000);
      }
    }).catch(e=>{
      util.showToast("网络请求失败！", "fail", 2000);
    });
  },
  provinceList: function() {
    let that = this;
    util.getData('address/provinces').then(response => {
      //获取省份
      console.log('response',response)
      if(response.data.code=='200'){
        that.setData({
          province_list:response.data.data,
        })
      }else{
        util.showToast("系统内部异常！","fail",2000);
      }
    }).catch(e => {
      console.log(e);
      util.showToast("网络请求失败！", "fail", 2000);
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