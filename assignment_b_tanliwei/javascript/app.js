let jsf = require('jsonfile');
let $ = require('jquery');
let file = 'members.json';
let status = true;
///////////////save form value

  $(function(){
    $('#save_button').on('click',function(){
      if ($('.field').hasClass('error')) {

        let upper_message = `
        <div class="ui negative message error-message">
        <i class="close icon"></i>
        <div class="header">
          Register Form Submit Fail.
        </div>
        <p>Some Error is in Your Form Please Try Again</p>
        </div>
      `
      $('#message_box').html(upper_message)
      }else{
        let upper_message = `
        <div class="ui negative message success">
        <i class="close icon"></i>
        <div class="header">
          Register Form Successful!.
        </div>
        <p>Your Form Register is Successful, Thank You</p>
        </div>
        `
        $('#message_box').html(upper_message)
        var obj = {
        ISBNNum:$('#isbn_number').val(),
        Title:$('#title').val(),
        Publisher:$('#publisher').val(),
        DatePublished:$('#date').val(),
        Author:$('#author').val(),
        CategoryCode:$('#category').val(),
        InStock:$('#check_box').val(),
        }
        var arr = jsf.readFileSync(file);
        arr.push(obj);
        jsf.writeFile('members.json',arr,{spaces: 2},function(err){
        console.error(err)
        clear_button()
      });
      }
    })
  })


  ////////////////function

  function error_message(input_id, message){
      let message_html = '<div class="ui pointing red label error_message">' +
      message +'</div>'
      status = false;
      $(input_id).after(message_html);
      $(input_id).closest('.field').addClass('error')
    }

  function remove_error_message(input_id){
      status = true;
      $('.error_message').remove()
      $(input_id).closest('.field').removeClass('error')
    }

  function clear_button(){
      $('.input_save').val('')
      $('.error_message').remove()
      $('.field').removeClass('error')
  }
    $('#clear_button').on('click', function(){
      clear_button()
    })

  ////////////////form validation

    $('#save_button').on('click', function(){
 
    ////
    
      if ($('#date').val().length > 10 ) {
        error_message('#date', 'Incorrect Date of Join Format');
      }else{
        remove_error_message('#date');
      }
      
    ////
      var remove_dash = $('#isbn_number').val().replace(/-/g, '');
      modulus_eleven = 0;
      for(var i = 0; i<remove_dash.length; i++){
        let x = 10 - i;
        modulus_eleven += remove_dash[i] * x;
      }  
      ///
       var remove_x = $('#isbn_number').val().replace(/X/g, 1);
      modulus_eleven = 0;
      for(var i = 0; i<remove_x.length; i++){
        let x = 10 - i;
        modulus_eleven += (remove_x[i] + 9) * x;
      }  

      ///
      if ($('#isbn_number').val().length !== 13) {
        error_message('#isbn_number', 'ISBN Number is not 13 digits');
      }else{
        if (modulus_eleven % 11 !== 0) {
          error_message('#isbn_number', 'ISBN Number is not a valid modulus 11 number');
        }else{
          remove_error_message('#isbn_number');
        }
       
      }
  
    ////

      if ($('#title').val() === "" ) {
        error_message('#title', 'Incorrect Title Format');
      }else{
        remove_error_message('#title');
      }

      if ($('#publisher').val() === "" ) {
        error_message('#publisher', 'Incorrect Publisher Format');
      }else{
        remove_error_message('#publisher');
      }

      if ($('#author').val() === "" ) {
        error_message('#author', 'Incorrect Author Format');
      }else{
        remove_error_message('#author');
      }
})
    