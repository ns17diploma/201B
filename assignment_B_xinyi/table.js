
var jsonfile = require('jsonfile')
var file = 'jsfile.js'
var $ = require('jquery');
var chunk = require('chunk')

$(function(){
	let numbers = jsonfile.readFileSync(file)
	if (numbers.length > 0){
		let number_page = chunk(numbers, 10)
		make_table(number_page[0])
		if (number_page.length > 1){
			create_pagination(number_page)
		}
	}
});

function make_table(numbers) {
	var html_table_inside=""
	for(var i in numbers){
		html_table_inside = html_table_inside +'<tr><td>'+numbers[i].ISBN_Number+'</td>'+
				'<td>'+numbers[i].Date_published+'</td>'+
				'<td>'+numbers[i].Title+'</td>'+
				'<td>'+numbers[i].Publisher+'</td>'+
				'<td>'+numbers[i].Author+'</td>'+
				'<td>'+numbers[i].Category_code+'</td>'+
				'<td>'+numbers[i].In_Stock+'</td>'+ '</tr>';
	}

	var html_table = '<table>' +
					'<tr>'+
						'<th>'+'ISBN_Number'+'</th>'+
						'<th>'+'Date_Published'+'</th>'+
						'<th>'+'Title'+'</th>'+
						'<th>'+'Published'+'</th>'+
						'<th>'+'Author'+'</th>'+
						'<th>'+'Category_code'+'</th>'+'</th>'+
						'<th>'+'In_stock'+'</th>'+
					'</tr>'
					+ html_table_inside + '</table>';

	$('section#content').html(html_table);
}

function create_pagination(pages){
	$('#number-pagination').html('')

	for (var i = 0; i < pages.length; i++){
		let item_html = `<span class="item" data-page="${i}">${i+1}</span>`
		$('#number-pagination').append(item_html)
	}
	$('#number-pagination span.item').click(function(){
		$this = $(this)
		make_table(pages[$this.data('page')]);
	});
}