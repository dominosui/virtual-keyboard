$(function(){

	var Keyboard = {

		init: function(){
			$("#keyboard li").on("click", function(){
				Keyboard.keyPress(this);
			});
		},

		keyPress: function(key){
			var keyValue = $(key).attr("data-key");
			switch(keyValue){
				case "shift":
					Keyboard.shiftKey();
					break;
				case "layout-symbols":
				case "layout-alpha":
					Keyboard.changeKeyboard(keyValue);
					break;
				case "backspace":
					Keyboard.removeCharacter();
					break;
				default:
					Keyboard.addCharacter(keyValue);
			}
		},

		shiftKey: function(){
			$(".qwerty").hasClass("shift") ? $(".qwerty").removeClass("shift") : $(".qwerty").addClass("shift");
		},

		addCharacter: function(key){
			var str = $("#output input").val() || "";
			var uppercase = $(".qwerty").hasClass("shift") || false;
			uppercase ? $("#output input").val( str += key.toUpperCase() ) : $("#output input").val( str += key );
		},

		changeKeyboard: function(key){
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
		},

		removeCharacter: function(){
			var arr = $("#output input").val().split("");
			arr.pop();
			$("#output input").val(arr.join(""));
		}

	};

	Keyboard.init();

});
