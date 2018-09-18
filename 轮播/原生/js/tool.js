/**
 * Created by newuser on 2017/6/19.
 */
// 第一工具方法 动态的 修改css样式fnMove
function fnMove(ele, aObj, callback) {
    //   参数一:需要动态变化样式的元素
    //   参数二:需要变化的属性和目标值对象 例{fontSize:500,height:140,opacity:50}
    //   参数三:回调 （如果函数存在）当动画完成调用该函数
    clearInterval(ele.timer);

    ele.timer = setInterval(function () {

        var fnStop = true;

        for (var attr in aObj) {

            var curr = 0;

            if (attr == 'opacity') { //0-1之间 先把值改为0-100

                curr = parseInt(getStyle(ele, attr) * 100)

            }else {
                curr = parseInt(getStyle(ele, attr))
            }
            //减速运动   aObj[attr]目标值（不会变） curr会变 越来越接近目标值
            var speed = (aObj[attr] - curr) / 12; 

            //  判断 目标值大于还是小于当前值  缩小动作 目标值1  当前值2  -1/6  -0.17 向下取整 -1
            //放大动作 目标值2  当前值1  1/6  0.17  向上取整  1
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if(speed != 0){  // 目标值 等于  当前值 d动画完成
                fnStop = false;
            }

            if(attr == 'opacity'){
                ele.style[attr] = (curr+speed)/100
                ele.style.filter = 'alpha(opacity:'+(curr+speed)+')'//老版本透明度值为0-100
            }
            else {ele.style[attr] = curr+speed +'px'}
        }
        //所有动画都完成 fnStop就不会成为false
        if (fnStop){
            clearInterval(ele.timer);//动画完成调用回调
            if(callback){
                callback();
            }
        }

    },30)

}

//参数 需要获取样式的元素对象，需要获取的样式属性名
function getStyle(oObj, sAttr) {
    //判断是否是支持getComputedStyle方法的高版本浏览器
    if (window.getComputedStyle) {
        sAttr = getComputedStyle(oObj, null)[sAttr]
        //getComputedStyle(对象,伪类)[属性名]
    } else {
        sAttr = oObj.currentStyle[sAttr];
        //对象.currentStyle[属性名]
    }
    return sAttr;//返回最终得到的样式
}
