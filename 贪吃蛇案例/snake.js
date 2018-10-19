// JavaScript Document

// 小蛇的自调用函数
(function(){
	var elemets = [];
	
	// 1.创建蛇的构造函数
	function Snake(width,height,direction){
		this.width = width || 20; // 每个身体的宽高
		this.height = height || 20;
		this.direction = direction || "right"; // 不是变量的一定不要忘了加“号
		this.body = [// 身体分三部分组成
			{x:3,y:2,color:"red"}, // 头
			{x:2,y:2,color:"orange"},// 身体
			{x:1,y:2,color:"orange"}// 身体
		]
	}
	window.Snake = Snake;
	
	// 2.小蛇基本样式初始化方法
	Snake.prototype.init = function(map){
		// 小蛇身体分三部分组成，遍历添加div样式属性
		for(var i = 0; i<this.body.length; i++){
			var obj = this.body[i];
			var div = document.createElement("div");
			map.appendChild(div);
			div.style.width = this.width +"px";
			div.style.height = this.height +"px";
			div.style.position = "absolute";
			div.style.left = obj.x*this.width + "px";
			div.style.top = obj.y*this.height + "px";
			div.style.backgroundColor = obj.color;
			
			// 把div添加到数组里
			elemets.push(div);
		}
	};
	
	// 3.小蛇移动
	Snake.prototype.move = function(food,map){
		remove();
		
		// 改变小蛇身体的坐标位置 
		for(var i = this.body.length -1; i>0; i--){
			// 最后坐标 = 前一坐标位置，这样小蛇就移动了
			this.body[i].x = this.body[i-1].x;
			this.body[i].y = this.body[i-1].y;
		}
		// 判断方向  小蛇头部坐标位置
		switch(this.direction){
			case "right" : this.body[0].x += 1; break;
			case "left" : this.body[0].x -= 1; break;
			case "top" : this.body[0].y -= 1; break;
			case "bottom" : this.body[0].y += 1; break;	
		}
		
		// 小蛇吃到食物之后状态
		// 先判断小蛇有没有吃到食物 小蛇的头部坐标与食物的坐标一致
		var headX = this.body[0].x*this.width;
		var headY = this.body[0].y*this.height;
		var foodX = food.x;
		var foodY = food.y;
		if(headX == foodX && headY == foodY){
			var last = this.body[this.body.length -1];
			this.body.push({// 先把最后一个身体复制一个追加到蛇尾
				x:last.x,
				y:last.y,
				color:last.color});
			// 再调用一下食物
			food.init(map);
		}
	};
	
	// 4.删除小蛇的函数
	function remove(){
		var i = elemets.length -1;
		for(; i>=0 ; i--){
			var ele = elemets[i]
			ele.parentNode.removeChild(ele);
			elemets.splice(i,1)
		}
	}
}());