const cnode = 'https://cnodejs.org';

export let interfaces = {
	topics:cnode+'/api/v1/topics'
}
export let $http={};
$http.get = function(url,data={},header={}){
	return new Promise((resolve,reject)=>{
		uni.request({
			url,
			method:"GET",
			data,
			success(res) {
				if(res.statusCode>=200 && res.statusCode<300){
					resolve(res.data.data)
				}else{
					reject(res)
				}
			},
			fail(error) {
				reject(error)
			}
		})
	})
}
$http.post = function(url,data={}){
	return new Promise((resolve,reject)=>{
		uni.request({
			url,
			method:"POST",
			data,
			success(res) {
				if(res.statusCode>=200 && res.statusCode<300){
					resolve(res.data.data)
				}else{
					reject(res)
				}
			},
			fail(error) {
				reject(error)
			}
		})
	})
}
