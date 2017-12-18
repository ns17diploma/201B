      

var $ = require('jquery')
var filename = ('jsfile.json')
var jsf = require('jsonfile')
var fs = require('fs')

$(document).ready(function(){
   $('.error').hide()
   $('.errorISBN').hide()
   $('.error02').hide()
   $('.error03').hide()
   $('.error04').hide()
   $('.error05').hide()

   if (!fs.existsSync('jsfile.json')) {
      jsf.writeFileSync('jsfile.json',[])
   }

   $('#save').on('click',function(){
      valid()
      if (result === true) {
         record()
      }
      else{
         console.log("error");
      }
   })
})


function record(){
   var all = {
      isbnnumber: $('#one').val(),
      catergorycode: $('#two').val(),
      title: $('#three').val(),
      publisher: $('#four').val(),
      author: $('#five').val(),
      datep: $('#six').val(),
      is: $('#seven').val()
   }
   var json = jsf.readFileSync('jsfile.json')
   json.push(all);
   jsf.writeFileSync('jsfile.json', json)
}


var result = false;
function valid(){


function checkISBN(){
      var total = 0;

      var isbn = $('#one').val()
      var replaceDash = isbn.replace(/-/g, '')
      var replaceX = replaceDash.replace('x','' )

      for (var j = 0; j < replaceDash.length; j ++) {
         if (replaceDash[j] === "x" || replaceDash[j] === "X")  {
            replaceDash[j] = 0
            replaceDash[j - 1] += 1
         }
      }

      for (var i = 0; i < replaceDash.length; i++) {
         let num = 10 - i;
         var total = total + replaceDash[i]*num;
      }

      if ((total % 11) !== 0 || isbn.length !== 13) {
         result = false
         $('.errorISBN').show()
      } else {
         result = true
         $('.errorISBN').hide()
      }
      return result;
   }   
   checkISBN()




   function title(){
      var title = $('#three').val()
      if (title.length == "" ) {
         $('.error02').show()
         result = false;
      }
      else{
         $('.error02').hide()
         result = true;
      }
      return result;
   }
   title()

   function publisher(){
      var publish = $('#four').val()
      if (publish.length == "" ) {
         $('.error03').show()
         result = false;
      }
      else{
         $('.error03').hide()
         result = true;
      }
      return result;
   }
   publisher()


   function author(){
      var au = $('#five').val()
      if (au.length == "") {
         result = false;
         $('.error04').show()
      }
      else{
         result = true;
         $('.error04').hide()
      }
      return result;
   }
   author()

   function datep(){
      var dp = $('#six').val()
      if (dp.length != 10) {
         $('.error05').show()
         result = false;
      }
      else{
         $('.error05').hide()
         result = true;
      }
      return result;
   }
   datep()
   
}
