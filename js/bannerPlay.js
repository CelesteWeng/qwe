// 参数：(banner图最大div，左键，右键，居中可视窗口：含ul的div，含图片的ul，数字按键组)
function bannerPlay(oBanner,oBtnL,oBtnR,oView,oUl,oOl){
	var oBtns = oOl.children;
	oUl.innerHTML+=oUl.innerHTML;
	var aLis = oUl.children;
	var oLiWidth = aLis[0].offsetWidth;
	var iNum = 0;
	var timer = null;
	
	// 计算轮播图的宽度
	oUl.style.width = aLis[0].offsetWidth*aLis.length + 'px';
	oW= document.documentElement.clientWidth;
	
	// 计算轮播图居中
	oView.style.left = -(oView.offsetWidth - oW)/2 +'px';
	
	// 当窗口改变的时候重新计算轮播图居中
	window.onresize=function(){
		oW= document.documentElement.clientWidth;
		oView.style.left = -(oView.offsetWidth - oW)/2 +'px';
	};
	function play(){
		iNum++;
		if(iNum==aLis.length/2+1){
			oUl.style.left = 0+'px'
			iNum=1;
		}
		for(var i=0; i<oBtns.length;i++){
			oBtns[i].className='';
		};
		if(iNum==aLis.length/2){
			oBtns[0].className='active';
		}else{
			oBtns[iNum].className='active';
		}
		animate(oUl,{'left': -iNum*oLiWidth});
	}
	function autoPlay(){
		clearInterval(timer)
		timer = setInterval(play,4000)
	}
	// 自动播放
	autoPlay();
	// 点击右侧按钮
	oBtnR.onclick=function(){
		play();
	};
	
	// 点击左侧按钮
	oBtnL.onclick=function(){
		iNum--;
		if(iNum<0){
			oUl.style.left =- oUl.offsetWidth/2+'px'
			iNum=aLis.length/2-1;
		};
		for(var i=0; i<oBtns.length;i++){
			oBtns[i].className='';
		};
		oBtns[iNum].className='active';
		animate(oUl,{'left': -iNum*oLiWidth});
	};
	
	// 点解数字按钮切换轮播
	
	for(var i =0; i<oBtns.length;i++){
		oBtns[i].index=i;
		oBtns[i].onclick=function(){
			for(var i =0; i<oBtns.length;i++){
				oBtns[i].className='';
			}
			oBtns[this.index].className='active';
			iNum=this.index;
			animate(oUl,{'left': -this.index*oLiWidth});
		}
	};
	
	// 触及停止轮播
	oBanner.onmouseover = function(){
		clearInterval(timer);
	}
	oBanner.onmouseout = function(){
		clearInterval(timer);
		autoPlay();
	}
}