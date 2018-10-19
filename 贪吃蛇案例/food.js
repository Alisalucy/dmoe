// JavaScript Document

// Food 食物自调用函数
(function(){
	var elements = [];
	// 1.先创建食物的构造函数
	function Food(x,y,width,height,color){
		this.x = x || 0; // 若是没传参数的话，后面的值是默认值
		this.y = y || 0;
		this.width = width || 20;
		this.height = height || 20;
		this.color = color || "pink";
	}; /*end food*/
	// 把Food 暴露给window，外面就可以访问Food
	window.Food = Food;
	
	// 2.食物原型函数初始化
	Food.prototype.init = function(map){
		remove();
		// map里创建一个div,设置样式，坐标
		var div = document.createElement("div");
		map.appendChild(div);
		div.style.width = this.width + "px";
		div.style.height = this.height + "px";
		div.style.backgroundColor = this.color;
		// 坐标,
		div.style.position = "absolute"; // 脱离文档流
		this.x = parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;// x 坐标
		this.y = parseInt(Math.random()*(map.offsetHeight/this.height))*this.height; // y坐标
		div.style.left = this.x +"px";
		div.style.top = this.y + "px";
		
		elements.push(div);
	}; /*end init*/
	
	// 3.食物删除  创建一个私有函数 
	function remove(){
		for(var i = 0; i<elements.length; i++){
			var ele = elements[i];
			ele.parentNode.removeChild(ele);// 从父节点里删除子元素
			elements.splice(i,1); // 这里的子元素也要删除,从i的位置删除1位元素
		} /*end for*/
	}; /*end remove*/
}());