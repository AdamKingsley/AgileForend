//index.js 主页
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    current: 0,
    tours: [{
      id: 1,
      pic: '../../images/sight_template.jpg',
      name: "总统府一日游",
      description: "这里真好玩",
      score: 5.0,
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
    }],
    tourcomments: [{
      id: 1,
      tourid: 0,
      userid: 0,
      comment: 'good',
      score: 0
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('index onload');
    console.log(app.globalData);
    this.setData({
      userId: wx.getStorageSync('userid'),
  
    });  
    init_tours();
    init_tourcomment();
  },
  
  init_tours: function() {
    let that = this;
    //TODO 之后改为分页||暂时为了应付检查先不分页
    util.getData('tour/my/' + this.data.userId).then(res => {
      if (res.data.code == 200) {
        console.log(res);
        this.setData({
          tours: this.data.data
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