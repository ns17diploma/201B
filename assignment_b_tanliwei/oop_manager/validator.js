////REQUIRE SOURCE
const $ = require('jquery')
const ViewManager = require('./view_manager(function)')
const vm = new ViewManager()
class Validator {

/*********************************************/
/* VALIDATE JOIN DATE FORMAT CORRECT*/

	date(obj){
      if ($('#date').val().length > 10 ) {
        vm.error_message('#date', 'Incorrect Date of Join Format');
      }else{
        vm.remove_error_message('#date');
      }
  	}
      
    /**********************************************/
    ////ISBN NUMBER VALIDATE REMOVE DASH

//把X换成0 最后modulus_eleven+10
  isbn_number(obj){
      var remove_dash = $('#isbn_number').val().replace(/-/g, '');
      var modulus_eleven = 0;
      for(var i = 0; i<remove_dash.length; i++){
        let x = 10 - i;
        modulus_eleven += remove_dash[i] * x;
      } 

  var test = $('#isbn_number').val().search(/X/g);
    ////ISBN NUMBER VALIDATE 13 DIGITS
      if ($('#isbn_number').val().length !== 13) {
        vm.error_message('#isbn_number', 'ISBN Number is not 13 digits');
      }else{
        if (test == 12) {
          var modulus_eleven = 176;
        }
        if (modulus_eleven % 11 !== 0) {
          console.log(modulus_eleven);
          vm.error_message('#isbn_number', 'ISBN Number is not a valid modulus 11 number');
        }else{
          vm.remove_error_message('#isbn_number');
          console.log(modulus_eleven);
        }    
      }
  	}

/**********************************************/
    ////TITLE VALIDATE NOT EMPTY

  	title_case(obj){
      if ($('#title').val() === "" || $('#title').val() === " ") {
        vm.error_message('#title', 'Incorrect Title Format');
      }else{
        vm.remove_error_message('#title');
      }
  	}

    /**********************************************/
    ////PUBLISHER VALIDATE NOT EMPTY
  	publisher_case(obj){
      if ($('#publisher').val() === "" || $('#publisher').val() === " ") {
        vm.error_message('#publisher', 'Incorrect Publisher Format');
      }else{
        vm.remove_error_message('#publisher');
      }
  	}

    /**********************************************/
    ////AUTHOR VALIDATE NOT EMPTY

    author_case(obj){
      if ($('#author').val() === "" || $('#author').val() === " ") {
        vm.error_message('#author', 'Incorrect Author Format');
      }else{
        vm.remove_error_message('#author');
      }
  	}
}
module.exports = Validator