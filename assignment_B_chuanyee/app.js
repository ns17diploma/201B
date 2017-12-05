
var jsf = require ('jsonfile');
var filename ='jsonfile.json'
var fs = require('fs')
var $ = require('jquery');

function error() {

	$('#error0').hide();
	$('#error01').hide();
	$('#error02').hide();
	$('#error03').hide();
	

}

$(function(){
	error()
	function write(){
		var obj = {
			Number: $('#number').val(),
			Date: $('#date').val(),
			Title: $('#title').val(),
			Publisher: $('#publisher').val(),
			Author: $('#author').val(),
			Code: $('#code').val(),
			Stock: $('#stock').val()
		}

		if (!fs.existsSync(filename)) {
    	jsf.writeFileSync(filename, [])
    	}
		var arr = jsf.readFileSync(filename);
		arr.push(obj);
		jsf.writeFileSync(filename,arr,{spaces:1});	
	}

	$('#error0').hide();
	$('#error01').hide();
	$('#error02').hide();
	$('#error03').hide();
	

	$('#save').click(function(){
		// $('#error0').show();

		modules();
		
		if ($result === false /*|| $('body *').hasClass('error')*/) {
		$('#error01').hide();
		$('#error02').hide();
		$('#error03').hide();
		$('#error0').show();	

		}

		else {
		write();
		$('#success').show();
		} 
	})

	var result = true;

/**************************************/

	$('#number').on('keyup',function(){
		let mn = $('#number').val();
		let ms = mn.toString();
		if (ms.length > 10) {
			var c = ms.substr((Number(ms.length)-10), 10);
			$('#number').val(c);
		} 
		else if (ms.length !== 10) {
			$('#error02').show();
			$result = false
		}
		else if (ms.length === 10) {
			$('#error02').hide();
			$result = true
		}
	})

	function modules() {
		let number = 0;
		let mn = $('#number').val();
		let ms = mn.toString();
		for(var i = 0; i< ms.length; i++){
		    let x = 10 - i;
		    number += Number(ms[i]) * x;
		}

		if ((number % 11) !== 0 || ms.length !== 10) {
		    $('#error01').show()
		    $result = false
		}
		
		else if ((number % 11) === 0 && ms.length === 10) {
		  	$('#error01').hide()	
		  	$result = true
		}

		return $result
	}


});
