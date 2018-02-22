class ViewManger{

	constructor(){

	}

/**********************************************/
/*CLEAR BUTTON FUNCTION*/

  clear_button(){
      $('.input_save').val('')
      $('.error_message').remove()
      $('.field').removeClass('error')
  }

/**********************************************/
/*ERROR MESSAGE FUNCTION*/

  error_message(input_id, message){
      let message_html = '<div class="ui pointing red label error_message">' +
      message +'</div>'
      status = false;
      $(input_id).after(message_html);
      $(input_id).closest('.field').addClass('error')
    }

/**********************************************/
/*ERROR EFFECT FUNCTION*/

  remove_error_message(input_id){
      status = true;
      $('.error_message').remove()
      $(input_id).closest('.field').removeClass('error')
    }



}
module.exports = ViewManger