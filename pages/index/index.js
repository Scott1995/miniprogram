import Page from '../../common/page';
import { _test } from '../../utils/api'

Page({
  data: {
    title:'还是很受伤啊啊', // 转发标题
  },
  test(){
    _test(res => {
      this.setData({
        a:1
      },() => {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
      })
    })
  },
  initData(isNeedLoading = 1){
    this._initData(isNeedLoading,() => {
      this.test()
    })
  }
})
