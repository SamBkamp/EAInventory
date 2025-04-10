
var toFinNumber = (number) => { //takes an int number and returns a string that is in the financial format (eg 102,321,232.01)
    number = number.toString();
    var finalNumber = "";
    var split = number.split("."); //splits at decimal
    split[0] = split[0].split("").reverse().join("");

    for(var i = 0; i < split[0].length; i++){
	if(i % 3 == 0 && i != 0) finalNumber = "," + finalNumber;
	finalNumber = split[0][i] + finalNumber;
	console.log(split[0][i]);
    }

    split[1] += "00"; //guarantee there is at least 2 characters in this section
    finalNumber += "." + split[1][0] + split[1][1];
    
    return "$" + finalNumber;
}


exports.toFinNumber = toFinNumber;
