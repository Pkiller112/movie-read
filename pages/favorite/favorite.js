// pages/favorite/favorite.js
var app = getApp()
Page({
  data: {
    moviearray:[],
    talkarray:[],
    show: 'movie_favorite',
  },
  onLoad: function (options) {
    app.MovieRefresh()
    app.TalkRefresh()
    // console.log(app.globalData.moviearray)
    this.setData({
      moviearray:  app.globalData.moviearray,
      talkarray:  app.globalData.talkarray
    })
  },
  onPullDownRefresh: function () {
    this.onLoad()
  },
  jumpBtnMovie:function(options){
    var postId = options.currentTarget.dataset.postid;
     wx.navigateTo({
       url: '/pages/moviemore/moviemore?id='+postId,
     })
   },
   jumpBtnTalk: function (options) {
    var postId = options.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '/pages/talkingmore/talkingmore?id=' + postId
    })
  },
   changeViewType: function(e) {
    var data = e.currentTarget.dataset
    this.setData({
      show: data.type,
    })
  }
})