app_js = 'app.js';
chunk = require('chunk');

$(function(){

  let members = jsf.readFileSync(file)

  if (members.length > 0) {    

    let member_page = chunk(members, 10)

    make_table(member_page[0])

    if (member_page.length > 1) {
      create_pagination(member_page)
    }
  }


})

function make_table(members)
{

  $('#members-table tbody').html('')
  for (var i in members) {

  let member_row_html = 
  '<tr>'+
    '<td>'+'ISBN Number'+'</td>'+
    '<td>'+ members[i].ISBNNum +'</td>'+
  '</tr>'+
  '<tr>'+
    '<td>'+'Title'+'</td>'+
    '<td>'+ members[i].Title +'</td>'+
  '</tr>'+
  '<tr>'+
    '<td>'+'Publisher'+'</td>'+
    '<td>'+ members[i].Publisher +'</td>'+
  '</tr>'+
  '<tr>'+
    '<td>'+'Date Published'+'</td>'+
    '<td>'+ members[i].DatePublished +'</td>'+
  '</tr>'+
  '<tr>'+
    '<td>'+'Author'+'</td>'+
    '<td>'+ members[i].Author +'</td>'+
  '</tr>'+
  '<tr>'+
    '<td>'+'Category Code'+'</td>'+
    '<td>'+ members[i].CategoryCode +'</td>'+
  '</tr>'+
  '<tr>'+
    '<td>'+'In Stock'+'</td>'+
    '<td>'+ members[i].InStock +'</td>'+
  '</tr>'+
  '<tr>'+
    '<td style="padding-bottom:20px">'+'</td>'+
    '<td style="padding-bottom:20px">'+'</td>'+
  '</tr>'
  ///////
    $('#members-table tbody').append(member_row_html)
  }
}

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
