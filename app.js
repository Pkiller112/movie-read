//app.js
var moviesInfo = require('data/movieInfo.js');
var talksInfo = require('data/talkInfo.js');
App({
  globalData: {
    moviearray:[],
    talkarray:[],
    moviehistoryarray:[],
    talkhistoryarray:[],
  },
  MovieRefresh:function(options){
    var postlist=moviesInfo.postList
    var array=new Array()
    console.log(postlist)
    var postsCollected = wx.getStorageSync("posts_collected");
    for(var i=0;i<postlist.length;i++){
      if(postsCollected[i]==true)
     array.push(postlist[i]);
    }
    this.globalData.moviearray=array
    console.log(this.globalData.moviearray)
  },
  TalkRefresh:function(options){
    var postlist=talksInfo.postList
    var array=new Array()
    console.log(postlist)
    var postsCollected = wx.getStorageSync("posts_collected2");
    for(var i=0;i<postlist.length;i++){
      if(postsCollected[i]==true)
     array.push(postlist[i]);
    }
    this.globalData.talkarray=array
    console.log(this.globalData.talkarray)
  },
  MovieHistoryRefresh:function(options){
    var postlist=moviesInfo.postList
    var array=new Array()
    console.log(postlist)
    var postsCollected = wx.getStorageSync("historys_list");
    for(var i=0;i<postsCollected.length;i++){
     array.push(postlist[postsCollected[i]]);
    }
    this.globalData.moviehistoryarray=array
    console.log(this.globalData.moviehistoryarray)
  },
  TalkHistoryRefresh:function(options){
    var postlist=talksInfo.postList
    var array=new Array()
    console.log(postlist)
    var postsCollected = wx.getStorageSync("historys_list2");
    for(var i=0;i<postsCollected.length;i++){
      array.push(postlist[postsCollected[i]]);
    }
    this.globalData.talkhistoryarray=array
    console.log(this.globalData.talkhistoryarray)
  },
})