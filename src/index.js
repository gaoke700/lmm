
  var pageIndex = document.getElementById('index');
  var pageRule = document.getElementById('rule');
  var pageQuestion1 = document.getElementById('question1');
  var pageQuestion2 = document.getElementById('question2');
  var pageFail = document.getElementById('fail');
  var pageReward = document.getElementById('reward');
  var pageAgain = document.getElementById('again');
  var pageMessages = document.getElementById('messages');
  var pageShare = document.getElementById('share');
  var bgMusic = document.getElementById('bg-music');
  var btnAudio = document.getElementById('btn-music');

  var yun1 = pageIndex.querySelector('.yun1');
  var yun2 = pageIndex.querySelector('.yun2');
  var yun1Left = 0;
  var yun2Left = parseInt(window.getComputedStyle(yun2).left);
  var btnStart = pageIndex.querySelector('.bottom-btn img');
  var btnRule = pageRule.querySelector('.bottom-btn img');
  var btnQuestion1 = pageQuestion1.querySelector('.bottom-btn img');
  var btnGifPlay = pageQuestion1.querySelector('.btn-play');
  var btnGifImg = pageQuestion1.querySelector('.gif-img');
  var btnQuestion2 = pageQuestion2.querySelector('.bottom-btn img');
  var btnRestart = pageFail.querySelector('.bottom-btn img');
  var btnZhizhen = pageReward.querySelector('.zhizhen');
  var btnAgain = pageAgain.querySelector('.bottom-btn img');
  var btnMessages = pageMessages.querySelector('.bottom-btn img');

  var jiangpinImg = pageMessages.querySelector('.jiangpin img');
  var jiangpinName = pageMessages.querySelector('.jiangpin p');

  var answer1 = '';
  var answer2 = {};
  var currentMaster = 1;
  var reward = '';

  //云朵飘动
  function yunduo() {
    yun1Left++;
    yun1.style.left = -yun1Left+'px';
    yun2.style.left = (yun2Left-yun1Left)+'px';
    if(yun1Left > yun2Left){
      yun1Left = 0;
    }
    requestAnimationFrame(yunduo);
  }

//预加载
  var imgArr = [
    'img/answer1-gif.gif',
    'img/answer1-gif-1.jpg',
    'img/img-index.png',
    'img/bg-messages.png',
    'img/bg-question1.png',
    'img/bg-question2.png',
    'img/bg-rule.png',
    'img/bg-zhuanpan.png',
    'img/1.jpg',
    'img/2.png',
    'img/3.jpg',
    'img/4.jpg',
    'img/wxicon.jpg'
  ];
  var loading = document.querySelector('.loading');
  var loadingPro = loading.querySelector('.top');
  var imgArrLength = imgArr.length;
  var imageKey = 0;

  imgArr.forEach(function (val,key) {
    var oImg = new Image();
    oImg.onload = function(){
      oImg.onload = null;
      loadingPro.style.width = Math.ceil(100*(++imageKey)/imgArrLength)+'%';
      if (imageKey == imgArrLength) {
        document.querySelectorAll('.preload-bg').forEach(function (v) {
          v.style.backgroundImage = 'url('+v.dataset.preload_src+')';
        });
        document.querySelectorAll('.preload-img').forEach(function (v) {
          v.src = v.dataset.preload_src;
        });
        loading.classList.add('none');
        pageIndex.classList.remove('none');
        requestAnimationFrame(yunduo);
        document.addEventListener("WeixinJSBridgeReady", function () {//微信
            bgMusic.play();
        }, false);
      }
    };
    oImg.src = val;
  });

  btnStart.onclick = function () {
    btnAudio.play();
    pageIndex.classList.add('none');
    pageRule.classList.remove('none');
  };
  btnRule.onclick = function () {
    btnAudio.play();
    pageRule.classList.add('none');
    pageQuestion1.classList.remove('none');
  };


//问题一选答案并记录
  pageQuestion1.querySelectorAll('.answer1').forEach(function (val) {
    val.onclick =function () {
        btnAudio.play();
      pageQuestion1.querySelectorAll('.answer1').forEach(function (v) {
        v.classList.remove('active');
      });
      val.classList.add('active');
      answer1 = val.dataset.value;
    }
  });

//问题一点击按钮播放
  btnGifPlay.onclick = function () {
      btnAudio.play();
    var _this = this;
    var src = btnGifImg.src;
    var dataSrc = btnGifImg.dataset.src;
    _this.classList.add('none');
    setTimeout(function () {
      btnGifImg.src = dataSrc;
    },500);
    setTimeout(function () {
      _this.classList.remove('none');
      btnGifImg.src = src;
    },9500);

  };

  btnQuestion1.onclick = function () {
      btnAudio.play();
    if (answer1) {
      pageQuestion1.classList.add('none');
      pageQuestion2.classList.remove('none');
    }

  };

//问题二选和尚
  pageQuestion2.querySelectorAll('.master-small img').forEach(function (val,key) {
    val.onclick =function () {
        btnAudio.play();
      pageQuestion2.querySelectorAll('.bingqi img').forEach(function (v) {
        v.classList.remove('active');
      });
      if (answer2['as'+(key+1)]) {
        pageQuestion2.querySelectorAll('.bingqi img')[answer2['as'+(key+1)]-1].classList.add('active');
      }
      pageQuestion2.querySelectorAll('.master-small img').forEach(function (v) {
        v.classList.remove('active');
      });
      val.classList.add('active');

      pageQuestion2.querySelectorAll('.master-big').forEach(function (v) {
        v.classList.add('none');
      });
      pageQuestion2.querySelectorAll('.master-big')[key].classList.remove('none');

      currentMaster = key+1;
    }
  });

//问题二选兵器
  pageQuestion2.querySelectorAll('.bingqi img').forEach(function (val,key) {
    val.onclick = function () {
        btnAudio.play();
      pageQuestion2.querySelectorAll('.bingqi img').forEach(function (v) {
        v.classList.remove('active');
      });
      val.classList.add('active');

      answer2['as'+currentMaster] = key+1;
    }
  });

  btnQuestion2.onclick = function () {
      btnAudio.play();
    if (answer2.as3 && answer2.as1 && answer2.as2) {
      if ((answer2.as1 === 1) && (answer2.as2  === 2) && (answer2.as3  === 4) && (answer1=='c')) {
        pageQuestion2.classList.add('none');
        pageReward.classList.remove('none');
      } else {
        pageFail.classList.remove('none');
      }
    }
    // else {
    //   alert ('请匹配所有兵器');
    // }
  };

//重新开始
  btnRestart.onclick = function () {
      btnAudio.play();
    pageFail.classList.add('none');
    pageIndex.classList.remove('none');

    //清空之前答案
    pageQuestion1.querySelectorAll('.answer1').forEach(function (v) {
      v.classList.remove('active');
    });
    answer1 = '';
    pageQuestion2.querySelectorAll('.master-small img').forEach(function (v) {
      v.classList.remove('active');
    });
    pageQuestion2.querySelectorAll('.master-small img')[0].classList.add('active');
    pageQuestion2.querySelectorAll('.bingqi img').forEach(function (v) {
      v.classList.remove('active');
    });
    answer2 = {};
    currentMaster = 1;
  };

//抽奖
  var is_click = 1;
  btnZhizhen.onclick = function () {
      btnAudio.play();
    if (!is_click) {
      return false;
    }
    var _this = this;
    var zhongjiang = 1;
    is_click = 0;
    //请求抽奖结果决定停止位置
    $.ajax({
      type: 'post',
      url: 'https://wx.ouu.me/home/getHomeLuckdraw',
      data: {
        openid: open_id
      },
      dataType: 'json',
      success: function(data){
        reward = data.date.yes || '5';
        if (reward == '1') {
          var youxiu = (Math.random()>0.5)? 'youxiu1':'youxiu2';
          _this.classList.add(youxiu);
          jiangpinImg.src = 'img/1.jpg';
          jiangpinName.innerHTML = '昂坪360 精美行李带';
        } else if(reward == '2') {
          _this.classList.add('yideng');
          jiangpinImg.src = 'img/2.png';
          jiangpinName.innerHTML = '昂坪360 化妆品收纳袋';
        } else if(reward == '3') {
          var erdeng = (Math.random()>0.5)? 'erdeng1':'erdeng2';
          _this.classList.add(erdeng);
          jiangpinImg.src = 'img/3.jpg';
          jiangpinName.innerHTML = '昂坪360 缆车小钱包';
        } else if(reward == '4') {
          var sandeng = (Math.random()>0.5)? 'sandeng1':'sandeng2';
          _this.classList.add(sandeng);
          jiangpinImg.src = 'img/4.jpg';
          jiangpinName.innerHTML = '驴妈妈 小驴公仔';
        } else {
          var xiexie = (Math.random()>0.5)? 'xiexie1':'xiexie2';
          _this.classList.add(xiexie);
          zhongjiang = 0
        }

        setTimeout(function () {
          if (zhongjiang) {
            pageReward.classList.add('none');
            pageMessages.classList.remove('none');
          } else {
            pageAgain.classList.remove('none');
          }
        },5200)
      }
    });
  };

//再来一次
  btnAgain.onclick = function () {
      btnAudio.play();
    btnZhizhen.className = 'zhizhen';
    is_click = 1;
    pageAgain.classList.add('none');
    pageReward.classList.remove('none');
  };

  btnMessages.onclick = function () {
      btnAudio.play();
    var user_name = pageMessages.querySelector('input[name=user_name]').value;
    var user_address = pageMessages.querySelector('input[name=user_address]').value;
    var user_phone = pageMessages.querySelector('input[name=user_phone]').value;
    if (user_name && user_address && user_phone) {
      var user_messages = {
        name: user_name,
        address: user_address,
        mobile: user_phone,
        openid :open_id
      };
      $.ajax({
        type: 'post',
        url: 'https://wx.ouu.me/home/saveLuckUser',
        data: user_messages,
        dataType: 'json',
        success: function(data){
          if (data.date = 'yes') {
            pageShare.classList.remove('none');
          }
        }
      });
    }
  };

//微信分享
  $.ajax({
    type: 'post',
    url: 'https://wx.ouu.me/home/console',
    data: {
      url: location.href.split('#')[0]
    },
    dataType: 'json',
    success: function(res){
      wx.config({
        debug: 0,
        appId: res.appId,
        timestamp: res.timestamp,
        nonceStr: res.nonceStr,
        signature: res.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
      });

      wx.ready(function () {
        window.wxData = {//分享给朋友
          title: '昂坪360放大招，你接还是不接？',
          desc: '不接不合适吧！',
          link: 'http://lmm.itbuluo.top/angping',
          imgUrl: 'img/wxicon.jpg',
          type: 'link',
          success: function () {},
          cancel: function () {}
        };

        window.wxDataTiemline = {//分享到朋友圈
          title: '昂坪360放大招，你接还是不接？',
          link: 'http://lmm.itbuluo.top/angping',
          imgUrl: 'img/wxicon.jpg',
          type: 'link',
          success: function () {},
          cancel: function () {}
        };
        wx.onMenuShareAppMessage(wxData);
        wx.onMenuShareTimeline(wxDataTiemline);
      });
    }
  });

//百度统计
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?8eecd872da69f5ac5dd7bb9bdf6349cd";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
