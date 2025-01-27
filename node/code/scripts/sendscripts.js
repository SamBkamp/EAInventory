var modal;
var notesModal;
$(document).ready(()=>{
    var today = new Date().toISOString().split('T')[0];
    getSends();
    getProducts();
    $("#dateSel").val(today);
    modal = new bootstrap.Modal($("#addModal"));
    notesModal = new bootstrap.Modal($("#notesModal"));
});




function getSends(){
    var maxNoteLength = 30;
    $("#tankRows").empty();
    
    $.post( "get-send", {})
	.done(function( data ) {
	    console.log(data);
	    data = JSON.parse(data);
	    for(key in data){
		var d = new Date(data[key].date);
		console.log(data[key].date);
		var n = data[key].notes;
		if(n.length > maxNoteLength) n = n.substring(0, maxNoteLength) + "...";
	
		var dString = d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
		var row = $("<tr><td>"+data[key].model+"</td>\
<td>"+data[key].quantity+"</td>\
<td>"+dString+"</td>\
<td style='cursor:pointer' onclick='showNote(this)' data-notes='"+data[key].notes+"'>"+n+"</td>\
</tr>");
		
		$("#tankRows").append(row);
	    }
	});
}

function showNote(e){
    console.log(e);
    $("#Note").text($(e).attr("data-notes"));
    notesModal.show();
    
}

function getProducts(){    
    $.post("get-products", {})
	.done((data)=>{
	    data = JSON.parse(data);
	    for(key in data){
		var o = $("<option value='"+data[key].id+"'>"+data[key].model+"</option>");
		$("#addItemSel").append(o);
	    }
	});
}


$("#addButton").on("click", ()=>{
    if( $("#qtyInput").val() == "") $("#qtyInput").addClass("is-invalid");
    else $("#qtyInput").removeClass("is-invalid");
	
    if( $("#dateSel").val() == "") $("#dateSel").addClass("is-invalid");
    else $("#dateSel").removeClass("is-invalid");
    
    if($("#addItemSel").find(":selected").val() == "") $("#addItemSel").addClass("is-invalid");
    else $("#addItemSel").removeClass("is-invalid");

    if($("#qtyInput").hasClass("is-invalid") ||
       $("#dateSel").hasClass("is-invalid") ||
       $("#addItemSel").hasClass("is-invalid")) return;

    modal.hide();
    var finalObj = {}
    finalObj["product"] = $("#addItemSel").find(":selected").val();
    finalObj["qty"] = $("#qtyInput").val();
    finalObj["date"] = $("#dateSel").val();
    finalObj["note"] = $("#note").val();
    
    console.log(finalObj);

    $.post("add-order", {dest: "send", prod: finalObj.product, qty: finalObj.qty, date: finalObj.date, note: finalObj.note})
	.done((data)=>{
	    if(data == "Success") getSends();
	    
	    else{
		console.log("uh oh: " + data);
	    }
	});
});
