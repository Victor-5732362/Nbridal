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
	ToTop.onclick = function(){
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
	}
}
function nav(){
	var level1 = document.getElementsByClassName('level1')[0];
	console.log(level1.children.length);
	var level_li = level1.children;
	for(var i=1;i<level_li.length;i++){
		level_li[i].onmouseover =function(){
			// console.log(this.children[1].className);
			if(this.children[1]){
				this.children[1].style.display='block';
			}
		}
		level_li[i].onmouseout =function(){
			// console.log(this.children[1].className);
			if(this.children[1]){
				this.children[1].style.display='none';
			}
		}
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