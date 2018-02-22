var Person = function(){
	
}
/**********************************************/
/*GET MEMBER DATA VALUE*/

class Member{

	constructor(
 		isbn_number,
		title,
		publisher,
		date,
		author,
		category,
		check_box
		){
              this.isbn_number = isbn_number
              this.title = title
              this.publisher = publisher
              this.date = date
              this.author = author
              this.category = category
              this.check_box = check_box	
	       }
        
       transformObj(){
       	
	return{
		'isbn_number' : this.isbn_number,
		'title' : this.title,
		'publisher' : this.publisher,
		'date' : this.date,
		'author' : this.author,
		'category' : this.category,
		'check_box' : this.check_box
		}
	}
}

module.exports = Member