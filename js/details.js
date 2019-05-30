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
		
		if(sessionStorage.nowUser){
			
			//用户登录，点击跳转到购物车页面
			$(".cartPage").click(function(){
				location.href = "buyCar.html"
			})
			
			var nowUser = JSON.parse(sessionStorage.nowUser)[0].username
//			console.log(nowUser)
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
//				console.log(userNum.length)
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
			//用户没有登录，点击跳转到登录页面
			$(".cartPage").click(function(){
				alert("亲！请先登录！")
				location.href = "login.html"
			})
		}
		
		
		
		
		//获取search值中的id
		function getQueryString(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) {
			    return decodeURIComponent(r[2]);
			}
			return '';
		}
		var pid=getQueryString("id");
		
		//增加数量
		$(".change_num_up").click(function(){
			var numVal = $(".pro_num").val()
			numVal++
			$(".pro_num").val(numVal)
		})
		//减少数量
		$(".change_num_down").click(function(){
			var numVal = $(".pro_num").val()
			numVal--
			if(numVal<=0){
				numVal = 0
			}
			$(".pro_num").val(numVal)
		})
		//添加购物车--判断用户是否登录
		if(sessionStorage.nowUser){
			var nowUser = JSON.parse(sessionStorage.nowUser)[0].username
			$(".mycart").click(function(){
				$.ajax({
					type:"get",
					url:"./json/details1.json",
					async:true,
					success:function(res){
						for(var i=0;i<res.length;i++){
							if(res[i].PrdID==pid){
								var datas = res[i]
								function Obj(){
									var shopCarObj = {
										"info":$(".p2").html(),
										"bianhao":datas.bianhao,
										"id":datas.PrdID,
										"price":datas.PrdMarketPrice,
										"addNum":$(".pro_num").val(),
										"proImg":datas.proImg[0]
									}
									return shopCarObj
								}
								setShop(nowUser)
								function setShop(user){
									var flag = true
									if(!localStorage.myShopCar){
										save.setDate({
											"name":"myShopCar",
											"value":JSON.stringify([])
										})
									}
									var shopCarArr = JSON.parse(localStorage.myShopCar)
									save.getDate("myShopCar",nowUser,function(result,index){
										if(result==-1){
											var userCar = {
												"user":nowUser
											}
											var temp = []
											temp.push(Obj())
											userCar.shopCar = temp
											shopCarArr.push(userCar)
										}else{
											var car = result.shopCar
											$.each(car, function(ind,obj) {
												if(obj.id==pid){
													var oldNum = obj.addNum
													car[ind].addNum = Number(oldNum)+Number($(".pro_num").val())
													shopCarArr[index].shopCar = car
													flag = false
													alert("添加成功！")
//													console.log(11)
//													break
												}
											});
											if(flag){
												car.push(Obj())
												shopCarArr[index].shopCar = car
												console.log(22)
//												alert("添加成功！")
											}
										}
									})
									var newStr = JSON.stringify(shopCarArr)
									save.setDate({
										"name":"myShopCar",
										"value":newStr
									})
//									console.log(33)
//									break
									alert("添加成功！")
								}
							}
						}
					}
				});
			})
		}else{
			//用户没有登录则跳转到登陆页
			$(".mycart").click(function(){
				alert("亲！请先登录！")
				//按钮为a标签，不会执行location，解决方法：
				//1.window.event.returnValue=false;
				//这个属性放到提交表单中的onclick事件中在这次点击事件不会提交表单，
				//如果放到超链接中则在这次点击事件不执行超链接href属性。
				//2.将a标签的href属性去掉,但是这样就没有了a标签的鼠标小手效果
				window.event.returnValue=false;
				location.href = "login.html"
			})
		}
		
		
		//列表详情1
		$.ajax({
			type:"get",
			url:"./json/details1.json",
			async:true,
			success:function(res){
				//console.log(res)
				for(var i=0;i<res.length;i++){
					if(pid==res[i].PrdID){
						$(".view_num").html(res[i].views)
						$(".collection_num").html(res[i].collection)
						$(".p1").html(res[i].p1)
						$(".p2").html(res[i].PrdName)
						$(".bianhao").html(res[i].bianhao)
						$(".lshoujia").html('￥'+res[i].PrdPrice.toFixed(2))
						$(".shoujia").html('￥'+res[i].PrdMarketPrice.toFixed(2))
						$(".residue_number").html(res[i].kc)
						var minImg = res[i].proImg
//						console.log(minImg[0])
//						console.log(minImg)
						var minImgStr = ""
						for(var j=0;j<minImg.length;j++){
							minImgStr += '<li><img src="'+minImg[j]+'"/></li>'
						}
						$(".min_content ul").html(minImgStr)
						var maxImgStr = '<img src="'+minImg[0]+'"/>'
										+'<div id="mask"></div>'
						
						$(".left_max_content").html(maxImgStr)
						$("#small").html(maxImgStr)
						$("#big img").attr("src",minImg[0])
						//颜色
						if(res[i].yanse!=undefined){
							console.log(res[i].yanse)
							var yanseList = res[i].yanse
							var yansetitleStr = '<span>颜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</span>'
												+'<span>：</span>'
												+'<div class="yanse">'
							var yanseStr = ""
							var yanseLastStr = '</div>'
							for(var j=0;j<yanseList.length;j++){
								yanseStr += '<span>'+yanseList[j]+'</span>'	
							}
							
							var finallyStr = yansetitleStr + yanseStr + yanseLastStr
							$(".yanse_title").html(finallyStr)
							$(".yanse_title span").css("margin-right","6px")
						}
						
						//商品信息列表
						var listArr = res[i].list
						var listStr = ""
						for(var j=0;j<listArr.length;j++){
//							console.log(listArr[j].img)
							listStr += '<div class="items">'
										+'<div class="img">'
											+'<a href="#"><img src="'+listArr[j].img+'"/></a>'
										+'</div>'
										+'<p class="name">'+listArr[j].txt+'</p>'
										+'<p class="lsj">'
											+'<span>建议零售价</span>'
											+'<span>￥'+listArr[j].lsj.toFixed(2)+'</span>'
										+'</p>'
										+'<p class="sj_area">'
											+'<span class="sj">售　　　价</span>'
											+'<span class="price_num">￥'+listArr[j].sj.toFixed(2)+'</span>'
										+'</p>'
									+'</div>'
						}
						$(".pro_content").html(listStr)
						
						//商品图片
						var proInfoImg = res[i].proInfoImg
						var proInfoImgStr = ""
//						console.log(proInfoImg)
						for(var j=0;j<proInfoImg.length;j++){
//							console.log(proInfoImg[j])
							proInfoImgStr += '<p><img src="'+proInfoImg[j]+'"/></p>'
						}
						$(".img_info").html(proInfoImgStr)
						
						//小图片绑定点击事件
						$(".min_content ul li").click(function(){
							var nowImg = this.firstChild.getAttribute("src")
//							console.log(nowImg)
//							console.log($("#small img").attr("src",nowImg))
							$("#small img").attr("src",nowImg)
							$("#big img").attr("src",nowImg)
						})
					}
				}
			}
		});
		
		//放大镜
		$(function(){
			//鼠标移入移出小盒子 让大盒子和遮罩显示  和隐藏
			$("#small").mouseenter(function(){
				$("#big,#mask").show();
			}).mouseleave(function(){
				$("#big,#mask").hide();
			})
				
			//给小盒子绑定鼠标移动事件
			$("#small").mousemove(function(e){
				var x=e.pageX-$("#small").offset().left-$("#mask").width()/2;
				var y=e.pageY-$("#small").offset().top-$("#mask").height()/2;	
				//限制
				x<0 ? x=0 :x;
				y<0 ? y=0 :y;		
				x>$("#small").width()-$("#mask").width() ? x=$("#small").width()-$("#mask").width() :x;
				y>$("#small").height()-$("#mask").height()? y=$("#small").height()-$("#mask").height():y;	
				$("#mask").css({
					left:x+"px",
					top:y+"px"
				})
				//算出比例
				var bilix=$("#big img").width()/$("#small").width();
				var biliy=$("#big img").height()/$("#small").height();
				$("#big").scrollLeft(bilix*x);
				$("#big").scrollTop(biliy*y);
			})
		})