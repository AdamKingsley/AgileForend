var data = {
  //用于传输给后端创建用户保存的信息体
  userinfo: {
    openid: '',
    sex: '',
    nickname: '',
    avatar: '',
    tel: '',
    province: '',
    city: '',
    area: '',
    province_id: '',
    city_id: '',
    area_id: '',
    address: '',
    school: ''
  },
  //用于映射传递到后端
  sex: {
    0: "UNKNOWN",
    1: "MALE",
    2: "FEMALE",
  },
  //用于界面展示
  sex_list: [{
      name: "男",
      value: 1,
      checked: false
    },
    {
      name: "女",
      value: 2,
      checked: false
    },
    {
      name: "秘密",
      value: 0,
      checked: false
    }
  ],
  //用于动态调整修改用户名的样式
  status: 0,
  //验证码
  vcode: '',
  //后端返回的vcode用于前端检验
  //优化的话，可将该值存到后端的session中控制时长，暂不实现
  vcode_check:'',
  vcode_final_count: 60,
  vcode_btn_text: '获取验证码',
  vcode_btn_disabled: false,
  //省市区picker联动list
  province_list: [],
  city_list: [],
  area_list: [],
  area_value:[0,0,0],
}


module.exports = {
  data: data
}