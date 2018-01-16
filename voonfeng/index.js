let jsf = require('jsonfile');
    let file = 'jsfile.json';
    var $ = require('jquery');

    $('.cancel').on('click',function(){
      location.reload();
    })

    function error() {
      $('.errormassage0').hide();
      $('.errormassage1').hide();
      $('.modulus').hide();
    }

        //numeric
    $('#check').on('keyup',function(){
        var number = this.value;
        var numeric = number.replace(/[^a-zA-Z\s]/) ;
        if (number == numeric){
          $('.errormassage0').show();
          status = true;
        }else{
          $('.errormassage0').hide();
          status = false;
        }
        return status;
    });
    //ISNB
    //check ISNB data
    $('#check').on('keyup',function(){

        var status = false;
        var valx = $('#check').val();
        var valy = valx.replace(/-/g, '');
        var x1 = valy.substr(-1);
        var x2 = Number(valy.slice(0, -1));
        isbnTotal = 0;
        isbnTotalX = 0;
        isbnTotalTotalX = 0;

        for (var i = 0; i < valy.length; i++) {
          let x = 10 - i;
          isbnTotal = isbnTotal + Number(valy[i]) * x;
        }
        //find x
        if ( x1 == 'x' || x1 == 'X' ) {
          for (var i = 0; i < x2.length; i++) {
            let y = 9 - i;
            isbnTotalX = isbnTotalX + Number(x2[i]) * y;
            isbnTotalTotalX = isbnTotalX + 10;
          }
          if ( (isbnTotalTotalX % 11) !== 0 ) {
            $('.modulus').show();
            status = false;
          }
          else{
          $('.modulus').hide();
          status = true;
          }
        }
        //not 13 
        if ( valx.length !== 13 || valx == '') {
          $('.errormassage1').show();
          status = false;
        }else{
          $('.errormassage1').hide();
          status = true;
        }
        //modulus
        if ((isbnTotal % 11) !== 0) {
          $('.modulus').show();
          status = false;
        }
        else {
          $('.modulus').hide();
          status = true;
        }
          return status;

     }) 

    //Title
    $('.errormassage2').hide();
     $('#titleerror').on('keyup',function(){
      if($(this).val() === ""){
        status = false;
        $('#errortitle').addClass('error');
        $('.errormassage2').show();
      }else{
        status = true;
        $('#errortitle').removeClass('error');
        $('.errormassage2').hide();
      }
    })


    //publisher
    $('.errormassage3').hide();
    $('#publishererror').on('keyup',function(){
      if($(this).val() === ""){
        status = false;
        $('#errorpublisher').addClass('error');
        $('.errormassage3').show();
      }else{
        status = true;
        $('#errorpublisher').removeClass('error');
        $('.errormassage3').hide();
      }
    })

    //Author
    $('.errormassage4').hide();
    $('#authorerror').on('keyup',function(){
      if($(this).val() === ""){
        status = false;
        $('#errorauthor').addClass('error');
        $('.errormassage4').show();
      }else{
        status = true;
        $('#errorauthor').removeClass('error');
        $('.errormassage4').hide();
      }
    })
    
    //Date
    $('.errormassage5').hide();
    var elem = $("#dateerror");
    if(elem) elem.val(elem.val().substr(0,10));
    $('#dateerror').on('keyup', function(){
      if (elem.val().length > 10){
        elem.val(elem.val().substr(0, 10));
        status = false;
        $('#errordate').addClass('error');
        $('.errormassage5').show();
      }else{
        status = true;
        $('#errordate').removeClass('error');
        $('.errormassage5').hide();
      }           
    });


    //save button
    $('.inputcheck').hide();
    $('.save').on('click',function(vilidate){
      if($('.field').hasClass('error') || $('.common').val() === ""){
        $('.inputcheck').show();
      }else{
        $('.inputcheck').hide();
        var obj = {
          ISBM_Number:$('.input_isbm_number').val(),
          Title:$('.input_title').val(),
          Publisher:$('.input_publisher').val(),
          Author:$('.input_author').val(),
          Date:$('.input_date').val(),
          Category_code:$('.input_category').val(),
          In_stock:$('.input_stock').val()

        }
        var arr = jsf.readFileSync(file);
        arr.push(obj);
        jsf.writeFile('jsfile.json',arr, function (err){
          // Get the modal
        var modal = document.getElementById('myModal');

        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on the button, open the modal 
        modal.style.display = "block";
        

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        });
      }
    })

    function vilidate()
    {
      if ($('common').each()) {
      if ($('.common').val() === "" || $('.common1').val() === "" ){
        status = false;
        $('.inputcheck').show();
        
      }else{
        status = true;
        $('.inputcheck').hide();
      }
    }
    return status;
  }