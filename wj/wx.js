/**
 * 微信授权
 */
const wxverify = {
    mounted () {
        if ($store.state.browser == 'wx') {
			//需要调用时执行这个方法。
            var url = 'http://h5.ouu.me/shgz/' //用户要分享的网址
            var title = '神垕古镇' //分享的标题
            var shareimg = 'http://dl.cdn.ouu.me/h5/shgz/static/img/icon.png' //分享的图片
            var desc = '“神垕古镇”之名历史上曾被四次皇封。因至今仍盛产各种陶瓷，“神垕古镇”被誉为全国唯一“活着的古镇”。' //分享的描述信息
            console.log('this.$route.path', this.$route.path)
            if (this.$route.path === '/twelve') {
                url = 'http://h5.ouu.me/shgz' + this.$route.fullPath
                let ikey = ['比尔·盖茨', '沃伦·巴菲特', '马克·扎克伯格', '王健林', '马云', '王卫', '李嘉诚', '李兆基', '马化腾', '丁磊', '姚振华']
                // title = title + '黄金万两'
                title = '刚刚在神垕，我居然“烧”出了人生的第一个百万！！！财富值已超越' + ikey[parseInt(11 * Math.random())]
            }
            this.wxAjax(url, title, shareimg, desc)
        }
		//判断跳转授权
        this.verifyOpenId()
    },
    methods: {
        verifyOpenId () {
            if (this.$route.query.openid === undefined && $store.state.browser === 'wx' && !$store.state.isendDate) {
                // window.location.href = $store.state.host + $store.state.query
            }
            const userinfo = {
                openid: this.$route.query.openid,
                nickname: this.$route.query.nickname,
                headimg: this.$route.query.headimg
            }
            localStorage.userinfo = JSON.stringify(userinfo)
            $store.commit('USERINFO', userinfo)
        },
        wxAjax (url, title, shareimg, desc) {
            $.ajax({
                url: 'https://wx.ouu.me/home/console',
                type: 'POST',
                dataType: 'json',
                data: {
                    url: window.location.href
                }
            }).done((data) => {
                $store.commit('wxConfig', window.location.href)
			// wx.config(data)
                wx.config({
                    debug: data.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appId, // 必填，公众号的唯一标识
                    timestamp: _.toString(data.timestamp), // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature, // 必填，签名，见附录1
                    jsApiList: data.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                })
                wx.ready(function () {
				// 在这里调用 API
                    wx.onMenuShareTimeline({ //例如分享到朋友圈的API
                        title: title, // 分享标题
                        link: url, // 分享链接
                        imgUrl: shareimg, // 分享图标
                        success: function () {},
                        cancel: function () {
						// 用户取消分享后执行的回调函数
                        }
                    })
                    wx.onMenuShareAppMessage({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: shareimg, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {},
                        cancel: function () {
						// 用户取消分享后执行的回调函数
                        }
                    })
                    wx.error(function (res) {
                        console.log(res.errMsg) //打印错误消息。及把 debug:false,设置为debug:ture就可以直接在网页上看到弹出的错误提示
                    })
                })
                console.log('success', data)
            }).fail((error) => {
                console.log('error', error)
            }).always((complete) => {
                console.log('complete', complete)
            })
        }
    }
}
export {wxverify}
https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f0f6487c8c7f3a…etUserInfo%3Fpid%3Dangping360&response_type=code&scope=snsapi_base&state=1

