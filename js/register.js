function yzm(){
			tempCode = ""
			var codeArr=["a","v","c","h","f","g","j","k","l","z","x",1,3,2,4,5,0,6,7,8,9,"A","B","C","D","W","Z"];
			var tempStr=codeArr[Math.floor(Math.random()*codeArr.length)];
			//console.log(tempStr)
			for(var i=0;i<4;i++){
				var tempStr=codeArr[Math.floor(Math.random()*codeArr.length)];
				tempCode+=tempStr;
			}
			$(".yzmTxt").html(tempCode)
			return tempCode
		}
		yzm()
		
		load()
		function load(){
			//用户名
			//失去焦点时发生
			$(".username").blur(function(){
				var usernameReg = /^[a-z0-9_-]{3,16}$/
				if($(".username")[0].value){
					if(usernameReg.test($(".username")[0].value)){
						$(".userTxt").html("√")
						$(".userTxt").css("color","green")
						$(".userTxt").css("font-weight","bold")
					}else{
						$(".userTxt").html("×用户名格式不正确")
						$(".userTxt").css("color","red")
						$(".userTxt").css("font-weight","bold")
					}
				}else{
					$(".userTxt").html("请输入用户名")
					$(".userTxt").css("color","red")
				}
				
			})
			//获取焦点时发生
			$(".username").focus(function(){
				$(".userTxt").html("")
			})
			
			//手机--失去焦点时
			$(".phone").blur(function(){
				var phoneReg = /^1(3|4|5|7|8)\d{9}$/
				if($(".phone")[0].value){
					if(phoneReg.test($(".phone")[0].value)){
						$(".phoneTxt").html("√")
						$(".phoneTxt").css("color","green")
						$(".phoneTxt").css("font-weight","bold")
					}else{
						$(".phoneTxt").html("×手机号不正确")
						$(".phoneTxt").css("color","red")
	//					$(".phoneTxt").css("font-weight","bold")
					}
				}else{
					$(".phoneTxt").html("请输入手机号")
					$(".phoneTxt").css("color","red")
				}
			})
			//获取焦点时
			$(".phone").focus(function(){
				$(".phoneTxt").html("")
			})
			
			//验证码
			
			var code = yzm()
			$(".yzm").blur(function(){
				var resCode = $(".yzm")[0].value.toLocaleLowerCase()
				if(resCode==code.toLocaleLowerCase()){
					$(".res").html("√")
					$(".res").css("color","green")
					$(".res").css("font-weight","bold")
				}else{
					$(".res").html("×")
					$(".res").css("color","red")
				}
			})
			$(".yzm").focus(function(){
				$(".res").html("")
			})
			
			//换一张
			$(".change").click(function(){
				yzm()
			})
			
			//邮箱
//			var email = document.getElementsByClassName("email")[0]
//			email.onblur = function(){
//				
//			}
			$(".email").blur(function(){
				var emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
				if($(".email")[0].value){
					if(emailReg.test($(".email")[0].value)){
						$(".emailTxt").html("√")
						$(".emailTxt").css("color","green")
						$(".emailTxt").css("font-weight","bold")
					}else{
						$(".emailTxt").html("×邮箱格式不正确")
						$(".emailTxt").css("color","red")
					}
				}else{
					$(".emailTxt").html("请输入邮箱")
					$(".emailTxt").css("color","red")
				}
			})
			//
			$(".email").focus(function(){
				$(".emailTxt").html("")
			})
			
			//密码
			$(".password").blur(function(){
				var psdReg = /^[a-zA-Z]\w{5,17}$/
				if($(".password")[0].value){
					if(psdReg.test($(".password")[0].value)){
						$(".psdTxt").html("√")
						$(".psdTxt").css("color","green")
						$(".psdTxt").css("font-weight","bold")
					}else{
						$(".psdTxt").html("×密码格式不正确")
						$(".psdTxt").css("color","red")
					}
				}else{
					$(".psdTxt").html("请输入密码")
					$(".psdTxt").css("color","red")
				}
			})
			$(".password").focus(function(){
				$(".psdTxt").html("")
			})
			//再次输入，确认密码
			$(".confirm_password").blur(function(){
				if($(".confirm_password")[0].value){
					if($(".confirm_password")[0].value==$(".password")[0].value){
						$(".confirmTxt").html("√")
						$(".confirmTxt").css("font-weight","bold")
						$(".confirmTxt").css("color","green")
					}else{
						$(".confirmTxt").html("×密码不一致")
						$(".confirmTxt").css("color","red")
					}
				}else{
					$(".confirmTxt").html("请再次输入密码")
					$(".confirmTxt").css("color","red")
				}
			})
			$(".confirm_password").focus(function(){
				$(".confirmTxt").html("")
			})
		}
		var ck= document.getElementById("agree")
		ck.onchange = function(){
			if(ck.checked){
				$(".agreeTxt").html("")
			}
		}
		
		$("#regsiter_btn").click(function(){
			//load()
			var username = $(".username")[0].value
			var phone = $(".phone")[0].value
			var email = $(".email")[0].value
			var psd = $(".password")[0].value
			var agree = document.getElementById("agree")
//			console.log(agree)
			
			if(username&&phone&&email&&psd){
				if(ck.checked){
					var arr = localStorage.user;
					//localStorage.clear()
					if(!arr){
						localStorage.user = "[]";
					}
					arr = JSON.parse(localStorage.user);
					
					var obj = {
						"user":username,
						"phone":phone,
						"email":email,
						"password":psd
					};
					arr.push(obj);
//					console.log(arr)
					var userDate =JSON.stringify(arr)
					//localStorage.user=JSON.stringify(arr)
					save.setDate({
						"name":"user",
						"value":userDate
					})
					alert("注册成功，跳转到登录页")
					location.href = "login.html"
				}else{
					$(".agreeTxt").html("请阅读服务协议并同意")
					$(".agreeTxt").css("color","red")
				}
			}else{
				if(!username){
					$(".userTxt").html("请输入用户名")
					$(".userTxt").css("color","red")
				}
				if(!phone){
					$(".phoneTxt").html("请输入手机号")
					$(".phoneTxt").css("color","red")
				}
				if(!email){
					$(".emailTxt").html("请输入邮箱")
					$(".emailTxt").css("color","red")
				}
				if(!psd){
					$(".psdTxt").html("请输入密码")
					$(".confirmTxt").html("请再次输入密码")
					$(".psdTxt").css("color","red")
					$(".confirmTxt").css("color","red")
				}
				if(!ck.checked){
					$(".agreeTxt").html("请阅读服务协议并同意")
					$(".agreeTxt").css("color","red")
				}
			}
		})
