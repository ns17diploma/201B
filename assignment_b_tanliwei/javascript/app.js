let $ = require('jquery');
let fs = require('fs');
const JsonFileManager = require('./oop_manager/jsf_manager');
const ViewManager = require('./oop_manager/view_manager(function)');
const Member = require('./oop_manager/member');
const Validator = require('./oop_manager/validator');

$(function(){
  const vm = new ViewManager()
  const jfm = new JsonFileManager()
  const member = new Member()
  const validator = new Validator()
 
/******************************************/ 
////CLEAR BUTTON
  $('#clear_button').on('click', function(){
      vm.clear_button()
  })

/******************************************/ 
////SAVE BUTTON
    $('#save_button').on('click',function(){

        validator.date()
        validator.isbn_number()
        validator.title_case()
        validator.author_case()
        validator.publisher_case()

/******************************************/ 
////ERROR BUTTON
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
/******************************************/ 
////SUCCESS BUTTON
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
/******************************************/ 
////GET DATA VALUE
        $('#message_box').html(upper_message)
        var obj = new Member( 
        $('#isbn_number').val(),
        $('#title').val(),
        $('#publisher').val(),
        $('#date').val(),
        $('#author').val(),
        $('#category').val(),
        $('#check_box').val()
        );
        vm.clear_button()
        jfm.saveMembers(obj.transformObj());
      }
    })
  })