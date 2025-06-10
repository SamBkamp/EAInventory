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



function deleteEntry(e){
    var id = $(e).attr("data-id");
    var model = $(e).parent().parent().children().first().text();
    var quantity = $(e).parent().parent().children().first().next().text();

    $.post("delete-order-entry", {"id":id, "db":"sent", "model":model, "qty": quantity})
	.done(function(data){
	    if(data.status == "success")
		getSends();
	});
}


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
<td class='text-center'>\
<svg style='cursor:pointer' data-id="+data[key].id+" onclick='deleteEntry(this)' xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='#dc3545' class='bi bi-trash3' viewBox='0 0 16 16'>\
<path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5'/>\
</svg>\
</td>\
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
