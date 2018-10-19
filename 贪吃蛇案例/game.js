// JavaScript Document

// 游戏函数封装  
(function(){
	var that = null; // 后面有用
	
	// 1.构造函数
	function Game(map){
		this.food = new Food(); // 实例化food
		this.snake = new Snake(); // 实例化snake
		this.map = map; // 参数
		that = this;
	}
	window.Game = Game;
	
	// 2. 初始化 调用前面实例化函数
	Game.prototype.init = function(){
		this.food.init(this.map);
		this.snake.init(this.map);
		
		/*setInterval(function(){
			that.snake.move(that.food,that.map);
			that.snake.init(that.map)
		},200)	*/
		this.runSnake(this.food,this.map);// 调用下面蛇移动的函数
		this.bindKey();// 调用下面的方向函数
	}
	
	Game.prototype.runSnake = function(food,map){
		var timer = setInterval(function(){
			this.snake.move(food,map);
			this.snake.init(map);
			
			// 蛇的横纵坐标
			var maxX = map.offsetWidth / this.snake.width; // 50
			var maxY = map.offsetHeight / this.snake.height;
			// 蛇头部坐标
			var minX = this.snake.body[0].x;
			var minY = this.snake.body[0].y;
			if(minX < 0 || minX >= maxX){// 起始坐标<0，蛇头>=50
				clearInterval(timer);
				alert("游戏结束");
			}
			if(minY < 0 || minY >= maxY){
				clearInterval(timer);
				alert("游戏结束");
			}
		}.bind(that),300)
	};
	Game.prototype.bindKey = function(){
		// 通过按键的数字判断方向
		document.addEventListener("keydown",function(e){
			switch(e.keyCode){ // 按键的数值
				case 37 : this.snake.direction = "left"; break; 
				case 38 : this.snake.direction = "top"; break;
				case 39 : this.snake.direction = "right"; break;
				case 40 : this.snake.direction = "bottom"; break;	
			}
		}.bind(that),false)// 这里的this指的是document,故要加个bind
		
		
	}
}())