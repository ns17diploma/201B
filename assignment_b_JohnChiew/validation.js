var jsf = require('jsonfile');
var $ = require('jquery');
var chunk = require('chunk');
var fs = require('fs');
var file = 'data.json';
var data = {};

function submitForm() {
	if (!fs.existsSync(file)) {
		jsf.writeFileSync(file,[])
	}
		data.isbnN = $('#isbn').val();
		data.title = $('#title').val();
		data.publisher = $('#publisher').val();
		data.author = $('#author').val();
		data.datePublished = $('#datePublished').val();
		data.category = $('#category').val();
		data.inStock = $('#inStock').val();

		var containerData = jsf.readFileSync(file);
		containerData.push(data);
		jsf.writeFile('data.json', containerData, {EOL:'\r\n', spaces:2}, function(err){
			console.error(err)
		});
}

	//records table
	$(function(){

		var containerData = jsf.readFileSync(file);

		if (containerData.length > 0) {
			let members = chunk(containerData, 9);
	
			make_table(members[0]);

			if (members.length > 1) {
				pagination(members.length);
			}
		}
	})

	function make_table(containerData){

	$('#displayTable tbody').html('');
	for (var i in containerData){
		
		info = '<tr>'+
				'<th>'+'ISBN Number'+'</th>'+
				'<th>'+' : '+'</th>'+
				'<td>'+containerData[i].isbnN+'</td>'+
				'</tr>'+
				'<tr>'+
				'<th>'+'Title'+'</th>'+
				'<th>'+' : '+'</th>'+
				'<td>'+containerData[i].title+'</td>'+
				'</tr>'+
				'<tr>'+
				'<th>'+'Publisher'+'</th>'+
				'<th>'+' : '+'</th>'+
				'<td>'+containerData[i].publisher+'</td>'+
				'</tr>'+
				'<tr>'+
				'<th>'+'Author'+'</th>'+
				'<th>'+' : '+'</th>'+
				'<td>'+containerData[i].author+'</td>'+
				'</tr>'+
				'<tr>'+
				'<th>'+'Date Published'+'</th>'+
				'<th>'+' : '+'</th>'+
				'<td>'+containerData[i].datePublished+'</td>'+
				'</tr>'+
				'<tr>'+
				'<th>'+'Category Code'+'</th>'+
				'<th>'+' : '+'</th>'+
				'<td>'+containerData[i].category+'</td>'+
				'</tr>'+
				'<tr>'+
				'<th style="padding-bottom : 30px;">'+'In Stock'+'</th>'+
				'<th style="padding-bottom : 30px;">'+' : '+'</th>'+
				'<td style="padding-bottom : 30px;">'+containerData[i].inStock+'</td>'+
				'</tr>'
	
		$('#displayTable tbody').append(info);
	
	}
}
	
function pagination(pages) {
	let containerData = jsf.readFileSync(file)
	let members = chunk(containerData, 10)
	$('#members-pagination').html('');

	for(var i = 0; i < pages; i++){
		let item_html = `<span class="item" data-pages="${i}">${i+1}</span>`;
		$('#members-pagination').append(item_html);
	}

	$('#members-pagination span.item').click(function(){
		$this = $(this)
		make_table(members[$this.data('pages')]);
	});
}

//validation
$('.hideMessage').hide();
var result = false;

function checkError (element) {
	var isbnN = $('#isbn').val();
	var title = $('#title').val();
	var publisher = $('#publisher').val();
	var author = $('#author').val();
	var datePublished = $('#datePublished').val();
	var category = $('#category').val();
	var inStock = $('#inStock').val();

	
	function check_isbn() {
		var totalNumber = 0;
		var dash = isbnN.replace(/-/g, '');

		for (var i in dash){
			var x = dash.length - i;
			totalNumber = totalNumber + Number(dash[i]) * x;
		}

		if ( isbnN.length !== 13 && dash.length !== 10 || (totalNumber%11) !== 0 ) {
			$('.errorMessage01').show();
			result = false;
			return result;
		}
		else {
			$('.errorMessage01').hide();
			result = true;
		}

	}

	function check_title() {
		if (title === "") {
			$('.errorMessage02').show();
			result = false;
			return result;
		} else {
			$('.errorMessage02').hide();
		}
	}

	function check_publisher() {
		if (publisher === "") {
			$('.errorMessage03').show();
			result = false;
			return result;
		} else {
			$('.errorMessage03').hide();
		}
	}

	function check_author() {
		if (title === "") {
			$('.errorMessage04').show();
			result = false;
			return result;
		} else {
			$('.errorMessage04').hide();
		}
	}

	function check_date_published() {
		if (datePublished === "") {
			$('.errorMessage05').show();
			result = false;
			return result;
		} else {
			$('.errorMessage05').hide();
		}
	}

	function check_category() {
		if (category === "") {
			$('.errorMessage06').show();
			result = false;
			return result;
		} else {
			$('.errorMessage06').hide();
		}
	}

	function check_inStock() {
		if (inStock === "") {
			$('.errorMessage07').show();
			result = false;
			return result;
		} else {
			$('.errorMessage07').hide();
		}
	}

	check_isbn();
	check_title();
	check_publisher();
	check_author();
	check_date_published();
	check_category();
	check_inStock();
}

//Save record and do check error
function submit() {	
	checkError();
	if (result === false) {
		console.error('ERROR')
	} else {
		console.log('YEAH')
		submitForm();
	}
}