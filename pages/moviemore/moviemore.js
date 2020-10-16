// pages/moviemore/moviemore.js
var moviesInfo = require('../../data/movieInfo.js');
var app = getApp()
Page({
  data: {
    collected: false,
  },
  onLoad: function (options) {
    var postId = options.id;
    this.data.currentPostId = postId;
    var movieInfo = moviesInfo.postList[postId];
    // console.log(postId)
    this.setData({
      movieInfo:  movieInfo
    })
    // 收藏
    var postsCollected = wx.getStorageSync("posts_collected");
    console.log(postsCollected)
    if (postsCollected) {
      var postCollected = postsCollected[postId] //由模拟形式决定
      this.setData({
        collected: postCollected
      })

    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected)
    }
  },
  onColletionTap: function (event) {
    this.getPostsCollectedAsy();//异步收藏
  },

  // 异步收藏存储
  getPostsCollectedAsy: function () {
    var that = this;
    wx.getStorage({
      key: 'posts_collected',
      success: function (res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];

        // 收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;  //更新缓存

        // 吐司
        that.showToast(postsCollected, postCollected)
      },
    })
  },

  // 吐司
  showToast: function (postsCollected, postCollected) {
    wx.setStorageSync('posts_collected', postsCollected);

    //更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })

    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      duration: 800,
      icon: "success"
    })
  },
})