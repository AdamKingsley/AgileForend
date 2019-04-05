var filterData = {// 下拉菜单
  first: '评分排序',
  second: '票价排序',
  thirds: '详细筛选',
  _num: 0,
  _res: 0,
  // 筛选
  first_array: [{ name: '评分升序', value: 1, checked: false }, { name: '评分降序', value: 2, checked: false}],
  second_array: [{ name: '票价升序', value: 1, checked: false }, { name: '票价降序', value: 2, checked: false}],
  third_array:[{name:'评分范围',type:"score",min:'',max:''},{name:'票价范围',type:"price",min:'',max:''}],
  one: 0,
  two: 0,
  third: 0,
  };


module.exports = {
  filter_data: filterData,
};