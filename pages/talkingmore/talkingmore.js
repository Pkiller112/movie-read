// pages/talkingmore/talkingmore.js
var talksInfo = require('../../data/talkInfo.js');
Page({
  data: {
    collected: false,
    history:[]
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
    var postCollected = postsCollected[postId] 
    this.setData({
      collected: postCollected
    })

  } else {
    var postsCollected = {};
    postsCollected[postId] = false;
    wx.setStorageSync("posts_collected2", postsCollected)
  }
      // 历史
      var historyslist = wx.getStorageSync("historys_list2");
      if(!historyslist){
        var history=this.data.history;
        wx.setStorageSync('historys_list2', history);
      }
        for(var i=0;i<historyslist.length;i++){
          if(historyslist[i]==postId)
          historyslist.splice(i,1);
        }
        historyslist.unshift(postId);
        console.log("history:"+historyslist);
        wx.setStorageSync('historys_list2', historyslist);
 },
 onColletionTap: function (event) {
  this.getPostsCollectedAsy();
},

getPostsCollectedAsy: function () {
  var that = this;
  wx.getStorage({
    key: 'posts_collected2',
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
  wx.setStorageSync('posts_collected2', postsCollected);

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