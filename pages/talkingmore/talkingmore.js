// pages/talkingmore/talkingmore.js
var talksInfo = require('../../data/talkInfo.js');
Page({
  data: {
    collected: false,
  },

  onLoad: function (options) {
    var postId = options.id;
    this.data.currentPostId = postId;
    var talkInfo= talksInfo.postList[postId];
    this.setData({
      talkInfo: talkInfo
  })
  var postsCollected = wx.getStorageSync("posts_collected2");
  if (postsCollected) {
    var postCollected = postsCollected[postId] //由模拟形式决定
    this.setData({
      collected: postCollected
    })

  } else {
    var postsCollected = {};
    postsCollected[postId] = false;
    wx.setStorageSync("posts_collected2", postsCollected)
  }
 },
 onColletionTap: function (event) {
  // this.getPostsCollectedSyc();//同步收藏存储
  this.getPostsCollectedAsy();//异步收藏测试
},

getPostsCollectedAsy: function () {
  var that = this;
  wx.getStorage({
    key: 'posts_collected2',
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
  //更新文章是否的缓存值
  wx.setStorageSync('posts_collected2', postsCollected);

  //更新数据绑定变量，从而实现切换图片
  this.setData({
    collected: postCollected
  })

  wx.showToast({
    title: postCollected ? '收藏成功' : '取消成功',
    duration: 800,
    icon: "success"
  })
  // wx.removeStorageSync("key") //清除key值缓存
  // wx.clearStorageSync();//清除所有缓存
},

})