// window.onload = function(){
// 	sshow();

// }
EventListen.addEvent(window,sshow,'load');
function sshow(){
	// window.onblur = function(){
	// 	clearInterval(timer);
	// }
	// window.onfocus = function(){
	// 	timer = setInterval(autoplay,3000)
	// }
	var box = document.getElementsByClassName('slideshow_box')[0];
	var ul = box.children[0];
	var ol = box.children[1];
	var imgW = ul.children[0].offsetWidth;
	var btnLeftRight = box.lastElementChild || box.lastChild;
	var ulnewli = ul.children[0].cloneNode(true);
	ul.appendChild(ulnewli);

	for(var i = 0;i<ul.children.length-1;i++){
		var olnewli = document.createElement('li');
		ol.appendChild(olnewli);
	}
	var olAllli = ol.children;
	olAllli[0].className='active';
	for(var i=0;i<olAllli.length;i++){
		olAllli[i].index = i;
		EventListen.addEvent(olAllli[i],function(){
			for(var j=0;j<olAllli.length;j++){
				olAllli[j].className = '';
			}
			// console.log(this.index);
			key=square =this.index;
			this.className = 'active';
			animate(ul,-this.index*imgW);
			// olAllli[this.index].className='active';
		},'mouseover');
	}
	var timer = setInterval(autoplay,3000);
	var key=0;
	var square = 0;
	function autoplay(){
		key++;
		if(key>olAllli.length){
			ul.style.left = 0;
			key=1;
		}
		// ul.style.left = -key*imgW+"px";
		animate(ul,-key*imgW);
		square ++;
		if(square >olAllli.length-1){
			square= 0;
		}
		for(var i =0;i<olAllli.length;i++){
			olAllli[i].className='';
		}
		olAllli[square].className='active';
	}
	EventListen.addEvent(box,function(){
		clearInterval(timer);
		btnLeftRight.style.display = 'block';
	},'mouseover');
	EventListen.addEvent(box,function(){
		timer = setInterval(autoplay,3000);
		btnLeftRight.style.display = 'none';
	},'mouseout');
	EventListen.addEvent(btnLeftRight.children[0],function(){
		key--;
		if(key<0){
			ul.style.left= -(olAllli.length-1)*imgW+"px";
			key=olAllli.length-1;
		}
		animate(ul,-key*imgW);
		square --;
		if(square <0){
			square= olAllli.length-1;
		}
		for(var i =0;i<olAllli.length;i++){
			olAllli[i].className='';
		}
		olAllli[square].className='active';
	},'click');
	EventListen.addEvent(btnLeftRight.children[1],autoplay,'click');
	function animate(ele,target){
		clearInterval(ele.timer);
		var speed = target > ele.offsetLeft?10:-10;
		ele.timer =setInterval(function(){
			var val = target - ele.offsetLeft;
			ele.style.left = ele.offsetLeft + speed +'px';
			if(Math.abs(val)<=10){
				ele.style.left = target +'px';
				clearInterval(ele.timer);
			}
		},10); 
	}
}