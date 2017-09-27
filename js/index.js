window.onload = function(){
	//---------------------------------------------topNav点击效果------------------------------
	var oTopTabGroup = document.getElementById('topTabGroup');
	var aTopTabs = getClass(oTopTabGroup,'topTab'); //li
	var aTabs = oTopTabGroup.getElementsByTagName('i');  //i标签
	var oTabListBox  = document.getElementById('TabListBox');//点击显示部分(最大div)
	var oTopTabList  = document.getElementById('topTabList'); 
	var aTopLists = oTopTabList.getElementsByTagName('li');
	var iNum = 0;// topNav用
	var off = true;// topNav用
	topNav();
	function topNav(){
		for(var i=0; i<aTopTabs.length; i++){
			aTopTabs[i].index = i;
			aTopTabs[i].onclick = function(ev){
				oSelectList.className="selectList";
				oSchTab.className = "";
				var ev = ev || window.event;
				if(iNum != this.index){
					off = true; //解决来回点li的bug
				}
				if(off){
					for(var j=0; j<aTabs.length; j++){
						aTabs[j].style.backgroundPositionX = '-29px';
						aTopLists[j].style.display = 'none';
					}
					aTabs[this.index].style.backgroundPositionX = '-42px';
					oTabListBox.style.display = 'block';
					aTopLists[this.index].style.display = 'block';
					oTabListBox.style.left = this.offsetLeft + this.offsetWidth/2 - oTabListBox.offsetWidth/2 + 'px'; // 让点击显示部分和相应li居中对齐；
					off = false;
				}else{
					oTabListBox.style.display = 'none';
					aTabs[this.index].style.backgroundPositionX = '-29px';
					off = true;
				}
				iNum = this.index;
				ev.cancelBubble = true;
			};
		};
		
		function fn2(ev){
			var ev = ev || window.event;
			var t = ev.target || ev.srcElement;
			if(t != aTopTabs && t != oTopTabList && t != aTopLists[0] && t != aTopLists[1] && t != aTopLists[2]){
				off = true;
				for(var j=0; j<aTabs.length; j++){
					aTabs[j].style.backgroundPositionX = '-29px';
				}
				oTabListBox.style.display = 'none';
			}
		};
		bind(document,'click',fn2);
	};
		
	//---------------------------------------------subMenu点击效果------------------------------
	var oMenuBox = document.getElementById('menu');
	var oMenu = document.getElementById('menuList'); //左侧显示菜单
	var aMenuLists= getClass(oMenu,"aMenu");
	var aSubLists = getClass(oMenu,"hideLi"); //6个li，因为标签名字重复，所以用children；
	showMenu();
	function showMenu(){
		for(var i=0; i<aMenuLists.length; i++){
			aMenuLists[i].index = i;
			aMenuLists[i].onmouseover = function(){
				for(var j=0; j<aSubLists.length; j++){
					aSubLists[j].style.display = 'none';
				}
				aSubLists[this.index].style.display = 'block';
			}
			aMenuLists[i].onmouseout = function(){
				aSubLists[this.index].style.display = 'none';
			}
		}
	}
	
	//---------------------------------------------banner图轮播------------------------------
	var oW= 0;
	var oBanner = document.getElementById('banner');
	var oBtnL = document.getElementById("btn_L");
	var oBtnR = document.getElementById("btn_R");
	var oView = document.getElementById("view");//放ul的div
	var oUl = oView.getElementsByTagName('ul')[0];
	var oOl = document.getElementById('olBtn');
	//计算左键的距离
	oBtnL.style.left = Math.floor((document.documentElement.clientWidth - 1200)/2) + oMenu.offsetWidth + 'px';
	bannerPlay(oBanner,oBtnL,oBtnR,oView,oUl,oOl);
	
	//---------------------------------------------歌词效果----------------------------------
	var oFont = document.getElementById('font');
	var oP = document.getElementById('redFont');
	var oContBox = document.getElementById('contBox');
	var timerLyric = null;
	LyricPlay(oFont,oP,oContBox);
	
	//---------------------------------------------选项卡效果----------------------------------
	//获取属性
	function choose(){
		function Tab(json){
			this.json = json;
			this.oTab= document.getElementById(this.json['id']);
			this.oUl = this.oTab.getElementsByTagName('ul')[0];
			this.aLis = this.oUl.getElementsByTagName('li');
			this.aCont = getClass(this.oTab,"contTeam");
			this.timer = null;
			this.iNum=0;
		}
		//初始化，循环
		Tab.prototype.init=function(){
			var This = this;
			for(var i=0; i<this.aLis.length;i++){
				this.aLis[i].index=i;
				this.aLis[i][This.json.ev]=function(){
					var LiThis=this;
					This.change(LiThis);
				}
			}
		};
		//点击内容改变
		Tab.prototype.change=function(LiThis){
			for(var i=0; i<this.aLis.length;i++){
				this.aLis[i].className='';
				this.aCont[i].style.display='none';
			}
			LiThis.className='active';
			this.aCont[LiThis.index].style.display='block';
			this.iNum=LiThis.index;
		};
		var tabTeam=new Tab({id:'tab',ev:'onclick'});
		tabTeam.init();
	}
	choose();
	
	//---------------------------------------------搜索栏----------------------------------
	var oSchInput = document.getElementById("schInput");
	var oSchSelect = document.getElementById("schSelect");//综合搜索
	var oSchTab = oSchSelect.getElementsByTagName("i")[0];//箭头
	var oSelectList=document.getElementById("selectList");
	var aSchLists=oSelectList.getElementsByTagName("a");
	var oSText=oSchSelect.getElementsByTagName("span")[0];
	//搜索方式选择
	Select();
	textPlay(oSchInput);
	
	function Select(){
		oSchSelect.onclick = function(){
			if(oSelectList.className=="selectList"){
				oSelectList.className="selectList bl";
				oSchTab.className = "active";
			}else{
				oSelectList.className="selectList";
				oSchTab.className = "";
			}
		}
		for(var i=0; i<aSchLists.length; i++){
			aSchLists[i].onclick=function(){
				oSText.innerText=this.innerText;
				oSelectList.className="selectList";
				oSchTab.className = "";
			}
		}
		
		function fn1(ev){
			var ev = ev || window.event;
			var t = ev.target || ev.srcElement;
			if(t != oSchSelect && t != oSelectList && t != oSelectList[0] && t != aSchLists[1] && t != aSchLists[2] && t != oSchSelect.children[0] && t != oSchSelect.children[1]){
			 	oSelectList.className="selectList";
				oSchTab.className = "";
			}
		};
		bind(document,'click',fn1);
	};
	//点击输入框内文字消失
	function textPlay(Input){
		Input.onfocus = function(){
			Input.value = '';
		}
		Input.onblur = function(){
			Input.value = '请输入关键字';
		}
	}
	
	
	//----------------------------------------返回顶部+顶部导航栏---------------------------
	var oBtnTop = document.getElementById("back");
	var oScrolltop = 0;
	var timerTop=null;
	var topOff=true;
	backtoTop();
	function backtoTop(){
		oBtnTop.onclick=function(){
			timerTop=setInterval(function(){
				var backTop = Math.floor(oScrolltop/4);
				/*IE8兼容，直接返回顶部*/
				function isIE() { //ie?
					if (!!window.ActiveXObject || "ActiveXObject" in window){
						return true;
					}else{
						return false;
					}
				}
	            if(isIE()){
	            	var browser=navigator.appName
		            var b_version=navigator.appVersion
		            var version=b_version.split(";");
		            var trim_Version=version[1].replace(/[ ]/g,"");
	            	if(browser=="Microsoft Internet Explorer"  &&trim_Version=="MSIE8.0"){
		                if(document.documentElement.scrollTop){
		                    document.documentElement.scrollTop=0;
		                }else{
		                    document.body.scrollTop=0;
	                	}
		            }else{
		            	backT();
		            }
	            }else{
	            	backT();
	            }
	            function backT(){
	           		if(backTop == 0){
						clearInterval(timerTop);
					}else{
						if(document.documentElement.scrollTop){
							document.documentElement.scrollTop-=backTop;
						}else{
							document.body.scrollTop-=backTop;	
						}
						topOff=true;
					}
	           	}
	        },30)
		}
		function fn3(ev){// 返回顶部部分
			oScrolltop = document.documentElement.scrollTop || document.body.scrollTop;
			if(oScrolltop>350){
				oBtnTop.style.display='block'
			}else{
				oBtnTop.style.display='none'
			};				
			if(!topOff){
					clearInterval(timerTop);	
			}
			topOff=false;
		}
		bind(window,'scroll',fn3);
	}
	
	//浮动导航栏
	var FloatNav = document.getElementById('FloatNav');
	var oFNavL = document.getElementById('fNav_L');
	var aFLists = oFNavL.getElementsByTagName('li');
	var oSchInput2 = document.getElementById('schInput2');
	textPlay(oSchInput2);
	fTouch();
	function fTouch(){
		function clearClass(){
			for(var j=0; j<aFLists.length; j++){
				aFLists[j].className = '';
			}
		};
		for(var i=0; i<aFLists.length; i++){
			aFLists[i].onmouseover = function(){
				clearClass();
				this.className = 'active';
			}
			oFNavL.onmouseout = function(){
				clearClass();
				aFLists[0].className = 'active';
			}
		}
		bind(window,'scroll',fn4);
		function fn4(ev){// 浮动导航栏部分
			oScrolltop = document.documentElement.scrollTop || document.body.scrollTop;
			if(oScrolltop>190){
				FloatNav.style.display = 'block';
				animate(FloatNav,{'opacity':100});
			}else{
				animate(FloatNav,{'opacity':0});
				FloatNav.style.display = 'none';
			}
		};
	};
	
	//----------------------------------------底部文字滚动---------------------------
	var oRecruitView = document.getElementById('recruitView');
	var oAllCont = document.getElementById('allCont');
	var oRecruitCont = getClass(oAllCont,'recruitCont')[0];
	oDivHeight = oRecruitCont.offsetHeight;
	allCont.innerHTML += allCont.innerHTML;
	var aRecruitConts = oAllCont.children;
	recruitPlay();
	function recruitPlay(){
		var rNum = 0;
		var timer = null;
		autoPlay();
		function rPlay(){
			rNum++;
			if(rNum==aRecruitConts.length/2+1){
				oAllCont.style.top = 0;
				rNum=1;
			}
			animate(oAllCont,{'top':rNum*-oDivHeight});
		};
		function autoPlay(){
			clearInterval(timer);
			timer = setInterval(rPlay,4000);
		};
		oRecruitView.onmouseover = function(){
			clearInterval(timer);
		};
		oRecruitView.onmouseout = function(){
			clearInterval(timer);
			timer = setInterval(rPlay,4000);
		};
	};
}
