
$(document).ready(()=>{
    getTanks();
});




function getTanks(){
    $.post( "get-tanks", {})
	.done(function( data ) {
	    console.log(data);
	    data = JSON.parse(data);
	    for(key in data){
		var row = $("<tr><td>"+data[key].model+"</td>\
<td>"+data[key].orders+"</td>\
<td>"+data[key].sent+"</td>\
<td>"+(data[key].orders - data[key].sent)+"</td>\
</tr>");
		
		$("#tankRows").append(row);
	    }
	});
}

