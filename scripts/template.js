// template.js
module.exports = {
  wxmlTemplate: compoenntName => {
    return `<view class='wrapper'></view>
`
  },
  wxssTemplate: ``,
  jsonTemplate: titleName => {
    return `{
  "navigationBarTitleText": "${titleName}"
}`
  },
  jsTemplate: `import Page from '../../common/page';

Page({
  data: {
    title:'', // 转发标题
  },
  initData(isNeedLoading = 1){
    this._initData(isNeedLoading,() => {
      
    })
  }
})
`
}