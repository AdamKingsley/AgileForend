// pages/city_selector/city_selector.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    inputShowed: false,
    select_text: "",
    select_province: {
      id: 1,
      itemName: '江苏省'
    },
    select_city: {
      id: 1,
      itemName: '南京'
    },
    province_list_visiable: false,
    province_list: [{
        id: 1,
        itemName: '北京市',
        content: '',
      }, {
        id: 2,
        itemName: '江苏省',
        content: '',
      },
      {
        id: 3,
        itemName: '天津市',
        content: '',
      },
      {
        id: 4,
        itemName: '重庆市',
        content: '',
      },
      {
        id: 5,
        itemName: '上海市',
        content: '',
      },
      {
        id: 6,
        itemName: '山东省',
        content: '',
      }
    ],
    city_list: [{
      id: 1,
      itemName: '南京',
      content: '',
    }, {
      id: 2,
      itemName: '苏州',
      content: '',
    }, {
      id: 3,
      itemName: '无锡',
      content: '',
    }, {
      id: 4,
      itemName: '常州',
      content: '',
    }, {
      id: 5,
      itemName: '扬州',
      content: '',
    }, {
      id: 6,
      itemName: '泰州',
      content: '',
    }, {
      id: 7,
      itemName: '宿迁',
      content: '',
    }, {
      id: 8,
      itemName: '济南',
      content: '',
    }, {
      id: 9,
      itemName: '烟台',
      content: '',
    }, {
      id: 10,
      itemName: '临沂',
      content: '',
    }]
  },

  //点击最外层列表展开收起
  listTap(e) {
    console.log('触发了最外层');
    // let Index = e.currentTarget.dataset.parentindex, //获取点击的下标值
    // visiable = this.data.province_list_visiable;
    // visiable = !visiable || false; 
    //变换其打开、关闭的状态;
    this.setData({
      province_list_visiable: !this.data.province_list_visiable || false
    })
  },
  select_province(e) {
    console.log(e);
    this.listTap(e);
    this.setData({
      select_province: {
        id: e.currentTarget.dataset.index,
        itemName: e.currentTarget.dataset.name
      }
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