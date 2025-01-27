$("#pwReply").hide();

function submit(){
    $.post( "/p/login", { data: $(pwField).val()})
	.done(function( data ) {
	    if(data != "sucess"){
		$("#pwReply").html(data);
		$("#pwReply").show();
		$("#pwField").addClass("is-invalid");
	    }else{
		window.location.href = "/dash";
	    }
	});
}


