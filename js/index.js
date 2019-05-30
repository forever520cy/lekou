//返回顶部
		$(function(){
		  $('a[href*=#],area[href*=#]').click(function() {
		    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		      var $target = $(this.hash);
		      $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
		      if ($target.length) {
		        var targetOffset = $target.offset().top-65;
		        $('html,body').animate({
		          scrollTop: targetOffset
		        },
		        1000);
		        return false;
		      }
		    }
		  });
		})
		
		//右侧栏span事件
		$(".siteBarNav li").mouseover(function(){
			var spanObj = this.lastElementChild
			console.log(spanObj)
			this.lastElementChild.style.transition = "0.3s"
			this.lastElementChild.style.opacity = "1"
			this.lastElementChild.style.left = "-90px"
		})
		$(".siteBarNav li").mouseout(function(){
			this.lastElementChild.style.transition = "0.3s"
			this.lastElementChild.style.left = "0"
			this.lastElementChild.style.opacity = "0"
		})
		
		//console.log(localStorage)
		if(sessionStorage.nowUser){
			//点击跳转到购物车页面
			$(".cartPage").click(function(){
				location.href = "buyCar.html"
			})
			var nowUser = JSON.parse(sessionStorage.nowUser)[0].username
			//console.log(nowUser)
			var str = '亲爱的<span>'+nowUser+'</span>欢迎来到乐扣商城！'
						+'<span class="out">退出</span>'
			$(".nav_l").html(str)
			$(".nav_l span").css("font-weight","bold")
			$(".nav_l span").css("font-size","14px")
			$(".nav_l span").css("color","red")
			$(".nav_l span.out").css("color","blue")
			$(".nav_l span.out").css("cursor","pointer")
			$(".nav_l span.out").click(function(){
				sessionStorage.clear()
				location.href = "index.html"
			})
			if(localStorage.myShopCar){
				var userNum = JSON.parse(localStorage.myShopCar)
				//console.log(userNum.length)
				for(var i=0;i<userNum.length;i++){
					if(nowUser==userNum[i].user){
						//console.log(userNum[i].shopCar)
						var buyNum = userNum[i].shopCar.length
						//console.log(buyNum)
						$(".num").html(buyNum)
					}
				}
				
			}
		}else{
			//用户没有登录则跳转到登陆页
			$(".cartPage").click(function(){
				alert("亲！请先登录！")
				location.href = "login.html"
			})
		}
		
		
		var pro_list = document.getElementsByClassName("pro_list")[0]
		var pro_left = $(".pro_left")
//		console.log(pro_left)
		var pro_right = document.getElementsByClassName("pro_right")[0]
		var ulObj1 = document.getElementsByClassName("ulObj1")[0]
		var ulObj2 = document.getElementsByClassName("ulObj2")[0]
		
		//列表1
		$.ajax({
			type:"get",
			url:"./json/kind_list1.json",
			async:true,
			data:{},
			success:function(res){
				//console.log(res)
				var strimg = "";
				var str = "";
				strimg = '<div class="pro_left">'
							+'<img src="'+res[0].ImageUrl+'"/>'
				+'</div>'
				for(var i=0;i<6;i++){
					str += '<li pid="'+res[i].PrdID+'">'
								+'<img src="'+res[i].PrdImgUrl+'"/>'
								+'<a href="#">'+res[i].PrdName+'</a>'
								+'<div class="suggestPrice_container">'
									+'<div class="suggestPrice_label">建议零售价</div>'
									+'<div style="">￥'+res[i].PrdPrice.toFixed(2)+'</div>'
								+'</div>'
								+'<div class="price-container">'
									+'<div class="price_label">售　　　价</div>'
									+'<div class="price_text">￥'+res[i].PrdMarketPrice.toFixed(2)+'</div>'
								+'</div>'
							+'</li>'
				}
				ulObj1.innerHTML = str;
				
				var lis = $(".ulObj1 li")
//				console.log(lis.length)
				for(var i=0;i<lis.length;i++){
					lis[i].onclick = function(){
						var id = this.getAttribute("pid")
//						console.log(id)
						location.href = "details.html?id="+id
					}
//					lis[i].onmouseover = function(){
//						console.log(55)
//					}
				}
				
			}
		});
		
		//列表2
		$.ajax({
			type:"get",
			url:"./json/kind_list2.json",
			async:true,
			data:{},
			success:function(res){
				//console.log(res)
				var strimg = "";
				var str = "";
				strimg = '<img src="'+res[0].ImageUrl+'"/>'
				pro_left[1].innerHTML = strimg
				for(var i=0;i<5;i++){
//					console.log(res.length)
					str += '<li pid="'+res[i].PrdID+'">'
								+'<img src="'+res[i].PrdImgUrl+'"/>'
								+'<a href="#">'+res[i].PrdName+'</a>'
								+'<div class="suggestPrice_container">'
									+'<div class="suggestPrice_label">建议零售价</div>'
									+'<div style="">￥'+res[i].PrdPrice.toFixed(2)+'</div>'
								+'</div>'
								+'<div class="price-container">'
									+'<div class="price_label">售　　　价</div>'
									+'<div class="price_text">￥'+res[i].PrdMarketPrice.toFixed(2)+'</div>'
								+'</div>'
							+'</li>'
				}
				ulObj2.innerHTML = str;
				
				var lis2 = $(".ulObj2 li")
//				console.log(lis.length)
				for(var i=0;i<lis2.length;i++){
					lis2[i].onclick = function(){
						var id = this.getAttribute("pid")
//						console.log(id)
						location.href = "details.html?id="+id
					}
				}
			}
		});
		
		
		
		//轮播图
		var banner = document.getElementsByClassName("banner")[0];
		var banner_content = banner.children[0];
		var imgWidth = banner_content.offsetWidth;
		var ulObj = banner_content.children[0];
		var list = ulObj.children;
//		console.log(list)
		var olObj = banner_content.children[1];
		var focus = document.getElementsByClassName("focus");
//		console.log(focus)

		var pic = 0; 
		for (var i = 0; i < list.length; i++) {
			var liObj = document.createElement("li");
			olObj.appendChild(liObj);
			liObj.setAttribute("index", i);
			liObj.onmouseover = function() {
				for (var j = 0; j < olObj.children.length; j++) {
					olObj.children[j].removeAttribute("class");
				}
				this.className = "current";
				pic = this.getAttribute("index");
				animate(ulObj, -pic * imgWidth);
			};
		}
		olObj.children[0].className = "current";
		ulObj.appendChild(ulObj.children[0].cloneNode(true));
		//自动播放
		var timeId = setInterval(clickHandle, 3000);
		banner.onmouseover = function() {
			//focus.style.display = "block";
			clearInterval(timeId);
		};
		banner.onmouseout = function() {
			//focus.style.display = "none";
			timeId = setInterval(clickHandle, 3000);
		};
		//右边按钮
		document.getElementsByClassName("next")[0].onclick = clickHandle;
		function clickHandle() {
			if (pic == list.length - 1) {
				pic = 0; 
				ulObj.style.left = 0 + "px"; 
			}
			pic++; 
			animate(ulObj, -pic * imgWidth); 
			if (pic == list.length - 1) {
				olObj.children[olObj.children.length - 1].className = "";
				olObj.children[0].className = "current";
			} else {
				for (var i = 0; i < olObj.children.length; i++) {
					olObj.children[i].removeAttribute("class");
				}
				olObj.children[pic].className = "current";
			}

		};
		//左边按钮
		document.getElementsByClassName("prev")[0].onclick = function() {
			if (pic == 0) {
				pic = 5;
				ulObj.style.left = -pic * imgWidth + "px";
			}
			pic--;
			animate(ulObj, -pic * imgWidth);
			for (var i = 0; i < olObj.children.length; i++) {
				olObj.children[i].removeAttribute("class");
			}
			olObj.children[pic].className = "current";
		};

		function animate(element, target) {
			clearInterval(element.timeId);
			element.timeId = setInterval(function() {
				var current = element.offsetLeft;
				var step = 10;
				step = current < target ? step : -step;
				current += step;
				if (Math.abs(current - target) > Math.abs(step)) {
					element.style.left = current + "px";
				} else {
					clearInterval(element.timeId);
					element.style.left = target + "px";
				}
			}, 10);
		}