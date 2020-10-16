// pages/xwdt/xwdt.js
var moviesInfo = require('../../data/movieInfo.js');
Page({
  data: {
  },
  onLoad: function (options) {
    this.setData({
      posts_key: moviesInfo.postList
    })
  },
 jumpBtn:function(options){
  // console.log(options)
  var postId = options.currentTarget.dataset.postid;
   wx.navigateTo({
     url: '/pages/moviemore/moviemore?id='+postId,
   })
 },
 onSwiperTap: function (event) {
  var postId = event.target.dataset.postid;
  wx.navigateTo({
    url: "/pages/moviemore/moviemore?id=" + postId
  })
},
})