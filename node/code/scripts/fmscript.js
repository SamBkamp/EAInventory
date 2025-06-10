var items = [];
var rem = 0;
$(document).ready(()=>{
    getProducts();
});


function hideAlert(target){
    $(target).removeClass("show");
}

function updateStock(){
    var data = {
	"code": $("#disabledInput").val(),
	"type": $("#methodSelect").find(":selected").val(),
	"amount": +$("#amountInput").val() //+ is to implicitly convert text to int
    };

    $.post("updateStock", data).done(function(data){
	if(data.success){
	    getProducts();
	    rem = 1;
	    removeZero();
	    $("#successAlert").addClass("show");
	}else{
	    $("#failAlert").addClass("show");
	}
    });
}


function updateProdCode(){
    var prodSelected = $('#modalList').find(":selected").attr("data-name");
    $("#disabledInput").val(prodSelected);
}


$("#modalList").on("change", function(){
    updateProdCode();
});

function getProducts(){
    $.post( "get-fmprod", {})
	.done(function( data ) {
	    $("#tankRows").empty();
	    $("#modalList").empty();
	    items = [];
	    data = JSON.parse(data);
	    for(key in data){

		//for main list
		data[key].cost = Number.parseFloat(data[key].cost).toFixed(2);
		var row = $("<tr><td>"+data[key].code+"</td>\
<td>"+data[key].name+"</td>\
<td>"+data[key].cost+"</td>\
<td>"+data[key].stock+"</td>\
</tr>");		
		items.push(data[key]);
		
		$("#tankRows").append(row);

		//for modal dialogue
		var opt = $("<option data-name='"+data[key].code+"' value='"+data[key].name+"'>"+data[key].name+"</option>");
		$("#modalList").append(opt);		
	    }	    	    
	    updateProdCode();
	});
}

function removeZero(){
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

function verifyTime(){

    var options = {
	year: "numeric",
	month: "long",
	day: "numeric",
	hour: "numeric",
	minute: "numeric",
	hour12: false,
	timeZone: "Asia/Hong_Kong"
    };
    
    $.post("/update-verified-date", {})
	.done(function(data){
	    var date = new Date(parseInt(data.success));
	    if(data.error) alert(data.error);
	    else $("#dateText").text("Last verified on " + new Intl.DateTimeFormat("en-US", options).format(date));
	});
}
