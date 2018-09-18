(function($) {
    $.fn.myCarousel = function() {
        var $carousel = $(this)
        $carousel.each(function() {
            var $cont = $(this).find('.cont') // 轮播内容
            var cW = $cont.eq(0).width();
            var cH = $cont.eq(0).height();
            //console.log(cH)
            $(this).css('width', cW) //设置显示的宽度
            $(this).css('height', cH-3) //设置显示的高度
            
            $cont.each(function(i, ele) { // 初始化位置 最右边
                if (i == 0) {
                    $(ele).css('left', 0);
                } else {
                    $(ele).css('left', cW);
                }
            })

            var dRight=true; //方向
            var ctime = 5000 //时间5S
            var timer; //定时
            var idx = 0;
            var inx1 = 0;
            var inx2 = 1;
            var length = $cont.length

            
            //按钮 设置按钮样式
            //左
            $('<button class="btn lBtn"></button>').appendTo($(this))
            $('.lBtn').text('<').on('click', moveL)
            //右
            $('<button class="btn rBtn"></button>').appendTo($(this))
            $('.rBtn').text('>').on('click', moveR)
            //共有的属性
            var bH = parseInt(cW * 0.1)
            var bW = parseInt(cH * 0.1)
            var bTop = parseInt((cH - cW * 0.1) / 2)
            $('.btn').css({
                width: bW,
                height: bH,
                top: bTop,
                fontSize: bW,
                fontFamily: '黑体'
            })
            //自动轮播
            timer = setInterval(moveR, 4000);
            $carousel.on('mouseenter', function() {
                clearInterval(timer);
                //timer=null
            }).on('mouseleave', function() {
                if (dRight) {
                    timer = setInterval(moveR, 4000);
                } else {
                    timer = setInterval(moveL, 4000);
                }

            })
            //实现原理 两张图片循环移动 移动完改left隐藏
            function moveR() {
                dRight = true;
                reset()
                // $cont.eq(inx1).stop(true);//手风琴效果
                // $cont.eq(inx2).stop(true);
                $cont.eq(inx2).animate({ left: 0}, 1000)
                $cont.eq(inx1).animate({ left: -cW}, 1000)
                //is(":animated")
                //console.log(inx1,inx2)
                inx1++;
                inx2++;
                if (inx2 == length) {
                    inx2 = 0;
                }
                if (inx1 == length) {
                    inx1 = 0;
                }
                idx++;
                if (idx == length) {
                    idx = 0
                }
                dotActive()
                //console.log(idx)
            }
            //隐藏重置
            function reset() {
            	$cont.css('opacity',1)
                $cont.each(function(i, ele) {
                    if (i == inx1) {
                        $(ele).css({ left: 0 })
                    } else {
                        if (!dRight) {
                            $(ele).css({ left: -cW ,zIndex:i+1})
                        } else {
                            $(ele).css({ left: cW,zIndex:length-i })
                        }
                    }
                    $(ele).stop(true)  //停止所有
                })
            }

            function moveL() {
                dRight = false;
                reset()
                inx2--;
                inx1--;
                if (inx1 == -1) {
                    inx1 = length - 1
                }
                if (inx2 == -1) {
                    inx2 = length - 1;
                }
                //console.log(inx1,inx2)
                // $cont.eq(inx1).stop(true,false);
                // $cont.eq(inx2).stop(true,false);
                $cont.eq(inx1).animate({ left: 0}, 1000)
                $cont.eq(inx2).animate({ left: cW}, 1000)

                idx--;
                if (idx == -1) {
                    idx = length - 1
                }
                //console.log(idx)
                dotActive()
            }
            //圆点区域
            var dW = 10 //根据dot圆点的大小 设置区域大小
            $('<div class="iArea"></div>').appendTo($(this))
            var $iArea = $('.iArea')
            var iW = (length * 2 + 1) * dW; //根据length设置宽
            var iH = dW + 10;
            var iL = parseInt((cW - iW) / 2)
            $iArea.css({
                width: iW,
                height: iH,
                left: iL
            })

            //小圆点
            for (var i = 0; i < length; i++) {
                $('<span class="dot"></span>').appendTo($iArea)
            }
            var $dots = $('.dot');
            $dots.css({ width: dW, height: dW, top: 4 })
            $dots.each(function(index, ele) {
                var dotLeft = (2 * $(ele).index() + 1) * dW - 1; //1 为边框
                $(ele).css({ left: dotLeft })

                //设置点击
                $(ele).on('click', function() {
                    idx = $(this).index();
                    if (idx == length - 1) {
                        inx1 = length - 1;
                        inx2 = 0
                    } else {
                        inx1 = idx;
                        inx2 = idx + 1;
                    }
                    dotActive()
                    $cont.stop();
                    $cont.css('opacity',0.5).eq(idx).animate({opacity:1},1000)
                    if (dRight) {
                        $cont.eq(idx).css({ left: 0 }).siblings('.cont').css('left', cW)
                    } else {
                        $cont.eq(idx).css('left', 0).siblings('.cont').css('left', -cW)
                    }
                })
            })

            //小圆点active
            $dots.eq(0).css('backgroundColor', 'rgba(255,255,255,0.5)')

            function dotActive() {
                $dots.eq(idx).css('backgroundColor', 'rgba(255,255,255,0.5)')
                    .siblings().css('backgroundColor', 'rgba(0,0,0,0.5)')
            }
        })
        return this; //可以链式操作
    }
})(jQuery)