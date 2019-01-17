export default function (options = {}) {
  return Page({
    // 页面进入
    onLoad: function () {
      this.initData()
    },
    // 转发
    onShareAppMessage() {
      return {
        title: this.data.title ? this.data.title : '小顽童'
      };
    },
    // 下拉刷新
    onPullDownRefresh() {
      wx.showNavigationBarLoading()
      this.initData(0)
    },
    // 初始化数据,可视区域内容加载完全后即关闭loading
    _initData(ifNeedLoading = 1, cb) {
      ifNeedLoading && wx.showLoading({
        title: '加载中',
      })
      cb && cb()
    },
    ...options
  });
}
