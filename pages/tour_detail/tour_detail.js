let app = getApp();
let util = require('../../utils/util.js');
let import_data = require('./data.js');

Page({
  data: {
    //轮播图配置相关信息
    swiper_config: import_data.swiper_config,
    swiper_images: [],
    //景点详情
    tour: {},
    ellipsis: true,
    score_color: 'red',
  },

  onLoad: function (options) {
    //在标题栏中显示加载
    wx.showNavigationBarLoading();
    console.log("options:", options);
    let tourId = options.tourId;
    //获取详情
    util.getData('tour/detail/' + tourId).then(res => {
      console.log("详情信息：", res);
      if (res.data.code == 200) {
        //轮播图数据准备
        wx.setNavigationBarTitle({
          title: res.data.data.name
        });
        let pics = res.data.data.pics;
        console.log(pics);
        let swiper_images = [];
        pics.forEach((item, index) => {
          swiper_images.push(item);
        });
        this.setData({
          sight: res.data.data,
          swiper_images: swiper_images
        });
        this.scoreColor(res.data.data.score);
      } else {
        util.showToast("获取数据失败！", "fail", 2000);
      }
      //加载了标题name后就立马取消loading
      wx.hideNavigationBarLoading();
    }).catch(e => {
      util.showToast("系统内部异常！", "fail", 2000);
      //加载了标题name后就立马取消loading
      wx.hideNavigationBarLoading();
    });
  },
  onReady: function () {
    console.log("onReady:", this.data);
  },
  onShow: function () { },
  //是否默认显示
  ellipsis: function () {
    var value = !this.data.ellipsis;
    this.setData({
      ellipsis: value
    });
  },
  scoreColor: function (score) {
    let score_color = 'yellow';
    if (score >= 4.5) {
      score_color = 'red';
    } else if (score <= 3.5) {
      score_color = "green";
    }
    this.setData({
      score_color
    });
  }
  // createTour: function () {
  //   //跳转到创建出游页面
  //   wx.navigateTo({
  //     url: '../create_tour/create_tour'
  //   });
  // }
})