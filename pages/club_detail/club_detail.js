var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    hiddenFlag: true,
    inputShowed: false,
    select_text: "",
    province: '江苏省',
    provinceId: 2,
    city: '南京',
    cityId: 1,
    clubs: [{
      id: 1,
      pic: '../../images/club.jpg',
      name: "南大社团",
      description: "南京大学",
      // score: 4.7,
      // state: "未开始",
      nums: 5,
      limit: 100,
      // startTime: "2019-01-22:19:00",
      // endTime: "2019-01-22:22:00",
      joinOrNot: false,
      publicOrNot: true,
    }, ],
    invitation:{
      invitedId: 0,
      senderId: wx.getStorageSync("userid"),
      clubId:0,
    },
    joinClubForm:{
      clubId:0,
      userId:0,
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('index onload');
    console.log(app.globalData)
    this.setData({
      city: app.globalData.city ? app.globalData.city.itemName : this.data.city,
      cityId: app.globalData.city ? app.globalData.city.id : this.data.cityId,
      province: app.globalData.province ? app.globalData.province.itemName : this.data.province,
      provinceId: app.globalData.province ? app.globalData.province.id : this.data.provinceId,
    });
  },
  onShow: function (options) {
    this.onLoad(options);
  },
  selectCity: function () {
    wx.navigateTo({
      url: '../city_selector/city_selector?cityId=' + this.data.cityId + '&city=' + this.data.city + '&province=' + this.data.province + '&provinceId=' + this.data.provinceId,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
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

  invite: function (e) {
    console.log("点击邀请按钮", e);
    // console.log(this.data.clubinfo);
    let complete = true;
    // Object.keys(this.data.clubinfo).forEach(key => {
    //   console.log(key, ":", this.data.clubinfo[key]);
    //   if (!this.data.clubinfo[key]) {
    //     complete = false
    //     return;
    //   }
    // });
    // if (!complete) {
    //   util.showToast("完善信息后提交！", "fail", 2000);
    //   return;
    // }
    // var 
    this.setData({
      hiddenFlag: false
    })
    // util.postData('/club/create', this.data.clubinfo).then(res => {
    //   console.log(res);
    //   if (res.data.code == 200) {
    //     // wx.setStorageSync('userid', res.data.data);
    //     util.showToast("保存信息成功！", "success", 2000);
    //     // wx.switchTab({
    //     //   url: '../index/index',
    //     // });
    //   } else {
    //     util.showToast("初始化信息失败！", "fail", 2000);
    //   }
    // }).catch(e => {
    //   util.showToast("请求失败，请重试！", "fail", 2000);
    // });
  },

  enterFor: function(e){
    let that = this;
    var joinClubFormClubId = 'joinClubForm.clubId';
    var joinClubFormUserId = 'joinClubForm.userId';
    that.setData({
      [joinClubFormClubId] : this.data.clubs[0].id,
      [joinClubFormUserId] : wx.getStorageSync("userid")
    })
    util.postData('club/join',this.data.joinClubForm).then(res =>{
      console.log(res);
      if (res.data.code == 200) {
        util.showToast("加入社团成功！", "success", 2000);
      } else {
        util.showToast("加入社团失败！", "fail", 2000);
      }
    }).catch(e => {
      util.showToast("请求失败，请重试！", "fail", 2000);
    });
  },

  confirm: function(e){
    let that = this;
    util.getData('/user/' + this.data.invitation.invitedId).then(response => {
      console.log('response', response)
      if (response.data.code == '200') {
        var insideClubId = 'invitation.clubId';
        this.setData({
          [insideClubId]: this.data.clubs[0].id
        })
        console.log(this.data.invitation.clubId);
        util.getData('club/check/' + this.data.invitation.invitedId + '/' + this.data.invitation.clubId).then(checkInRes =>{
          if(checkInRes.data.code == '200'){
            util.postData('club/invite', this.data.invitation).then(res => {
              console.log(res);
              if (res.data.code == 200) {
                util.showToast("发送邀请成功！", "success", 2000);
              } else {
                util.showToast("发送邀请失败！", "fail", 2000);
              }
            }).catch(e => {
              util.showToast("请求失败，请重试！", "fail", 2000);
            });
          }else{
            util.showToast("他已是社团成员！", "fail", 2000);
          }
          }).catch(e => {
            util.showToast("网络请求失败！", "fail", 2000);
          });
      } else {
        util.showToast("该用户不存在！", "fail", 2000);
      }
    }).catch(e => {
      console.log(e);
      util.showToast("网络请求失败！", "fail", 2000);
    });
  },



  bindId: function(e){
    var insideInvitedId = 'invitation.invitedId';
    this.setData({
      [insideInvitedId]: e.detail.value
    })
    console.log(this.data.invitation.invitedId);
  },
})
function saveInvitation(e) {
  
  // util.postData('/club/invite', this.data.invitedId,this.data.senderId,this.data.clubId)
}