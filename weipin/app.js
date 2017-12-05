var $ = require('jquery');
var fs = require('fs');
var jsf = require('jsonfile');

function error() {
	$('.error').hide();

	if (!fs.existsSync('jsfile.json')) {
		jsf.writeFileSync('jsfile.json', []);
	}
}

function record() {
	var obj = {
		ISBN_Number: $('#isbnN').val(),
		Category: $('#category').val(),
		Title: $('#title').val(),
		Publisher: $('#publisher').val(),
		Author: $('#author').val(),
		Date: $('#datePublished').val(),
		Stock: $('#stock').val(),
	}

	var arr = jsf.readFileSync('jsfile.json');
	arr.push(obj);
	jsf.writeFileSync('jsfile.json',arr,function(err){
		console.log(err);
	})
}

var validate = false;

function detect() {
	
	var isbn = $('#isbnN').val();
	var category = $('#category').val();
	var title = $('#title').val();
	var publisher = $('#publisher').val();
	var author = $('#author').val();
	var date = $('#datePublished').val();
	var stock = $('#stock').val();

	function isbnNCheck() {
		var replaceDash = isbn.replace(/-/g, '');
		var findX = replaceDash.substr(-1);
		var sliceX = Number(replaceDash.slice(0, -1));
		isbnTotal = 0;
		isbnTotalX = 0;
		isbnTotalTotalX = 0;
		for (var i = 0; i < replaceDash.length; i++) {
			let x = 10 - i;
			isbnTotal = isbnTotal + Number(replaceDash[i]) * x;
		}

		if ( findX == 'x' || findX == 'X' ) {
			for (var i = 0; i < sliceX.length; i++) {
				let y = 9 - i;
				isbnTotalX = isbnTotalX + Number(sliceX[i]) * y;
				isbnTotalTotalX = isbnTotalX + 10;
			}
			if ( (isbnTotalTotalX % 11) !== 0 ) {
				$('.isbnError4').show();
				validate = false;
			}
			else {
				$('.isbnError4').hide();
				validate = true;
			}
		}
		else {
			if ( isbn == "" || isbn.length !== 13 || replaceDash.length !== 10 || (isbnTotal % 11) !== 0 ) {
				$('.isbnError').show();
				validate = false;
			}
			else {
				$('.isbnError').hide();
				validate = true;
			}
				return validate;
		}
	}

	function categoryCheck() {
		if ( category == "" ) {
			$('.categoryError').show();
			validate = false;
		}
		else {
			$('.categoryError').hide();
			validate = true;
		}
		return validate;
	}

	function titleCheck() {
		if ( title == "" ) {
			$('.titleError').show();
			validate = false;
		}
		else {
			$('.titleError').hide();
			validate = true;
		}
		return validate;
	}

	function publisherCheck() {
		if ( publisher == "" ) {
			$('.publisherError').show();
			validate = false;
		}
		else {
			$('.publisherError').hide();
			validate = true;
		}
		return validate;
	}

	function authorCheck() {
		if ( author == "" ) {
			$('.authorError').show();
			validate = false;
		}
		else {
			$('.authorError').hide();
			validate = true;
		}
		return validate;
	}

	function dateCheck() {
		if ( date == "" || date.length !== 10 ) {
			$('.dateError').show();
			validate = false;
		}
		else {
			$('.dateError').hide();
			validate = true;
		}
		return validate;
	}

	function stockCheck() {
		if ( stock == "" ) {
			$('.stockError').show();
			validate = false;
		}
		else {
			$('.stockError').hide();
			validate = true;
		}
		return validate;
	}

	categoryCheck();
	publisherCheck();
	titleCheck();
	dateCheck();
	authorCheck();
	stockCheck();
	isbnNCheck();
}


$('#submit').on('click',function(){
	detect();
	if ( validate === true ) {
		record();
		alert("Success");
		location.reload();
	}
	else {
		alert("Please complete form");
	}
})



