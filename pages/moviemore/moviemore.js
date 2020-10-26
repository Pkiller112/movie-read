// pages/moviemore/moviemore.js
var moviesInfo = require('../../data/movieInfo.js');
var app = getApp()
Page({
  data: {
    collected: false,
    history:[]
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
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      })

    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected)
    }
// 历史
    var historyslist = wx.getStorageSync("historys_list");
    if(!historyslist){
      var history=this.data.history;
      wx.setStorageSync('historys_list', history);
    }
      for(var i=0;i<historyslist.length;i++){
        if(historyslist[i]==postId)
        historyslist.splice(i,1);
      }
      historyslist.unshift(postId);
      console.log("history:"+historyslist);
      wx.setStorageSync('historys_list', historyslist);
    
  },

  onColletionTap: function (event) {
    this.getPostsCollectedAsy();
  },

  getPostsCollectedAsy: function () {
    var that = this;
    wx.getStorage({
      key: 'posts_collected',
      success: function (res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];

        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;  

        that.showToast(postsCollected, postCollected)
      },
    })
  },


  showToast: function (postsCollected, postCollected) {
    wx.setStorageSync('posts_collected', postsCollected);

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