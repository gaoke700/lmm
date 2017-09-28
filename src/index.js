
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

//预加载
  var imgArr = [
    'img/answer1-gif.gif',
    'img/answer1-gif-1.jpg',
    'img/bg-index.png',
    'img/bg-messages.png',
    'img/bg-question1.png',
    'img/bg-question2.png',
    'img/bg-rule.png',
    'img/bg-zhuanpan.png',
    'img/master1-big.png',
    'img/master2-big.png',
    'img/master3-big.png',
    'img/1.jpg',
    'img/2.png',
    'img/3.jpg',
    'img/4.jpg'
  ];
  var loading = document.querySelector('.loading');
  var loadingPro = loading.querySelector('.top');
  var imgArrLength = imgArr.length;
  var imageKey = 0;

bgMusic.oncanplaythrough = function () {
  imgArr.forEach(function (val,key) {
    var oImg = new Image();
    oImg.onload = function(){
      oImg.onload = null;
      loadingPro.style.width = (Math.ceil(100*(++imageKey)/imgArrLength)-5)+'%';
      if (imageKey == imgArrLength) {
        document.querySelectorAll('.preload-bg').forEach(function (v) {
          v.style.backgroundImage = 'url('+v.dataset.preload_src+')';
        });
        document.querySelectorAll('.preload-img').forEach(function (v) {
          v.src = v.dataset.preload_src;
        });
        loading.classList.add('none');
        pageIndex.classList.remove('none');
        bgMusic.play();
        // document.addEventListener("WeixinJSBridgeReady", function () {//微信
        //     audio.play();
        // }, false);
      }
    };
    oImg.src = val;
  });
};

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
          imgUrl: 'data:image/jpeg;base64,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',
          type: 'link',
          success: function () {},
          cancel: function () {}
        };

        window.wxDataTiemline = {//分享到朋友圈
          title: '昂坪360放大招，你接还是不接？',
          link: 'http://lmm.itbuluo.top/angping',
          imgUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wgARCAB4AHgDAREAAhEBAxEB/8QAHQAAAQQDAQEAAAAAAAAAAAAAAAQFBgcBAwgCCf/EAB0BAAEEAwEBAAAAAAAAAAAAAAADBAUGAQIHCAn/2gAMAwEAAhADEAAAAPol6A8LgY02Nc5V0AAAAAAAAzgZ2byR518Y1m3HOsM3MJ1j9X8L9KZAAAAAAAbEHO/KT0LrqxO394y9mVz5LvdefWTwB46HWjIAYMZLMqfT2V/CQ2dpbQ0cmMydXTbHPZvxDska4xZGj2V55J1gAAA9xs9e/PPQTU9iOb7/AOfPGu6tZJ41XAzpsIqeHTfOM5MgAAY31ZKl0JqrV2SprTvqnAV6DnGDOTKe18c69GxSap1Y27kOAyBkAaWjlMxl3p9E7XLVc3cgAAOTOYRrMNKzYAADGM0dVup8iayE30U6yd1+0pygAAAAZBc0lJDG2yHzvPgzH0HnJUH1Whn6aVdr0Iw27alOc7t9AAAAHBnKPLGfi01S2xFZq0cVhVO78p8d9ZdA9G5rOkeLWH0nh8ycMQAADIYAG9nIRBrKy6SgdjWRcIyf3rptT2E5YrcoxxD3ol1Dw+pWB5no+5OhVP2phForTUdbkyTi+5iiGQAwAfD7mV4tPlFjnVRUjc27isutZkxG2U+hqLVUlNytKt/b+17n515hgnUZjpfpa4wHRiLH5h+Meqa3ivhZVGim1WZ/ZjFKfunNYtaxQtzYsti0rC3QKPo8e1qyurRx2fHt+xPGHYgDY2mZojrnY0b5SK6tUC/gE0zrica4zqnsWuiW0xtp2pyOvYc48rY1rIaXuFauitdNrUZsUk2Sv8NkozTyzZO4PC2sy22//8QALhAAAAUFAAEBBgYDAAAAAAAAAAIDBAUBBgcSEwgRFBUWFyExEBgiNUFRIyQy/9oACAEBAAEIAdTDUw1N9hoan0rrUamGphqYamGphqYamGphRM5q60i/9s60vTiKp0oI62FZp0nJQ7yLWbOjvX9E/X78RxHEcRxHEcRxEtRSjX2Ns49ji2JlRyDNeTRQXbsY9Jug0SRanpQ25TG7cioG5DkOQ5DmLdxkvLMCyEncliykAoY6NEw0To8kV5Ac6v5X0GlQRZ2ikZJGMnl4TnDqOH6rg5m1KddNDaVGlRpUaVFuSpIKWJJKxV3wkiw9uPJZDgEWZqsZJZy0Z6tFqUhItNrGsWBI9mRklxKORQROhK0MU5OhzHPzIORf44lHEo4lHEo4Er9azkieIQTWRVkt5lY5CyT5V6xkVeJaVGhxzONDgif66dI2FtV2zIoxvG149JI8sz5mFEz1HI40ONDiWVcpJEYsnrYjdojbsYgkWiJSN+R/rQaDQaDQR0pJRW3u90su+cVdvNBoNBoNS0pWpsp3Q7tqwH17NWfkPm/cz1dvmrNJESrzWJ5N5M2G1rKcqDlQcqDlQcqDmI+JdSi/FrI2U6apdWPOn3HISRKSzz4fJ5IXVSWkULTdR8vacZ+2q3nFtlFfdnjXeurhW1GTZQrtsm7Q5nHM45nHM45nEc/fxh92jm6phclSJczCUenj0KcaIuI4pYCNzRZ1mJ2PWVm/k8m5ybGrwMNiKwzzq7h7hSxYi1oJ07Y2QsesSpEueY0Gn9aDQcxoJCQj4pLs/Zyfdz7alHRRI9I20hGt5NgtHOzfr9ehHTpNLgmxYJR7MjJGX8ocGW5kEpG7vzRxUzlDKtrby7jy7mJHtuX1mB9bsbWRhYTMcA4VUb3InRJVOiyPKgfOmcY39peXjfsJbjf4guy0cw4kfvG0VBcqDlQcqDlQcqCCwMqclD3PaVtWxba1WDddyRsmZ66lWZ3UO6o+I6p6nbPLAytdVgLFaQVyeYM1bTtmweuvJyYdzHvd6/yVPZ0gjEaQlkZMmWcfNRWSczWJiCNJW94fzqgFkfW41vOBu2cOXUbhvyXx7l/nEk5/2Fm6DopSLpsWSKpVyTP7ccQlvP7nPRFtEYVhmcY7O+seFeWXAqQ90XrhbHVzF9tgD2fmDEjxadtQ+ds1uiGSVdnXfvVpJ9UlSg//AGYGJQ1PrhvzJvGyuUBkn5K2KPkrYo+StihHDWOU/wBT0tm26ROiaXwdABeybcWJqp8BWqCWTHlN6kuzBmMbqrU05TxRxePyqYtFfEzEpq7V/KRiYflKxH+GxS/foT19KrG/x1pRJY6H1KlLpGTPRRq4M6Qqsu9lmSXqRD2qTkqmRbe55b7hTZE1U1KmNUGr/H4RFnu3fovJ/wD/xABHEAACAAQDAwYJBwoHAQAAAAABAgADBBEFEiExQVETIjJhcYEGEBQzQlKRktIjYnKhscHRBxUgQ1NzgpPh8CQ0Y2SDosLD/9oACAEBAAk/ARAgQpECBAgQIECBAhdTBzLPbJT/ALpNAR9Jsx9kND2O68UwkU4ys3lPQ5QbQu8reF5SWzlpnJbj+ENrvAhoaGhoaGhoaJlp1W/Iy+oHpN3Lf6ousmRLARALn1VUcTsELAYy2lkz1Eu4Vbat1aRbk1QBLcN0DS50MX5MebFtCOPXCwsLCwp9kVb0wmC8uUsvnW+dfZ2RKeqpQubyhE6P0hCmFuki9PTf/RvaAvYsD5Cga5+fUW09wG/0m6vFUTFVukiN0otV2CgcmbGWx/V8DA5K5IYnjwhjYehfZ+jR8uFUjLfUX3iKuXII85KnTAGWJ5qZpFkRUIHfeLeUTnEqm6nO/sUXb+GJedlyyKKWfTc7CfrY98TC+Qc6Y22Yx1LHtNzF4vG43EXuxufFeLxeLxeFigmT+UmZLJujC5sw0dK3k7BrqxNr26zbL3ERg8xuVQy0TX5C55zdpAHd2xeBAgQDlzDPbbbfFDTTZQPNbJfXridLpyiayAotMP4wIECBAiZkqqtuTp29T1pn8K69toLSGeXaTkXMZcpdGbtsbA+s0S7IoCovADQDWBBgwYMVZQN0lsCO2JxmTD6TQYMGDDgAbWJtbrioenqKrLJwxtjSpAOe/a5sewgRimEcq6gO35ildEXsv1xjNBJE8fI0snApXLz78B6I+cfZDzDV0jGRVcq+Z+K5jvNjbuhYWFhYWFiRv58w7E7YmeUeutrHuhYWB8kFD4iwb0PRldr7/mjrENIkSKasbV5oQTStjqToNT9QjEKKbVpq9fVz15KR+7T0j1n2RjcoTZvnq+ZOHLzOw+iPrgyqmnqKtczI9+SJBP8AfVDXSbLDoeoi/wClNsCQXQ7GhZUoEbV1I8UkTqic2SlkX84/3KBqTuEVReuqLzqmsK9C/SnHr3IvUNymPA6kxCkwxCZqzacTHlr+2W+19tzwJj8m2HVGE5KScyPT3p/J3QOxnLuJVu29tsfkPwfyFs6tnwUcjJ25Cpt2cY8F5GGzKirKtJWUARk5pbTj9kc2fh9Q0manAXup7/EYMHxGDFWssEHLmOrWFzbjpDyKjFakGXS0gnArSStCcxHcz21Jso2CJ7Tp01s9TUONZr8eobgNw0gXlzlytp+MKjFrZzkGttn97onsEGxAdB3QWKyxtbaSSSSe+PD2XPkVZenxSdTSHeVSTZex2IGoY83MM0eEzVVI9dyCU5oHWYE/bbOh9fVGNPUmYrMkjyZ0mWBseawHdxEYVSzhLXPNFROPR5VJQ6O/Mx92AuHGW+Vqjlc0kHgx9DviaHRhdXU3DDjBiaVBYKoC3Z2OxVA6THgInJJlLVeSyg9OZ8qiZgb58nnZpA6K6LsvtJxebUVNXVCUk98OdMzvt1ZQB2DQC0GDBgwYxwSv9tQLmt2ufuEYHTycQUefmDO89PXRm+u2oipMtU1aaSdPv+8wrSjUso5Jj5lfR/i9I9fZE0JPQ/LK76MfWF+kDtBjGqZ6R2t5BXzb04Y7+Mvu0jwCo6h1k3xN6PFg65t2S3Q12h4wSo5Vqk8usnEco5A+gnqEi17beJjCcMpZOAVY8mweazKZyPLOR/kxYtdGXKLCPzZS8r5LMlU7JUJMTO+i+btzduXZv1jHxNxB5N5eH0aZqipbiE9AHi1hHgFXSJprSAlDPSYqUu5iWteZxUadceDmIuTLZpFJWvLMsTb6ISuoW2uYeyJ/5pxwrz8HrXF3P+i+yaP+3V4wOY+aW5lK5lN6yg74ks8yWxMubOfMRfqOw/ZHrL9sYRMqZaAjl1IXID6JdgebxAis5XEjSsMOy5hTyZpG1htbTYdgO4xNw6tkz2R5UqnUTzTkKQVZm6V9IpZ2CVzteYaXnSD/AMZ/82iuqEBlZHxLBWzHJe/OQjMuo4Htj8reOOp6SmrG32aGKqbPqah89RUT5hd5rcWJ1Pi4xuIKkHUHcRwMLOx7ChZVrb/42mXt/Xjt53WYxzFvdX4Yx3FfdX4Yx3FfdX4YrMQqVuOZPAy37l1iqq1QDmKkoBR2aRW1v8v+kV9cADuT+kYnX+4PwiprAdxFvwinmy6m3+bpiJU3vIXnd948L8Z9+X8EeF+Ne/L+CPC3Gffl/BHhrjf8yV8EeG2Oe/K+Dxb9g4xdSdmYRxiaR1bYW0zLzPVJhZcsC1raZoczWHq7PbCFtLmXKjDZ1vowjKwNirC1v0GaRK3S/Tb4ftj/xAAlEAEBAAICAwABAwUAAAAAAAABEQAhMUFRYXGBECDwkaHB0fH/2gAIAQEAAT8Q93PdwfRqoHtuLlwKInCMieb+i93Pdz3c93Pdz3c93PdwipQA85v/AFSaEbHGCjzwmBTqEX+dZPeKtS04s7lTsNcamaagi6R2NuxUu9VylB7hIf6PGR55HnkeeR55HnkeeR55HngGQHTiLPlDeuHCW7c0BAuxidqe8+ucSKOEOHcqP9nAIB7xkmDxFC8DtxSIPRqtFdoHfubufXPrn1z64dR1QASr0e30ZtG6ser2nkihy5XjFEmxB4e6CTxvB8x6HEYKgN2NPrZKcqPOaW0IxiaPZUkgW/od/EnQfhDnWo4sAZv0jZYlgiTh4xnBVYonwYc835uYWSpxWM68HjX7VUkum8eObVJN9Lxjm1KEi6S7oWl5xbYUoXtAh578GEle/oU/iBmIEPODlEhBq+Ci3UF3gohFSsPtnS8WcBnowFuYHhEtvY2/1MBkmreVVydq6Lzg5aHpz0Y9GPRj0YqqU4XE4I7XLt0t6DtxCTi0XhElsF1BtyVq/IU+PZgWAU5WKhOWfzuDO5z+dxSJ2ExfA8y/nKCxEHHk1XyOXsFOXQQ6RrWnPa/qYpkhc/zufzuVoHzEysWyw9j3jMwFFR4Y6Dm23Hz30fzAUAK7eXNqMTkesnE4nE42J2o0+jwwlMluMZaPBOD0ZOJxOJxIZFKBOU9AFXoyJsuNjoeDMYxQHf4EXNoFKHbn+/xIG7wXsWaKhdyPM28lbd/3W22Lc1mSAGpu9vujbhvQ8pM87b8Tn7gxGIiZG3K+EbpmyF2EfI5qoeiLdBIHVjHOtKNkXk8ZO+MKCc68vIiremjlDWKep1tHI80VvZcCUtRFmXwxKdOs+WfLPlnyz5YrIGYZ+fGtUjk1itnxK8/jWBiEwF4i/qXb0D1h7QXrqH88IaEl/i5GK2NraKiEAKNcQkzKAolRYkRihw56gAioswR6Kd4nNkdNoqMERug4SfnnoY8MK60cATIrcfHH/ZjqzA+3I+sPPF+uwO+ArtCww4nYxYPAqK2gJhboOSaUGgADoAdroSmy92yh2GkR4RHIvMKkzlw2BoOBohgcfRn/ABPf3GnhBxcK4VSrMoGfg6RUSIl9bwEO+GwRy4qLUJhHgxTqKwVFOthTBf6UgUBQMmCystjhR8EqqcJvkwhIxaGwJpJwjM9rGLmHNIKVGgFcLBY0L0K1hZFoYuDnwXySGkYgABnvZ7We1ntZ7WDZoEa9QyfbFrPSBnVL4JTkmGoaNPoJsvAF4AcuVlFkyw0bMt1LcQbwTOkyh2C6YxpjpzKQjAjyxbFImNBg8KI5qQLtRAcY7Nw2wqGsAk2pMLERx7dnTQJqNWiArWCEnpUCCIidnB/0GDAJ3a3YTvHrZ+oG+ZsADtMWZTZAH3HKqNBYRuWjly6d4YQHJwRTkeT3+mkPC6eG4joUHhZiUErd0iI3NF6ENuk8K8VofoGDdCXmRyz71RwiQaROAoGHUHWRfwiAOy8OKVwMF+1gvKqMeja+eIwEE4HjDmNQhPLRR5pEcXYZIRd2pfKzghh1Snk/TQ0tdQE7Q0HYiI7HEJb+fsUB8M8f2aGbNVQlDWTpQPwWesK7YHHwCQ+Gf8/kdRCjkO3AwVr2X+WIOsh7+C+DWeT+8UlwLW88oX7OWKh81BQX0H++sNHY0hfQ9uEhdN/nLRlLIV7i8eXBZk9VPCfGvxchQEndcsXR8yuDRF/fwfxcWXiB6s5Wv9fxjFZJ5mL452/3x06ZCXsc0q/gxFfDD/gG3CFlEJP/AA9v4Z//xAArEQABBAEEAQMDBAMAAAAAAAABAgMEBQAGERITBxUhMRAUIiAwQVEWIzL/2gAIAQIBAQgA+i3ENIK1NOtPNJcR+yVJCdzFBcWt1WJAVvlrrxGmYT9ReaR8z1uqNNMaR0i02Gmkp/ZeP4hIWtDDO6u0Ze1um5cyJJsZb0qVavPSfuH4b4kR9J0+jWb6faQg7/faM7Rgd/vtSBlnqtEWQWo1XqKHYJ2X2jG19r5cKl98j23GSKqomyUSJNvoljV/fqBjSvheHo6vZ1s/Co9NN2CraHuM3GbjNxlpDNjDLCJdROiP9WRdNWTroDsp3ijYEpjMcUsAIQB9Xm0PtKbXBiRq+G1Ej/xv+oKKc1LqGVRpb6l60m/euJxGs7ZX27h3OdpztOdpwuEpO0idbtPKQ9RW0orEdztOdpztOdpztOPu+3ATAtCG+qM+y80C2Hc5ozmjOaM5oyTEhTdu5hLEZrra5ozmjOaM5owuoA3y5lOdjLTYfk7742txHJI09NeX3R3/ANUuYxDb5ORb1lxez/0cJWvgEwpNlaLcZ9Gssap7JGPQpFbbofdQ6Vp3HM5zOcznM5zOSorMtP8AsZp4rZ3XzOLeKBnwnYaltrjS7S7OtY8teSLrWa6+rOtvIzxW2PF7GthUBzVrCthtnLOWcs5ZuM5ZyyTPiwwC+3ZQn3uttA45PiNT4xacb03VMuLcb9DgK+YMVuCx1J1C1rsNOCmqovlaK9tMsNf0FUjjIY8nzJ8vrZpvIkOYsNzUPBaQpPM4XSMlLjrcSl1oxYbYOc1ZzOcznNWc1Zf+cIxQpim1NqXUeoU98llpS1htqMsRJ6G0SYpjEbUN/cU6+EabMu75ag9DgzoCB9pF1PW1cBcu/Or9LvQEOx4MWVLTxRqTSWtZ8njWV+lNc1slPa+w7HP5bj6V8kRJSHF+puISUM1qQl8ARrlFWSHKvUMYWbRl6qsqeaWDAgaps4YCHK/UdTYgt4JEj5yr11aQQG5lXe1FxsIzn/avo9XJPu16a5nprmCqeOemSkn8FU73Mkijkn4RRSwfb0SdnousnBlejyXXbBoWfks/HqHkskDI2rvOMdkIQnX3mYnYf515pxLX4+7aAtYBEc/KWU8j7JZ5JxmOC4At5lsbcGYa1nGYjSMQ2f5Ygrd2JajMtH8EIKjiUBOBXA+3/8QAPBEAAgEDAgEIBgcIAwAAAAAAAQIRAAMhEjFBBBAiMlFhcYEFEyBCkZIjMFKhwdHwFGJyk7HS0+FDgvH/2gAIAQIBCT8A5jAAknsA3NMCrAEEHBByCD2EZH1fE48B+p8+bbj2x+Hcau/tHKDrRfUgBxaYEI11m6C3SpnSoPAsKvNyX0igt2rR5bpYvaQ6Xa1ctgpcvpbBKI4UMy0SQAACxlmgbk8Sdz3/AFO5/Xx7K2FCoW6jqLR16C7zK28Ea1Zt1IIok3Gdy5O+osZnwOPKmK3UfUhBIIdXlCCMzqAiir+kHZRyn6U3GtXGRWa2ELEWlPW0qqySSeYUOYUgeMFicT3R/WaIR9tJOD4H8DmaFDAkD8a6q/eTzWEZ06rMoJWDMqT1YOZEGg3IpZ2PrAWS5bX/AJgq9O3rAJKkHV1oE5J9MIjJdt2rClECF5/aG19O76odMWlUEkbNXJbS37ok3URVe4rZl3ADPO/Sn2X0kkHuMcDHD8aQtOxUEg+HnihoXiZH3RxrdsCt9vYyGBB8CIP3Uum3aVUUdiqAFHkAPbNWg2o5JmPARxrkwBVeiDOD+9jbu3765ODqMHDZzHR7I888woUKiYMePD76uMG4iSPh3dkUpcE9aSSv+uO+OYUKFCgJJ/RpZKsCY3iCDE777b1kDG0EHjg7UPZWSNjkHw8KED9b9vtOVZmkkYMDh57d8Vcb4/6q4wBMnPE7mmLMjSCd9J/L2zngOJ8KXT2HcefZ48+3GlZ9CgQBMd/dNWH8NJmrDfKfypChdSpBEFgPezwGBj2xkDB7KJP3Dm3Ncd/yq81s6YfQQCQucA4wJPbivS99/VC0zpgKiOFJLdATIYTGZNcuvISGAY6YWZAMaPdMGOMV6Quct5YrONdxy+lWboohaCFCgOQR1nP1LhZmJMbCTVxWc8AZ7/uFb1tIPA7eOKTS7xqYQGaMDUwAJC+6CYHACgfmNZEzJ3JNcliApDuVlyd1toTuoyxeNoAMVaS4FXU0lF79AZcC5wgjSDu1XPpYk21h3B+y2klQRxlq5OqITALMSZALEdEQMDaTS+qY7GZTzMAr5476Mg86ajmMTwz5cKtwAYkKJyY/97va5IXnHrLp0gd6ouZ/iIrlTPZY9Vegi/usqwD3FpmlknYDv8Nh2k4G5pgwt7kZDMesQeI4A8RtvXSQ5UwYIrpKfcbC+R93yx3Vy8os9FLcKvgWBlz5md4FcqZIGDJOZ4gmCPHbhV1h6tevbQQZknUGYBcDBmDVnlV03iiKotICPWHSHc+sgW16zsJIWCoNCYgEnCg+Ncvt2bOke6dZuTkFoOlIyrLmcEV6QS6gaGDKeku5YGAQ3ADbiaEr2/n2c8lAekoOksOKzkZ7waGgamMiASrYCtAgwOMZnNDEU0qQejJ3IjUI3IGADiKX6EHpQBO2DBxE7g/GidQBLGVxI6p0YlTx2I2qLij7WCPBh+M02hmwUuAQe6TKsPHenPx+EfhFILyjiIRwO73T5576ujUR1G6LjyOCO8Gu3mMHs4H8qdP5i06fzFp0/mLVxQT2XF/Qp1k79NaZT/3WivzrWn51qzaI/jT+6raFPss6lfgWx5VyOz84/vrkdmf4x/fXJrbDgSykjwJea9E8n+dv8teiOT/Of8tGtuNZH635t6Jih/T48wzzEAUM8+TX/8QAKxEAAAYBBAEEAgEFAAAAAAAAAAECAwQFBgcREhMhFBUiMRAgIxYwMjNB/9oACAEDAQEIAPwktzIiNK0LNC/7O4k/xoQwOtANJJ22psEkZRPYtqXJdNZ9DePZBkO6XVmZ9aB1oHWgdaB1oHWgdaB1oENlnu7HG2TkvEQ60Cpn5DFgyo1dVRocOqYZivssPsqaftrC/dq40CV1oHWgdaB1oHWR+E45pa/bQUy5+S4Da486a2uCPsLbJmOlsEgo7JGXAMWVrCjLYj0ebTMP6KJ2/wBS5mTTl4005Pulwk18jgOA4DgMYt0Y9cJnLqMxo7Os9Yqz1IxyNDNcWNHJa91obOS+pxx4zeWaz6h1BlBsOJW3KU7MkuSHeskgmyMdQ6h1DqBsEYwDCYWXPSEy4uk9Uuua3PSvGUNy2kpb3TuOBjiY4GEERLSblVS4hKhIXCzjE6xthdjHJJmnccDHExwMcDERJoc7TpVoX6j1c6FMiSVNySIz+utQ61DrUOtQqry5pCUUKZImWUs5MnrUOtQ61DrUOtYwKmhrOXJlnS0nEmwdTT/E3NRqmMy/FsYX7U9LYXcnqjWuns+Gz2QiPf8ADBHGa7zqX0VOIx4xe4kjwh2a85/hNUifhT8ZxbS2Vmhf61dzZU7nONLzu7kpUhsi2DDPYvzsh0+9ehkeqyq1TRW39AaOIxCU3Km6f6eIq224+uUihrH26ilmsp7OwuBDgQ4EOBDgQ4EOBCDUWNosyhycet4UY3JDq+4yFBczcbs0T4beoOVt7cTz3KFucjvbmZkViqbLrItVIYSiU7W43JZLqZx6e85sULD4y1bOTcTktp5xlIWg+J7GGI7j6+CKqumk04cSdUXlm4oi2MbGNjHExxMQMfW0tLjqIMSC0XQj5nsTf8TmxLbNpfiXTxrPw45AZo9lr93jPRyIYRjM/Ln3oFVN0qzGimLXIfQ0b63BCkUraN5CyopMcjQ7CWR/DY0nsYYUhDyTWuSe2zbP/QiYhktnYcplyYhDlo3DirJuM7XRll8G02das3I52tqsjI3oKF+UPR3WfuN/oR+HWG3k+fQYcPb8NHt+GhMHDy+vQYTuY9uwkegwsHDwlP36DTUO1Olqz8+yaZD2XS4wdJpcDo9Li8n7PpYOQ3MKM+Px5GDLf7NBcyDikLX8FuoI/BEt3wg217bm4552BnuN/jt+Etj/xABAEQACAQIEAwQFCQYGAwAAAAABAhEAIQMSMUEiUWEEE3GBBRAgMpFCYoKSobHR0uIjMFJy0/AVM0ODssHh4/H/2gAIAQMBCT8A9WpgeZsPjQIYEgg2IIMEEcwf3ewk/wAzaj6IgfH1a7ToTy69RyrBHZ+zjI7DFkocVTLJhKvG2EGHvMyzcIawh2jsbs2LiDs0iHbiVXRuNcJn99kZiAajMTJAsBN4A2A0HQfuRwpxHlb3R9JoA86uzGST8ST0FyelCsxwnRjiDJnCJGVsS44GVSYYETyMUAMJEUJGmUAR9lAMjLlYHQqVhgekTNAr2RAe4/ZhFxEViFxCwH7RgBAJJgCQBJJFChQoSeQkk+ArFbBD3VAozZdixYcJOuWLDU0rY2BlnvALrzDqDNtcwtGserVuJumyL5Di8xVmcHxCzr9Ii3QH1Y7oj+8isQGkRBA1kWvao7YQqKMhCth4jf6JYnJiZSQFIIj3TQ/w/OGw8TExCGctEDCXKSmH3h4S7McoNY7nCSwwixZEK2hVNhliBEaezhd4qhhGhExxLO408Cb1irhx7yuyhk6G++oiZmsTvnIsoBF/nFgABz3r3FlmjkLwPE8I8aNiSzHpyH/EeVCJ22A2A8BajRowVIYeIMj7abM7szMTuWJJ+JJo0aNGjRr7qxmRcMCAsSSwJzGfkjSBvrXbW4242AXK4EgKvKDuSb121hkhrsnBCkgPFyJkiYo+xIWRMa5Z4o6xMdawcJ0GjABjI5kyZ5hr8xTLhMq3QAAOZ2GzRawg7+0SqqLkEgnkttZO3KTWIFV1KqWJ7vvCysoMe6OG5AtQ4mhicwYODcMGBIZTqD7WJlVjJEAgnnBBv1HnTFsQ7mNBoBFgB09rDXEw8FQIYSpxW6GRKiwOxJIrs2GYM+6dTrF67KkqoVeHYaCJi1YSrh46QQgAUYi66WEg/Ee2tgRmY+6oPPrawF6fvuakBT4rsfDX1i59ze43jpt18KXix2bEZgbakBT1FvChJ3nT/wCUcs8v+qH+Q64iNNhJgp4ma1HtPAJBZbENGx3HiINBcMERIBLDqCbT5W9RhRqen4mhCLZQOnyQftJN6RXDYgfDD2UnE4QDvlzwI0vXo7CTtGbFQHKRi96jFR3ZmCoZf5csyKw8PvxlNml3j3wyzpExpFqwUwsJiHbuxlDZR8rmcxj6NXVhI/DnI3n9xgtiZYnKJyyYE+JrAdMBYLOVjMSSB4SZA6XtNCANANAPx5mozrIgzBBHzSDIMEEHUVjARMWNpMmJO+51O9YqzzyCfjQAcgCFnKABYCZPUydaxBIJMAEQPnHWD0vTlWNgRJ10JB2HQ1GX+I2XxG56b1jMfACmzgbaN5DfyvQv6h+FYpQKFLnMVzSYULzvfwv0GLYgkoXJXhBMDUE2kdTE+wKFYkEagbjlJ+2lhL9YvzPWr0ZjlpJ1j7q02ilhtmFviND99YCuIhnzZgeVohOZBnpWAsHXTTpaZI306U6YbBldu9YgBIyg5gDZWa9t5Ndp7OFwGcsyYhYRhDMSBEkOJC8zINcKliQN4JMeFufQwawWZp5yuXmBu3MaVgFDEiD9/MVf+9vw18fXOWb5SAY6TafG1Wgkg7wdFI0tzG/qusGwgGdrwTA/h0p1RWMFiCQoPymAuQNSBflXal7QJPGqMluoeTxa9NxQyHpp8KZkzCCVMEjWD03rHYgjKQTsdR4VY0K5eoX5zf8A8jofKK7YfrfortbfW/RXa2+t+iu2MPMfkrth63H5K7Y31h+Su2t9YfkrtrfWH5K9IN8f0V6QIP8AfzK9Jt/f+3XpNvs/pV6UYef/AK69KsPMf069LH4j+n7B9QtSBRyEn76AoSelC1bexEV//9k=',
          type: 'link',
          success: function () {},
          cancel: function () {}
        };
        wx.onMenuShareAppMessage(wxData);
        wx.onMenuShareTimeline(wxDataTiemline);
      });
    }
  });


