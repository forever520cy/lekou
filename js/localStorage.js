var save = {
	setDate:function(v){
		var name = v.name
		var value = v.value
		localStorage.setItem(name,value)
	},
	getDate:function(type,dates,fn){
		var dateArr = JSON.parse(localStorage.getItem(type))
		//console.log(dateArr)
		for(var i=0;i<dateArr.length;i++){
			if(dates==dateArr[i].user){
				fn(dateArr[i],i)
				return
			}
		}
		fn(-1)
	}
}
