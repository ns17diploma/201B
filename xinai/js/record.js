var jsf = require('jsonfile');
var filename = 'jsfile.json'
var chunk = require ('chunk')
var $ = require('jquery');

$(function(){

  let members = jsf.readFileSync(filename)

  if (members.length > 0) {

    let member_page_groups = chunk(members, 10)

    make_table(member_page_groups[0])

    if (member_page_groups.length > 1) {
      create_pagination(member_page_groups)
    }
  }
})

function make_table(members)
{
	var html_insert_table = ""
	for (var i in members) {

		html_insert_table = html_insert_table +
							'<tr><td>' + members[i].ISBN_Number+ '</td>' + 
							'<td>' + members[i].Category_code + '</td>' +
							'<td>' + members[i].Title + '</td>' + 
							'<td>' + members[i].Publisher + '</td>' +
	 						'<td>' + members[i].Author+ '</td>' + 
	 						'<td>' + members[i].Date_published + '</td>' + 
	 						'<td>' + members[i].In_stock + '</td>' + 
	 						'</tr>'; 
	}

	var html_table = '<table>' + 
						'<tr>' + 
							'<th>'+'ISBN_Number'+'</th>'+
							'<th>'+'Category_code'+'</th>'+
							'<th>'+'Title'+'</th>'+
							'<th>'+'Publisher'+'</th>'+
							'<th>'+'Author'+'</th>'+
							'<th>'+'Date_published'+'</th>'+
							'<th>'+'In_stock'+'</th>'+
						'</tr>'+
							html_insert_table + '</table>';

	$('section#content').html(html_table);
};

function create_pagination(pages) {

  $('#members-pagination').html('')

  for (var i = 0; i < pages.length; i++) {
    let item_html = `<span class="item" data-page="${i}">${i+1}</span>`
    $('#members-pagination').append(item_html)
  }
  $('#members-pagination span.item').click(function() {
    $this = $(this)
    make_table(pages[$this.data('page')]);
  });
}