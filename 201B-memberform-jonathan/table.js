
var $ = require('jquery')
var jsonfile = require('jsonfile')
var file = 'jsfile.json'
var chunk = require('chunk')

	
$(function(){

	var members = jsonfile.readFileSync(file)
    let memberpagegroups = chunk(members, 10)
    createtable (memberpagegroups[0])
    if (memberpagegroups.length > 1) {
        createpagination(memberpagegroups)
    }
    

   function createtable(theMembers){
        $('#passtable').html('')
            var html_table =
            '<table>'+
                '<tr>'+
                    '<td>'+'isbnnumber' +'</td>'+
                    '<td>'+'catergorycode'+'</td>'+
                    '<td>'+'title'+'</td>'+
                    '<td>'+'publisher'+'</td>'+
                    '<td>'+'author'+'</td>'+
                    '<td>'+'datep'+'</td>'+
                    '<td>'+'is'+'</td>'+
                '</tr>'+
            '</table>'
                $('div#button1').html(html_table);


            for(var i in theMembers){
            var member = 
            `<tr>
                <td>${theMembers[i]['isbnnumber']}</td>
                <td>${theMembers[i]['catergorycode']}</td>
                <td>${theMembers[i]['title']}</td>
                <td>${theMembers[i]['publisher']}</td>
                <td>${theMembers[i]['author']}</td>
                <td>${theMembers[i]['datep']}</td>
                <td>${theMembers[i]['is']}</td>
            </tr>`

            $('div#button1').append(member);
        }
    }


    function createpagination(pages){
        $('#memberpagination').html('')
        for (var i = 0; i < pages.length; i++) {

            let item = '<button class="clickBtn" value="'+ i + '">'+(Number(i) + 1) +'</button> '
            $('#memberpagination').append(item)
            $('button.clickBtn').on('click',function(){
                $this = $(this)
                createtable(pages[$this.val()])
            }) 
        }
    }



})

