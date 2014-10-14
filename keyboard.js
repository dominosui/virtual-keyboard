$(function(){

	$("#keyboard li").on("click", function(){
		keyboardPress(this);
	});

	function keyboardPress(key){
		var keyValue = $(key).attr("data-key");
		switch(keyValue){
			case "shift":
				shiftKey();
				break;
			case "layout-symbols":
			case "layout-alpha":
				changeKeyboard(keyValue);
				break;
			case "backspace":
				removeCharacter();
				break;
			default:
				addCharacter(keyValue);
		}
	}

	function shiftKey(){
		$(".qwerty").hasClass("shift") ? $(".qwerty").removeClass("shift") : $(".qwerty").addClass("shift");
	}

	function addCharacter(key){
		var str = $("#output input").val() || "";
		var uppercase = $(".qwerty").hasClass("shift") || false;
		uppercase ? $("#output input").val( str += key.toUpperCase() ) : $("#output input").val( str += key );
	}

	function changeKeyboard(key){
		switch(key){
			case "layout-symbols":
				$(".qwerty").hide();
				$(".symbol, .domains").show();
				$(".keyboard-layout").attr("data-key", "layout-alpha").html("abc");
				break;
			case "layout-alpha":
				$(".symbol, .domains").hide();
				$(".qwerty").show();
				$(".keyboard-layout").attr("data-key", "layout-symbols").html("!#$");
			break;
		}
	}

	function removeCharacter(){
		var arr = $("#output input").val().split("");
		arr.pop();
		$("#output input").val(arr.join(""));
	}

});
