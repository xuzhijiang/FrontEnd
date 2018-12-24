function foo(i, j){
	var obj = [].slice.call(arguments, 2);
	console.log(obj)
	console.log(obj instanceof Array)
	console.log(typeof obj)
}