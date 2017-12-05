var jsf = require('jsonfile');
var filename = 'jsfile.json';	
var fs = require('fs')
var $ = require('jquery');

$(function() {
	$('#error0').hide();
	$('#error00').hide();
	$('#error01').hide();
	$('#error02').hide();
	var $result = false

	$('#save').click(function(){
		modules()
		empty()
		if ($result === false ) {
		console.log('ERROR')	
		$('#error00').hide();
		}

		else {
		submit();
		$('#error00').show();
		console.log("YES")
		} 
	})

	function empty() {
		//input error
		$('.input').each(function(){
			$this = $(this)
			if ($this.val() === "") {
				error('#message-box', $('#error0').show())
				$result = false
			} else {
				no_error('#message-box', $('#error0').hide())
				$result = true				
			}
			return $result
		})
	}

	$('#number1').on('keyup',function(){
		let mn = $('#number1').val();
		let ms = mn.toString();
		if (ms.length > 10) {
			var c = ms.substr((Number(ms.length)-10), 10);
			$('#number1').val(c);
		} 
		else if (ms.length !== 10) {
			error('#number1', $('#error02').show());
			$result = false
		}
		else if (ms.length === 10) {
			no_error('#number1', $('#error02').hide());
			$result = true
		}
	})

	function modules() {
		let number = 0;
		let mn = $('#number1').val();
		let ms = mn.toString();
		for(var i = 0; i< ms.length; i++){
		    let x = 10 - i;
		    number += Number(ms[i]) * x;
		}
		if ((number % 11) !== 0 || ms.length !== 10) {
		    error('#number1', $('#error01').show())
		    $result = false
		}
		
		else if ((number % 11) === 0 && ms.length === 10) {
			$('#error02').hide()
		  	no_error('#number1', $('#error01').hide())	
		  	$result = true
		}
		return $result
	}

	function submit(){
		obj = {
			ISBN_Number: $('#number1').val(),
			Category_code: $('#code').val(),
			Title: $('#title').val(),
			Publisher: $('#publisher').val(),
			Author: $('#author').val(),
			Date_published: $('#date').val(),
			In_stock: $('#stock').val()
		}
		if (!fs.existsSync(filename)) {
    	jsf.writeFileSync(filename, [])
  		}		
		var arr = jsf.readFileSync(filename);
		arr.push(obj);
		jsf.writeFileSync(filename,arr,{spaces: 1, EOL:'\r\n'});
	}
});

/***********************/
function error(input_id, message)
{
	let themessage = "";
 	$(input_id).after(themessage);
  	$(input_id).closest('.field').addClass('error')
}

function no_error(input_id, message)
{
	let themessage = "";
 	$(input_id).after(themessage);
  	$(input_id).closest('.field').removeClass('error')
}