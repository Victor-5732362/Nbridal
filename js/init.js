if(document.all){ 
 	window.attachEvent("onload",all_Init)
} 
else{ 
 	window.addEventListener("load",all_Init,false);
}
function all_Init(){
	load_init();
	nav();
}
function load_init(){
	var ToTop = document.getElementById('gettop');
	window.onscroll = function(){
		if(scroll().top > 200){
			ToTop.style.display = "block";
		}else{
			ToTop.style.display = "none";
		}
		leader = scroll().top;
	}
	var timer=null;
	var target = 0;  
	var leader = 0;   
	EventListen.addEvent(ToTop,function(){
		clearInterval(timer);
			timer = setInterval(function(){
			var step = (target-leader)/10;
			step = step>0?Math.ceil(step):Math.floor(step);
			leader = leader + step;
			window.scrollTo(0,leader);
			if(leader == 0){
				clearInterval(timer);
			}
		},30);
	},'click');
}
function nav(){
	var level1 = document.getElementsByClassName('level1')[0];
	console.log(level1.children.length);
	var level_li = level1.children;
	for(var i=1;i<level_li.length;i++){
		EventListen.addEvent(level_li[i],function(){
			// console.log(this.children[1].className);
			if(this.children[1]){
				this.children[1].style.display='block';
			}
		},'mouseover');
		EventListen.addEvent(level_li[i],function(){
			// console.log(this.children[1].className);
			if(this.children[1]){
				this.children[1].style.display='none';
			}
		},'mouseout');
	}
}
function scroll() {  
    if(window.pageYOffset != null) {  
        
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }
    else if(document.compatMode === "CSS1Compat") {    
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return {   
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}
//兼容写法
EventListen = {
       addEvent: function (ele,fn,str) {
           //通过判断调用的方式兼容IE678
           //判断浏览器是否支持该方法，如果支持那么调用，如果不支持换其他方法
            if(ele.addEventListener){
                //直接调用
                ele.addEventListener(str,fn);
            }else if(ele.attachEvent){
                ele.attachEvent("on"+str,fn);
            }else{
                //在addEventListener和attachEvent都不存在的情况下，用此代码
                ele["on"+str] = fn;
            }
        }
    }
