var jsf = require('jsonfile');
var jsfile = 'jsfile.json'
var $ = require('jquery');
var chunk = require('chunk');
let members = jsf.readFileSync(jsfile);

$(function(){

  let members = jsf.readFileSync(jsfile);
  if (members.length > 0) {
    let member_page_groups = chunk(members, 10)
    make_table(member_page_groups[0])
    if (member_page_groups.length > 1) {
      create_pagination(member_page_groups)
    }
  }
})

function make_table(members){
  $('#members-table tbody').html('')
	for( var i in members){	
		var membersdata = "<tr><td>" + members[i].ISBM_Number + "</td>" +
							  '<td>' + members[i].Title + "</td>" +
							  '<td>' + members[i].Publisher + "</td>" +
							  '<td>' + members[i].Author + "</td>" +
							  '<td>' + members[i].Date + "</td>" +
							  '<td>' + members[i].Category_code + "</td>" +
							  '<td>' + members[i].In_stock + "</td>"+"<tr>"
	$('#members-table tbody').append(membersdata)
	}
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