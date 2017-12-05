var fs = require('fs');
var jsf = require('jsonfile');
var filename = ('jsfile.js');
var $ = require('jquery');
var jQuery = $;
var chunk = require('chunk');

//1641807090542

$(function(){

	$('#error00').hide();
	$('#error01').hide();
	$('#error02').hide();
	$('#error03').hide();
	var $result = false	 

	$('#button').click(function(){
		checkValidate()
		check()
	 	if ($result === false) {
			console.log('ERROR')
			$('#error00').hide();	
		}
		else { 
			checkform();
			console.log("YES")
			$('#error00').show();
		}
	})

	$('#input_number').on('keyup',function(){

		var x=this.value;
		var y=x.toString();
		if (y.length>13) {
			var z=y.substr((Number(y.length)-13),13);
			$('#input_number').val(z);
		}

		if (y.length !== 13){
			error_label('#input_number',$('#error03').show());
			$result = false;
		}

		else{
			reroo_label('#input_number',$('#error03').hide());
			$result = true
		}
	})

	function checkform(){
		var obj = {
			ISBN_Number:$('#input_number').val(),
			Date_published:$('#input_date_published').val(),
			Title:$('#input_title').val(),
			Publisher:$('#input_publisher').val(),
			Author:$('#input_author').val(),
			Category_code:$('#input_category_code').val(),
			In_Stock:$('#input_in_stock').val()
		} 
		if (!fs.existsSync(filename)) {
    		jsf.writeFileSync(filename, [])
 		}
		var arr=jsf.readFileSync(filename);
		console.log(arr)
		arr.push(obj);
		jsf.writeFileSync(filename,arr, {spaces:2});
	};

	function check(){
		$('.input').each(function(){
			let $this = $(this)
			if ($this.val() === ""){
				error_label('#message-box',$('#error01').show())
				$result = false
			}
			else{
				reroo_label('#message-box',$('#error01').hide())
				$result = true
			}
			return $result
		})
	}
})

	function checkValidate(){
		let x = $('#input_number').val();
		let y = x.toString();
		let z = 0;

		for(var i = 0; i<y.length;i++){
			let l = 13- i;
			z += Number(y[i]) * l;
		}
		console.log(typeof y)
		console.log(z)
		if ((z % 11) !== 0 || y.length !== 13){
			error_label('#input_number',$('#error02').show())
			console.log("NO")
			$result = false
		}
		else if ((z % 11) === 0 || y.length === 13){
			reroo_label('#message-box',$('#error02').hide());
			console.log('YES')
			$result = true
		}
	}

	function error_label(input_id,message){
		let html=""
		$(input_id).after(html);
		$(input_id).closest('.field').addClass('error')
	}

	function reroo_label(input_id,message){
		let html=""
		$(input_id).after(html);
		$(input_id).closest('.field').removeClass('error')
	}