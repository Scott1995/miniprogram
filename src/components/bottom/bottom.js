Component({
  properties:{
    active:Number,
  },
  data: {
    active_color:'#ff0000',
    icon: {
      normal:
'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png',
      active:
        'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png'
    }
  },
  methods:{
    onChange(event) {
      if(event.detail == 0){
        wx.navigateTo({
          url: '/pages/index/index',
        })
      } else if (event.detail == 1) {
        wx.navigateTo({
          url: '/pages/test/test',
        })
      }
    }
  }
});
