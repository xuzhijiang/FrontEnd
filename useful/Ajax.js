//Ajax Demo
//XHR: ajax object
var xhr = new XMLHttpRequest();//create XHR对象

xhr.onreadystatechange = function(callback){//callback
	if(xhr.readyState == 4){
		if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
			callback(xhr.responseText);
		}else{
			alert('Request was unsuccessful: ' + xhr.status);
		}
	}
}
xhr.open('get', 'example.json', true);
xhr.setRequestHeader('myHeader', 'myValue');
xhr.send(null);//send request

//Request parameter serialization
xhr.open('get', 'example.json?' + 'name1=value1&name2=value2', true)
//{name1:value1,name2:value2}
function serialize(data){
	if(!data) return '';
	var pairs = [];
	for(var name in data){
		if(!data.hasOwnProperty(name)) continue;
		if(typeof data[name] === 'function') continue;
		var value = data[name].toString();
		name = encodeURIComponent(name);
		value = encodeURIComponent(value);
		pairs.push(name + '=' + value);
	}
	return pairs.join('&');
}

//Get Request
var url = 'example.json?' + serialize(formdata);
xhr.open('get', url, true);
xhr.send(null);
//get方法，所以send(null)

//Post Request
xhr.open('post', 'example.json', true);
xhr.send(serialize(formdata));

xhr.open(method, url[ ,async = true]);
		  GET    source
		  POST   ./source
		  DELETE ../source
		  HEAD 
		  OPTIONS
		  PUT

//setRequestHeader
xhr.setRequestHeader(header, value);
					Content-Type  application/x-www-form-unlencoded //submit is the form
								   multipart/form-data //Upload is a file

xhr.send([data = null]);
			String 
			FormData

//initial value
//readyState:0

//调用XHR的open()方法的时候，readyState会变为1
//调用open()是开启一个请求准备发送，但还没有向服务器端发起一个请求

//然后调用send()方法,正式的想服务器发起请求，这个时候，readyState这个属性就会变为2

//当服务器端开始返回请求数据的时候，浏览器接受到数据，readyState：3

//当浏览器端结束请求的时候，readyState:4, status:200,表示请求成功，responseText:<!DOCTYPE html>

//可以用xhr.onload代替xhr.onreadystatechange, 不同在于
//onload是在readyState=4,status=200的时候才会触发

