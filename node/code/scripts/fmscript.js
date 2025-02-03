var items = [];
var rem = 0;
$(document).ready(()=>{
    getProducts();
});




function getProducts(){
    $.post( "get-fmprod", {})
	.done(function( data ) {
	    console.log(data);
	    data = JSON.parse(data);
	    for(key in data){
		data[key].cost = Number.parseFloat(data[key].cost).toFixed(2);
		var row = $("<tr><td>"+data[key].code+"</td>\
<td>"+data[key].name+"</td>\
<td>"+data[key].cost+"</td>\
<td>"+data[key].stock+"</td>\
</tr>");		
		items.push(data[key]);
		
		$("#tankRows").append(row);
	    }
	});
}

function removeZero(){
    console.log(rem);
    rem = (rem + 1 )% 2;
    if(rem == 1){
	$("#oosbtn").addClass("btn-primary");
	$("#oosbtn").removeClass("btn-outline-primary");
    }else{
	$("#oosbtn").removeClass("btn-primary");
	$("#oosbtn").addClass("btn-outline-primary");
    }
    $("#tankRows").empty();
    for(i in items){
	if(!(items[i].stock == 0 && rem == 1)){
	    var row = $("<tr><td>"+items[i].code+"</td>\
<td>"+items[i].name+"</td>\
<td>"+items[i].cost+"</td>\
<td>"+items[i].stock+"</td>\
</tr>");
	    $("#tankRows").append(row);
	}
    }
}
