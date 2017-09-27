$(function() {

    var data = {url: location.href.split('#')[0]}
    $.getJSON('http://wx.validation.energytrust.com.cn/index.php/Admin/Wx/ajaxWxqm?jsonpcallback=?', data, function(res) {
        wx.config({
            debug: 0,
            appId: res.appId,
            timestamp: res.timestamp,
            nonceStr: res.wxnonceStr,
            signature: res.wsSha1,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        })

        window.wxData = {//分享给朋友
            title: '挑战银联运动会！',
            desc: '我带着你，你带激情，我们去银联运动会赢大礼吧！',
            link: 'http://unionpay2016sport.energytrust.com.cn/unionsport/runner/index.html',
            imgUrl: 'http://unionpay2016sport.energytrust.com.cn/unionsport/title.jpg',
            type: 'link',
            success: function () {},
            cancel: function () {}
        }

        window.wxDataTiemline = {//分享到朋友圈
            title: '我带着你，你带激情，我们去银联运动会赢大礼吧！',
            link: 'http://unionpay2016sport.energytrust.com.cn/unionsport/runner/index.html',
            imgUrl: 'http://unionpay2016sport.energytrust.com.cn/unionsport/title.jpg',
            type: 'link',
            success: function () {},
            cancel: function () {
            }
        }

        wx.ready(function () {
            wx.onMenuShareAppMessage(wxData);
            wx.onMenuShareTimeline(wxDataTiemline);
        });
    });
});
