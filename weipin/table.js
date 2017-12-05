var jsf = require('jsonfile');
var $ = require('jquery');
var file = 'jsfile.json';
var chunk = require('chunk');
var books = jsf.readFileSync(file);

$(function(){
	let booksGroup = chunk(books,10);
	htmlTable(booksGroup[0]);
	if ( booksGroup > 1 ) {
		createPage(booksGroup);
	}
})	

function htmlTable() {
	$('#table').html();
	var booksRecord = "";
	for( var i in books )	{
		booksRecord = booksRecord + '<tr>' + '<td>' + 'ISBN Number: &nbsp;&nbsp;' + books[i].ISBN_Number + '</td>' + '</tr>' + 
						'<tr>' + '<td>' + 'Category: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + books[i].Category + '</td>' + '</tr>' + 
						'<tr>' + '<td>' + 'Title: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + books[i].Title + '</td>' + '</tr>' + 
						'<tr>' + '<td>' + 'Publisher: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + books[i].Publisher + '</td>' + '</tr>' + 
						'<tr>' + '<td>' + 'Author: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + books[i].Author + '</td>' + '</tr>' + 
						'<tr>' + '<td>' + 'Date published: &nbsp;' + books[i].Date + '</td>' + '</tr>' + 
						'<tr>' + '<td>' + 'In stock: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + books[i].Stock + '</td>' + '</tr>' + 
						'<tr>' + '<td>' + '&nbsp;' + '</td>' + '<tr>'
	}

	$('#table').html(booksRecord);
}

function createPage(page) {
	let booksGroup = chunk(books, 10)
	for (var i = 0; i < page.length; i++) {
		let pages = `<span class="item" data-page="${i}"><button>${i+1}<button></span>`;
		$('#pages').append(pages);
	}
	$('#pages span.item').click(function(){
		$this = $(this);
		htmlTable(membersGroup[$this.data('pages')]);
	})
}