// 事件绑定函数
function bind(obj,eventName,fn){
	if(obj.attachEvent){
		obj.attachEvent('on'+eventName,function(){
			fn.call(obj)
		})
	}else{
		obj.addEventListener(eventName,fn,false);
	}
};
// 调用方法： bind(oBtn,'click',fn1);