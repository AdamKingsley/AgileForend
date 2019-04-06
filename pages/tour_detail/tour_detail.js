let app = getApp();
let util = require('../../utils/util.js');
let import_data = require('./data.js');

Page({
  data: {
    //轮播图配置相关信息
    swiper_config: import_data.swiper_config,
    swiper_images: [],
    //出游详情
    tour: {
      // id: 1,
      // pic: '../../images/sight_template.jpg',
      // name: "总统府一日游",
      // description: "去总统府一天的旅行",
      // score: 4.7,
      // state: "已结束",
      // nums: 5,
      // limit: 100,
      // startTime: "2019-01-22:08:00",
      // endTime: "2019-01-22:17:00",
      // joinOrNot: false,
    },
    comment:null,
    ellipsis: true,
    score_color: 'red',
    hiddenFlag: true,
  },

  onLoad: function (options) {
    //在标题栏中显示加载
    wx.showNavigationBarLoading();
    console.log("options:", options);
    let tourId = options.tourId;
    let userId = wx.getStorageSync('userid');
    console.log(userId);
    //获取详情
    util.getData('tour/detail/' + tourId + "/" + userId).then(res => {
      console.log("详情信息：", res);
      if (res.data.code == 200) {
        //轮播图数据准备
        wx.setNavigationBarTitle({
          title: res.data.data.name
        });
        let pics = res.data.data.pics;
        console.log(pics);
        let swiper_images = [];
        // pics.forEach((item, index) => {
        //   swiper_images.push(item);
        // });
        this.setData({
          tour: res.data.data,
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
  },
  // createTour: function () {
  //   //跳转到创建出游页面
  //   wx.navigateTo({
  //     url: '../create_tour/create_tour'
  //   });
  // }
  invite: function (e) {
    console.log("点击邀请按钮", e);
    // console.log(this.data.clubinfo);
    let complete = true;
    this.setData({
      hiddenFlag: false
    })
  },

  confirm: function (e) {
    let that = this;
    util.getData('/user/' + this.data.invitation.invitedId).then(response => {
      console.log('response', response)
      if (response.data.code == '200') {
        var insideClubId = 'invitation.tourId';
        this.setData({
          [insideTourId]: this.data.tours[0].id
        })
        console.log(this.data.invitation.tourId);
        util.postData('tour/invite', this.data.invitation).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            util.showToast("发送邀请成功！", "success", 2000);
          } else {
            util.showToast("发送邀请失败！", "fail", 2000);
          }
        }).catch(e => {
          util.showToast("请求失败，请重试！", "fail", 2000);
        });
      }
    }).catch(e => {
      console.log(e);
      util.showToast("网络请求失败！", "fail", 2000);
    });
  },



  bindId: function (e) {
    var insideInvitedId = 'invitation.invitedId';
    this.setData({
      [insideInvitedId]: e.detail.value
    })
    console.log(this.data.invitation.invitedId);
  }
})