function LyricPlay(oFont,oP,oCont){
	timerLyric = setInterval(function(){
		if(oFont.offsetLeft > oCont.offsetWidth){
			oFont.style.left = "50px";
			oP.style.left = 0;
		}else{
			oFont.style.left = oFont.offsetLeft + 2 + 'px';
			oP.style.left = oP.offsetLeft - 2 + 'px';
		}
	},30)
}