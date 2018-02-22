const fs = require('fs')
const jsf = require('jsonfile')
var file = 'members.json'
class JsonFileManager{

	constructor(){

		if (!fs.existsSync(file)) {
		  jsf.writeFileSync(file, [])
		}

  	}

/**********************************************/	
/*PUSH VALUE TO JSON FILE*/	

	saveMembers(obj){
		var member = this.getMember()
        member.push(obj);
        jsf.writeFileSync(file,member,{spaces: 1, EOL:'\r\n'});

	}

	getMember(){
		return jsf.readFileSync(file)
	}
	getMembersPaginate(members){

	}

}

module.exports = JsonFileManager