//index.js 主页
var util = require('../../utils/util.js');
var filter = require('./filter.js');
var app = getApp();
Page({
  data: {
    inputShowed: false, 
    city: '南京',
    cityId: '320100',
    province:"江苏省",
    provinceId:"320000",
    sights: null,
    filterData: {},
    currentTab: -1,
    isShow: false,
    filterSearchData: {
      scoreOrder: '',
      priceOrder: '',
      minScore: '',
      maxScore: '',
      minPrice: '',
      maxPrice: '',
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('index onload');
    console.log(app.globalData);
    // this.onShow();
    // this.init_data();
    // this.init_sights();
  },
  onShow: function(options) {
    wx.showNavigationBarLoading();
    console.log('index onShow');
    console.log(app.globalData);
    // 默认筛选的下拉框是关闭的
    this.hideNav();
    this.init_data();
    this.init_sights();
  },
  init_data: function() {
    this.setData({
      //筛选栏对应的信息
      filterData: filter.filter_data,
      //默认的定位信息
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
        let sights = res.data.data;
        //组装正确的图片地址
        sights.forEach(item=>{
          if(item.pics){
            for(var i in item.pics){
              item.pics[i] = util.getUrlPrefix() + item.pics[i];
            }
          }
        });
        this.setData({
          sights: sights
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
  },
  //下拉切换
  hideNav: function() {
    let that = this;
    setTimeout(
      function() {
        that.setData({
          displays: "none",
          isShow: false
        });
      }, 500);
  },

  //筛选栏显示对应的选择项目 如筛选指标是升序还是降序
  tabNav: function(e) {
    this.setData({
      displays: "block"
    })
    if (this.data.currentTab === e.target.dataset.current && this.data.isShow) {
      this.hideNav();
      return false;
    } else {
      // var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: true
      })
    }
  },
  //筛选条件中的清除
  FilterRangeClear: function(e) {
    console.log("invoke filter range clear");
    console.log(e);
    //界面的状态发生变化
    let filterSearchData = this.data.filterSearchData;
    filterSearchData.minPrice = '';
    filterSearchData.maxPrice = '';
    filterSearchData.minScore = '';
    filterSearchData.maxScore = '';
    let filterData = this.data.filterData;
    filterData.third_array = [{
      name: '评分范围',
      min: '',
      max: ''
    }, {
      name: '票价范围',
      min: '',
      max: ''
    }];
    this.setData({
      filterSearchData: filterSearchData,
      filterData: filterData
    });
  },
  //筛选条件中的确认
  FilterConfirm: function(e) {
    console.log("invoke filter confirm");
    console.log(e);
    let filterData = this.filterData;
    if (this.checkRangeData()) {
      this.hideNav();
      //界面的状态发生变化
      this.filterSearch();
    }
  },
  //评分的排序
  selectScoreOrder(e) {
    console.log("select score order");
    console.log(e);
    // console.log(this.filterData);
    //界面的状态发生变化
    let filterData = this.data.filterData;
    let filterSearchData = this.data.filterSearchData;
    // let first_array = filterData.first_array;
    // let changed = false;
    for (var i = 0; i < filterData.first_array.length; i++) {
      if (filterData.first_array[i].value == e.currentTarget.dataset.id) {
        //状态发生变化
        filterData.first_array[i].checked = !filterData.first_array[i].checked;
        if (filterData.first_array[i].checked) {
          filterSearchData.scoreOrder = filterData.first_array[i].value;
        } else {
          filterSearchData.scoreOrder = '';
        }
        // changed = true;
      } else {
        filterData.first_array[i].checked = false;
      }
    }

    this.setData({
      filterSearchData: filterSearchData,
      filterData: filterData
    });
    this.hideNav();
    //todo 更新数据
    this.filterSearch();

  },
  //票价的排序
  selectPriceOrder(e) {
    console.log("select price order");
    console.log(e);
    // console.log(this.filterData);
    //界面的状态发生变化
    let filterData = this.data.filterData;
    let filterSearchData = this.data.filterSearchData;
    // let changed = false;
    // let second_array = filterData.second_array;
    for (var i = 0; i < filterData.second_array.length; i++) {
      if (filterData.second_array[i].value == e.currentTarget.dataset.id) {
        filterData.second_array[i].checked = !filterData.second_array[i].checked;
        // changed = true;
        if (filterData.second_array[i].checked) {
          filterSearchData.priceOrder = filterData.second_array[i].value;
        } else {
          filterSearchData.priceOrder = '';
        }
      } else {
        filterData.second_array[i].checked = false;
      }
    }
    this.setData({
      filterSearchData: filterSearchData,
      filterData: filterData
    });
    this.hideNav();
    //todo 更新数据
    this.filterSearch();

  },
  inputRange(e) {
    console.log(e);
    console.log("invoke input range");
    let dataset = e.currentTarget.dataset;
    let detail = e.detail;
    let filterData = this.data.filterData;
    let filterSearchData = this.data.filterSearchData;
    for (var i = 0; i < filterData.third_array.length; i++) {
      if (filterData.third_array[i].type == dataset.type) {
        filterData.third_array[i][dataset.index] = detail.value;
      }
    }
    this.setData({
      filterData: filterData,
    });
  },
  filterSearch() {
    //范围数据检查，数据传送给对应的filterSearchData
    // this.checkRangeData();
    //按照筛选条件进行选择 请求后端进行筛选和排序工作
    // scoreOrder: -1,
    // priceOrder: -1,
    // minScore: -1,
    // maxScore: null,
    // minPrice: -1,
    // maxPrice: null,
    //TODO 之后改为分页||暂时为了应付检查先不分页
    console.log("invoke filterSearch");
    let searchData = this.data.filterSearchData;
    let url = 'sight/all/filter/' + this.data.cityId + '?';
    let request_arr = []
    for (var key in searchData) {
      if (searchData[key]) {
        request_arr.push('f_'+key + '=' + searchData[key])
      }
    }
    url+=(request_arr.join('&'));
    //打印请求的url
    console.log(url);
    util.getData(url).then(res => {
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
  checkRangeData: function() {
    //checkData
    let rangeData = this.data.filterData.third_array;
    let filterSearchData = this.data.filterSearchData;
    for (var item in rangeData) {
      if (item.type == 'price') {
        filterSearchData.minPrice = item.min;
        filterSearchData.maxPrice = item.max;
      } else if (item.type == 'score') {
        filterSearchData.minScore = item.min;
        filterSearchData.maxScore = item.max;
      }
    }
    //设置数据
    this.setData({
      filterSearchData: filterSearchData,
    });
    //设置完数据，检查范围值
    if (filterSearchData.minScore && filterSearchData.maxScore && filterSearchData.maxScore < filterSearchData.minScore) {
      util.showToast("前值需小于后值", "fail", 200);
      return false;
    }
    if (filterSearchData.minPrice && filterSearchData.minPrice && filterSearchData.maxPrice < filterSearchData.minPrice) {
      util.showToast("前值需小于后值", "fail", 200);
      return false;
    }
    return true;
  }
})