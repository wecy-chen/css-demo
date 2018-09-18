	/*1.根据li的个数去设置ul的宽度(功能模块)
				1.1:获取ul元素(逻辑模块)
				1.2:获取li元素的个数
				1.3设置ul的宽度
			2.ul实现拖拽移动的功能
				ul元素移动的距离=x2-x1
				ul元素的新位置=ul元素的旧位置+ul元素的移动距离
				ul的偏移根据ul的translateX来进行设置 初始值为0
				2.1:获取ul的旧位置(手指触摸瞬间ul的translateX值)
				2.2 获取手指触摸的位置x1
				2.3 获取手指移动的位置X2
				2.4 计算ul新位置
				2.5 设置ul的位置
				触摸->鼠标点击
				移动->鼠标移动
				抬起->鼠标抬起
			3.点击的背景
				3.1获取点击li下img的路径

		*/
window.onload=function(){
		var data={
			oUl:document.querySelector('.swiper>ul'),
			aLi:document.querySelectorAll('.swiper>ul>li'),
			bg:document.querySelector(".swiper>.bg"),
			time:"1s"
		}
		swiper(data)
		function swiper(data){
		data.oUl.style.width=data.aLi.length+'00vw';

		data.oUl.addEventListener("touchstart",touch);
		data.oUl.addEventListener("touchmove",touch);
		data.oUl.addEventListener("touchend",touch);



		var startX,x1;
		// oUl.transform={}

		function touch(ev){
			ev=ev||window.event;
			// console.log(ev.type)
			switch(ev.type){
				case 'touchstart':
							//startX=oUl.transform['transform']||0
							startX=cssTransform(data.oUl,"translateX");
							data.oUl.style.transition=data.time||"0.5s"		//过渡					//console.log(startX)
							x1=ev.changedTouches[0].pageX;//获取一个手指触摸位置
							break;
				case 'touchmove':
							var x2=ev.changedTouches[0].pageX;//获取手指滑动位置
							var nowX=startX+x2-x1	
							//oUl.style.transform='translateX('+nowX+'px)'
							//oUl.transform["translateX"]=nowX;
							cssTransform(data.oUl,"translateX",nowX)
							break;
				case 'touchend':
							/*
							li w 偏移
							偏移量0.3w 回弹
							      0.6w  翻页
							四舍五入 
							-(li的个数-1)*li的宽度 
						*/
							var offset=cssTransform(data.oUl,"translateX");
							offset=Math.min(0,offset);//大于0就小于0
							offset=Math.max(-(data.aLi.length-1)*data.aLi[0].offsetWidth,offset);
							var num=Math.round(-offset/data.aLi[0].offsetWidth)
							//console.log(num)
							data.oUl.style.transition=data.time||"0.5s"
							cssTransform(data.oUl,"translateX",-num*data.aLi[0].offsetWidth)

								//设置背景
							data.bg.children[0].style.transition=data.time||"0.5s"
							data.bg.children[0].src=data.aLi[num].children[0].src
							
							break;
			}
		}
		/*
		@param:设置或获取一个元素的transform属性值
		@obj:待操作的元素
		@attr:待操作的属性
		@val:待设置的属性值
		传两个参数为获取,三个为设置
		*/
		function cssTransform(obj,attr,val){
			if(!obj.transform){
				obj.transform={}
			}
			switch(arguments.length){
				case 3:
					obj.transform[attr]=val;
					var str="";//带设置的属性值
					for(var key in obj.transform){
						switch(key){
							case "translate":
							case "translateX":
							case "translateY":
							case "translateZ":
								str+=`${key}(${obj.transform[key]}px)`;
						}
					}
					obj.style.transform=str;
					break;

				case 2:
					var val=obj.transform[attr];
					if(typeof val==="undefined"){
						val=0;
					}
					return val;
					break;
			}
		}
}
}