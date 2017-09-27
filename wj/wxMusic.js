/* 
* @Author: Marte
* @Date:   2017-07-07 23:47:36
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-14 17:13:50
*/

$(document).ready(function(){


function audioAutoPlay(id){
    var audio = document.getElementById(id),
        play = function(){
        audio.play();
        document.removeEventListener("touchstart",play, false);
    };
    audio.play();
    document.addEventListener("WeixinJSBridgeReady", function () {//微信
       play();
    }, false);
    document.addEventListener("YixinJSBridgeReady", function() {//易信
              play();
        }, false);
    document.addEventListener("touchstart",play, false);
}


    var ico_timer;
    var ico_num = 0;

    function ico_ani(){
        ico_timer = setInterval(function(){
            if (ico_num >=20) {
                ico_num =0;
            }else{
                ico_num++;
                $('.ico').css('marginLeft', (-20)-ico_num);
            }
        },60)
    }

    var num = 0;
    //自动播放
    var timer;
    var loading_img = new Image();
    loading_img.src = "imgs/loading.gif"
    loading_img.onload = function(){
        for (var i = 0; i < loading_src.length; i++) {
            var Oimg = new Image();
            Oimg.src = loading_src[i];

            Oimg.onload = function(){
                num++;

                // console.log(Math.floor(num/loading_src.length*100))
                // loading_srcp.innerHTML = "已经加载"+Math.floor(num/loading_src.length*100)+"%";
                if (num == loading_src.length) {

                    $('.loading').fadeOut();
                    $('.sceneone').fadeIn(function(){
                        $('.one_text').width($('body').width())
                        $('.one_text').height($('body').height())

                        audioAutoPlay("media");

                        $('.test1').animate({opacity: 1}, 2000,function(){
                            $('.test2').animate({opacity: 1}, 2000,function(){
                                $('.test3').animate({opacity: 1}, 2000,function(){
                                    $('.ico').css('opacity', 1);
                                    ico_ani();
                                    fn();
                                })
                            })
                        })
                    });

                };
            }
        };

    }

    function fn(){
        //scroll移动距离
        var scroll_num=0;
        //点击和移动控制定时器按钮
        var scroll_btn=true;
        var imgs_wid1 = 0;
        $(".one .div_box").each(function(index, el) {
            imgs_wid1 += $(this).width();
            // console.log(imgs_wid1,$(this).width())
        });
        $(".one").width(imgs_wid1+1)
        $(".container").width($(".one").width()+$(".two").width()+2)



        function getOffsetSum(ele){
          var top= 0,left=0;
          while(ele){
            top+=ele.offsetTop;
            left+=ele.offsetLeft;
            ele=ele.offsetParent;
          }
          return {
            top:top,
            left:left
          }
        }

        function scroll_tranlate(){
            timer = setInterval(function(){
                if (scroll_btn) {
                    // console.log($('.box').scrollLeft())
                    scroll_num++;
                    $('.box').scrollLeft($('.box').scrollLeft()+1)
                    // console.log(scroll_num,$('.box').scrollLeft());
                    // timer = requestFrame(scroll_tranlate)
                };

            },30)
            // console.log($('.box').scrollLeft())
        }

        var girl_timer;
        var girl_num = 1;
        function girl(obj){
            obj.attr('src', 'imgs/gril/walking(1).png');
            girl_timer = setInterval(function(){
                obj.attr('src', 'imgs/gril/walking('+girl_num+').png');
                if (girl_num==60) {
                    girl_num=1;
                }else{
                    girl_num++;
                }

            },60)
        }

        scroll_tranlate();

        $('.box')[0].addEventListener("touchstart",function(){
            scroll_btn = false;
        })
        $('.box')[0].addEventListener("toucgmove",function(){
            scroll_btn = false;
        })

        $('.box')[0].addEventListener("touchend",function(){
            scroll_btn = true;
            // scroll_tranlate()
        })
        function scroll_things(){

            var scrollLeft = Math.round($('.box').scrollLeft());
            // console.log(scrollLeft)
            //出现文字的位置
            // var test1 = Math.round($('.test1').offset().left);
            //第一个text1
            var text1 = (Math.round($('.text1').offset().left)-$('.text1').width()/2)+getOffsetSum($('.text1').parent()[0]).left;
            //第二个text2
            var text2 = (Math.round($('.text2').offset().left)-$('.text2').width()/2)+getOffsetSum($('.text2').parent()[0]).left;
            //第二个text3
            var text3 = (Math.round($('.text3').offset().left)-$('.text3').width()/2)+getOffsetSum($('.text3').parent()[0]).left+50;
            //第四个text4
            var text4 = (Math.round($('.text4').offset().left)-$('.text4').width()/2)+getOffsetSum($('.text4').parent()[0]).left+100;
            //第五个text5
            var text5 = (Math.round($('.text5').offset().left)-$('.text5').width()/2)+getOffsetSum($('.text5').parent()[0]).left+150;
            // var text2 = Math.round($('.text2').offset().left-$('.text2').width()/2)+getOffsetSum($('.text2').parent()[0]);
            // console.log(scrollLeft+"/"+text4)
            // console.log(scrollLeft,test1)
            if(scrollLeft>=$('.one').width()){
                $('.one').hide();
                $('.sceneone').css('overflow', 'hidden');
                duihua();
                clearInterval(timer)
            }
            // if(scrollLeft>=test1){
            //     $('.test1').fadeIn(500);
            // }
            // console.log(text3,text4)
            if(scrollLeft>=text1){
                $('.text1').fadeIn(2000);
            }

            if(scrollLeft>=text2){
                $('.text2').fadeIn(2000);
            }

            if(scrollLeft>=text3){
                $('.text3').fadeIn(2000);
            }
            if(scrollLeft>=text4){
                $('.text4').fadeIn(2000);
            }
            if(scrollLeft>=text5){
                $('.text5').fadeIn(2000);
            }
        }


        $(".box").scroll(function(event){
            event.stopPropagation();
            // console.log(Math.round($('.box').scrollLeft()))
            scroll_things();
        })

//全局

        // 黑暗小屋
        var  men = '<img src="imgs/men.png" alt="" /><img src="imgs/button.gif" class="button" alt="" /><span class="click">点击</span>'


        //到达第一个场景
        function ani1(){
            //问题页
            // var ques_inner = '<img src="img/ques1.png" class="ques1" alt="" /><img src="img/ques2.png" class="ques2" alt="" /><img src="img/ques3.png" class="ques3" alt="" /><img src="img/ques4.png" class="ques4" alt="" /><p>工作中总会面临突如其来的意外</p>'
            console.log($('.two_num1').width()*(13.7/100))
            



        }

        function duihua(){
            var btn = true;
            $('.ico').remove();
            $('.touch').remove();
            $(".two").width($('.two_num1').width())
            $(".bac_text").width($('body').width())
            MTween({
                el: $('.two_num1')[0],
                target: {translateX: (-$('.two_num1').width()*(11/100))},
                time: 1500,
                type: "linear",
                callIn:function(){
                    if(css($('.two_num1')[0],'translateX') <= -$('.two_num1').width()*(7/100)){
                        if(btn){
                            $(".text6").fadeIn(2000, function() {
                                $(".text6").fadeOut(2000, function() {
                                    $('.two_num1').fadeOut(function(){
                                        $('.two_num1').remove()
                                        girl_cli();
                                    });
                                });
                            });
                            console.log(1)
                            btn = false;
                        }

                    }
                },
                callBack: function(){
                    
                    //问题页动画
                    // $('.bac_text').html(ques_inner);
                    // $('.bac_text p').fadeIn(1000, function() {
                    //     $('.bac_text img').animate({top: '-7%',opacity: '1'}, 1000,function(){
                    //         setTimeout(function(){
                    //             $('.bac_text').fadeOut(1000,function(){
                    //                 $(this).remove();
                    //             });
                    //         }, 1500)
                    //     })
                    // });
                }
            })
            MTween({
                el: $('.girl_box')[0],
                target: {translateX: (-$('.girl_box').width()*(240/100))},
                time: 1700,
                type: "linear",
                callIn:function(){
                },
                callBack: function(){
                    
                }
            })
        }

        function girl_cli(){
            $('.men').html(men).fadeIn(1000,function(){
                $('.text7').fadeIn(1500,function(){
                    $(this).fadeOut(1500,function(){
                    });
                    $('.button').fadeIn(500);
                    $('.click').fadeIn(500);
                });
            });

            //按钮点击
            $('.button').on('click',function(){

                $('.girl').fadeOut(500, function() {
                    girl($('.girl'))
                    $(this).fadeIn(500);
                });
                $(this).remove();
                $('.click').remove();
                setTimeout(function(){
                    go();
                },1000)
            })
        }

        function go(){
            var men_wid = $('.men img').width();
            var go = '<div class="got_text"><p class="go_p1">成长就是妥协与坚持的两难</p><p class="go_p2">但</p><p class="go_p3">只要门开着</p><p class="go_p4">就不会通往过去</p></div>'
            var btn = true;
            $('.two').append(go)
            MTween({
                el: $('.men img')[0],
                target: {translateX: (-men_wid*(0.6))},
                time: 2000,
                type: "easeBoth",
                callIn:function(){
                    if (btn) {
                        if (css($('.men img')[0],'translateX') <= (-men_wid*(0.3))) {
                            $('.go_p1').fadeIn(700, function() {
                                $('.go_p2').fadeIn(700, function() {
                                    $('.go_p3').fadeIn(700, function() {
                                        $('.go_p4').fadeIn(700, function() {
                                            setTimeout(function(){
                                                $('.got_text').fadeOut(1500, function() {
                                                    $('.got_text').remove();
                                                });
                                                girl_go();
                                            }, 2500)
                                        });
                                    });
                                });
                            });
                        };
                    };
                },
                callBack: function(){
                    
                }
            })
        }

        //小女孩出场
        function girl_go(){
            //女孩走出遮罩
            // if ($('.two .blu').length == 0) {
            //     var box_blu = '<div class="blu"></div>'
            //     $('.two').append(box_blu)
            // };
            MTween({
                el: $('.girl_box')[0],
                target: {translateX: ($('.girl_box').width()*0.3)},
                time: 2500,
                type: "easeBoth",
                callIn:function(){
                },
                callBack: function(){
                    // $('.girl_box').remove();
                    clearInterval(girl_timer)
                    $('.sceneone').remove();
                    $('.scenetwo').show();
                    scenetwo();
                }
            })

        }
        function scenetwo(){
            css($('.scenetwo')[0],'scale',400)
            setTimeout(function(){
                $('.weo_bac').show();
                $('.ani2').removeClass('ani2');

                setTimeout(function(){
                    MTween({
                        el: $('.scenetwo')[0],
                        target: {scale: 100},
                        time: 2000,
                        type: "easeBoth",
                        callIn:function(){
                        },
                        callBack: function(){
                            setTimeout(function(){
                                $('.weo_bac, .room').fadeOut(1000);
                                clearInterval(ico_num);
                                $('.weo_bac_blur').fadeIn(1000,function(){
                                    // $('.kv').addClass('kv1')
                                    shanshuo();
                                });
                            },2000)
                        }
                    })
                },1000)
            },1500) 
        }

        var cli_timer;
        //kv小点闪烁
        function cli(){
            var cli_num=1;
            cli_timer = setInterval(function(){
                $('.dian1').attr('src', 'imgs/cli'+cli_num+'.png');
                if (cli_num == 3) {
                    cli_num = 1
                }else{
                    cli_num++
                }
            },500)
        }

        function shanshuo(){
            //分享页
            var box_share = '<div class="shar_box"><img src="imgs/sharbac.jpg" class="sharbac" alt="" /><a class="left_btn" href="https://activity.lagou.com/topic/jieyouzahuopu.html"><img src="imgs/left_btn.png" alt="" /></a><a class="right_btn" href="https://yun.lagou.com/portal.htm?utm_source=jieyouzahuopu-h5"><img src="imgs/right_btn.png" alt="" /></a></div>'
            cli();
            // $('.kv').addClass('shanshuo')
            // $('.jieshu').addClass('translate').css('transform', 'translateY(-440%)');
            var kv_wid=$('.kv').width();
            css($('.kv')[0],'translateX',(-kv_wid/2))
            css($('.kv')[0],'translateY',0)
            MTween({
                el: $('.kv')[0],
                time: 3000,
                target: {scale: 200,translateX:(-kv_wid/2),translateY:100},
                type: "easeBoth",
                callBack:function(){
                    $('.jieshu .p1').fadeIn(1500,function(){
                        $('.jieshu .p2').fadeIn(1500)
                    });
                }
            })
            setTimeout(function(){
                $('.kv').removeClass('shanshuo')
                $('.box').fadeOut(1000);
                $('body').append(box_share)
                $('.shar_box').fadeIn(1000);
            },7000)
            
        }


    }
});