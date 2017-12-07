var $ = require('jquery')
var jsf = require('jsonfile')
var fs = require('fs')
var filename = './allData/data.json';


$(function(){

	var empty = true
	$('.label').hide()

	function checkError() {
		checkISBN()
		checkTitle()
		checkPublisher()
		checkAuthor()
		checkDate()
		checkCategory()
		checkStock()
	}

	function checkISBN() {
		let theValue = $('#ISBN').val()
		var trueValue
		let result = 0
		if (theValue !== "") {
			for (var i = 0; i < theValue.length; i++) {
				if (theValue[i] === '-') {
					trueValue = theValue.replace(/-/g,'')
				} 
			}

			for (var q = 0; q < trueValue.length; q++) {
				if (trueValue[q] === "X") {
					trueValue[q - 1] += 1
					trueValue[q] = 0
				}
			}

			for (var x = 0; x < trueValue.length; x++) {
				let y = trueValue.length - x
				result += Number(trueValue[x]) * y
			}
			
		}
		if (theValue.length !== 13 || theValue.length === 0) {
			showError($('#ISBN_error'), "ISBN Number is not 13 characters!")
			$('#ISBN').parent().addClass('error')
		}
		if ((result % 11) !== 0 || theValue.indexOf(/[^X][a-zA-Z]/g !== -1)) {
			showError($('#ISBN_error'), "ISBN Number is not a valid modulus 11 number")
			$('#ISBN').parent().addClass('error')
		}
		if (theValue.length === 13 && (result % 11) === 0 && theValue.indexOf(/[^X][a-zA-z]/g)) {
			hideError($('#ISBN_error'))
			$('#ISBN').parent().removeClass('error')
		} 
		console.log(theValue)
		console.log(trueValue)
		console.log(result)
	}

	function checkTitle() {
		if ($('#getTitle').val() === "") {
			showError($('#title_error'), "Please input the title")
			$('#getTitle').parent().addClass('error')
		} else {
			hideError($('#title_error'))
			$('#getTitle').parent().removeClass('error')
		}
	}

	function checkPublisher() {
		if ($('#getPublisher').val() === "") {
			showError($('#publisher_error'), "Please input the publisher")
			$('#getPublisher').parent().addClass('error')
		} else {
			hideError($('#publisher_error'))
			$('#getPublisher').parent().removeClass('error')
		}
	}

	function checkAuthor() {
		if ($('#getAuthor').val() === "") {
			showError($('#author_error'), "Please input the author")
			$('#getAuthor').parent().addClass('error')
		} else {
			hideError($('#author_error'))
			$('#getAuthor').parent().removeClass('error')
		}	
	}

	function checkDate() {
		let theDate = ($('#getDate').val()).substr(0,4)
		if ($('#getDate').val() === "") {
			showError($('#date_error'), "Please input the date")
			$('#getDate').parent().addClass('error')
		} else if (Number(theDate) > 2017) {
			showError($('#date_error'), "Please input the correct date")
			$('#getDate').parent().addClass('error')
		} else {
			hideError($('#date_error'))
			$('#getDate').parent().removeClass('error')
		}
	}

	function checkCategory() {
		if ($('#getCategory').val() === "") {
			showError($('#category_error'), "Please input the category")
			$('#getCategory').parent().addClass('error')
		} else {
			hideError($('#category_error'))
			$('#getCategory').parent().removeClass('error')
		}
	}

	function checkStock() {
		if ($('#getStock').val() === "") {
			showError($('#stock_error'), "In Stock must be Y or N")
			$('#getStock').parent().addClass('error')
		}
		else {
			hideError($('#stock_error'))
			$('#getStock').parent().removeClass('error')
		}
	}

	function checkEmpty() {
		$('.getValue').each(function(){
			$this = $(this)
			if ($this.val() === "") {
				showError($('#form_error'), "Form is not complete!")
			} else {				
				empty = false
			}
		})
	}

	function showError(id, message) {
		id.show()
		id.html(message)
	}

	function hideError(id) {
		id.hide()
	} 
	
	function clearAll() {
		$('.getValue').each(function(){
			$this = $(this)
			$this.val("")
		})
	}

	function saveData() {
		if (!fs.existsSync(filename)) {
			jsf.writeFileSync(filename, [])
		}		
		let mainData = jsf.readFileSync(filename)
		let data = {
			ISBN : $('#ISBN').val(),
			Title : $('#getTitle').val(),
			Publisher : $('#getPublisher').val(),
			Author : $('#getAuthor').val(),
			Date : $('#getDate').val(),
			Category : $('#getCategory').val(),
			Stock : $('#getStock').val()
		}
		console.log('SUCCESSFUL')
		mainData.push(data)
		jsf.writeFileSync(filename, mainData, {spaces:2,EOL:'\r\n'})
		console.log('SUCCESSFUL')	
	}

	$('#saveBtn').click(function(){
		checkError()
		checkEmpty()
		if ($('#main *').hasClass('error') || empty === true) {
			alert('The Form is not complete!')
		} else {
			alert('Submit successful!')
			saveData()
			clearAll()
		}
	})

	$('#clearAll').click(clearAll())	
})