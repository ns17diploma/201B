var jsonfile = require('jsonfile');
var file = "data.json";
var fs = require('fs');

if (!fs.existsSync(file)) {
	fs.mkdirSync('allData')
	fs.writeFileSync(file, '[]')
}
		var data = "";

/****************************************************************/
function validation() {
	var ISBN_number = document.getElementById('ISBN_number').value;
	var title = document.getElementById('title').value;
	var publisher = document.getElementById('publisher').value;
	var author = document.getElementById('author').value;
	var date_published = document.getElementById('date_published').value.toString();

	var point = 0;
	var point2 = 10;
	calculate = 0;
	str = ISBN_number.toString();
	Char_1 = str.charAt(1);
	Char_4 = str.charAt(4); 
	Char_11 = str.charAt(11); 
	char_a = str.substr(0,1);
	char_b = str.substr(2,2);
	char_c = str.substr(5,6);



/***********************************************************************************/
	if (str.length == 13) {
			//remove "-"
		for (var i = 0; i < str.length; i++) {
			//str[i]
			if (str[i] == "-") {
				var str = str.replace("-","")
			}
		}
		var newStr = str;

	//convert X to 10, calculate the modulus
		for (var m = 0; m < newStr.length; m++) {
			
			if (newStr[m] == "X") {
				var newStr= str.replace("X", 1);
				var calculate = calculate + 9;
				
			}
			calculate = calculate + (newStr[m] * point2)
			point2--;

		}
		var modulus = calculate % 11;
		console.log("modulus = " + modulus);

		if (modulus == 0) {
			point++
			console.log("point 0")
		}

	} else {
		document.getElementById('label_ISBN_number').style.display = 'block'; 
		document.getElementById('validate_ISBN_number').classList.add("error"); 
	}
	
	if (title.length > 0) { 
		point++  
		console.log("point1")
	} else {
		document.getElementById('label_title').style.display = 'block'; 
		document.getElementById('validate_title').classList.add("error"); 
	}
	
	if (publisher != "") { 
		point++  
		console.log("point2")
	} else {
		document.getElementById('label_publisher').style.display = 'block'; 
		document.getElementById('validate_publisher').classList.add("error"); 
	}
	
	if (author != "") { 
		point++  
		console.log("point3")
	} else {
		document.getElementById('label_author').style.display = 'block';
		document.getElementById('validate_author').classList.add("error");  
	}
	
	if (date_published.length == 10 ) { 
		point++ 
		console.log("point4") 
	} else {
		document.getElementById('label_date_published').style.display = 'block';
		document.getElementById('validate_date_published').classList.add("error");  
	}

	console.log(point)

	if (point == 5) {
		submitform();
		document.getElementById('myModal').style.display = "block";
	}

}
//Modal function
function clickSpan() {
	document.getElementById('myModal').style.display = "none";
}function clickSpan() {
	location.reload();
}

var newData = {}

function submitform() {

	newData.ISBN_number = document.getElementById('ISBN_number').value;
	newData.title = document.getElementById('title').value;
	newData.publisher = document.getElementById('publisher').value;
	newData.author = document.getElementById('author').value;
	newData.date_published = document.getElementById('date_published').value
	
	let data = jsonfile.readFileSync(file);
	data.push(newData);

	jsonfile.writeFile(file, data, {spaces:2,EOL:'\r\n'}, function (err) {
		console.error(err);
		return;
	})

	
}

