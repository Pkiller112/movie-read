var talksInfo = require('../../data/talkInfo.js');
Page({


  onLoad: function (options) {

    // this.data.posts_key = postsData.postList
    this.setData({
      posts_key: talksInfo.postList
    })

  },
  jumpBtn: function (options) {
    var postId = options.currentTarget.dataset.postid;

    wx.navigateTo({
      url: '/pages/talkingmore/talkingmore?id=' + postId
    })
  },
})