$(function(){

	var Keyboard = {

		defaultKey: "g",
		activeKey: "",

		init: function(){
			$("#keyboard li").on("click", function(){
				Keyboard.keyPress(this);
			});
			$("body").focus();
			$("body").keydown(function(evt){
				switch(evt.keyCode){
					case 37:
						Keyboard.nav.Left();
						break;
					case 38:
						Keyboard.nav.Up();
						break;
					case 39:
						Keyboard.nav.Right();
						break;
					case 40:
						Keyboard.nav.Down();
						break;
					case 13:
						Keyboard.keyPress(Keyboard.activeKey);
				}
			});
			//$("#keyboard li[data-key='g']").addClass("focus");
			Keyboard.resetFocus($("#keyboard li[data-key='"+ Keyboard.defaultKey +"']"));
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
			Keyboard.resetFocus(key);
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
		},

		resetFocus: function(key){
			var keyData = $(key).attr("data-key")
			$("#keyboard li").removeClass("focus");
			$("#keyboard li[data-key='" + keyData + "']").addClass("focus");
			Keyboard.activeKey = key;
		},

		nav : {
			Right: function(){
				console.log("Right");
				var parentElem = $(Keyboard.activeKey).parent();
				var siblings = $("li", parentElem);
				var wrap = false;
				for(var i=0, iL=siblings.length; i<iL; i++){
					if( $(siblings[i]).hasClass("focus") ){
						if( (i+1) >= siblings.length ){
							wrap = true;
						}
						break;
					}
				}
				wrap ? Keyboard.resetFocus($(siblings).eq(0)) : Keyboard.resetFocus($(Keyboard.activeKey).next());
			},
			Left: function(){
				console.log("Left");
				var parentElem = $(Keyboard.activeKey).parent();
				var siblings = $("li", parentElem);
				var wrap = false;
				for(var i=0, iL=siblings.length; i<iL; i++){
					if( $(siblings[i]).hasClass("focus") ){
						if( i == 0 ){
							wrap = true;
						}
						break;
					}
				}
				wrap ? Keyboard.resetFocus($(siblings).eq(siblings.length - 1)) : Keyboard.resetFocus($(Keyboard.activeKey).prev());
			},
			Up: function(){
				console.log("Up");
				var parentElem = $(Keyboard.activeKey).parent().parent();
				if( !$(parentElem).hasClass("numeric") ){
					var newElement = document.elementFromPoint( $(Keyboard.activeKey).offset().left + $(Keyboard.activeKey).outerWidth()/2, $(Keyboard.activeKey).offset().top - $(Keyboard.activeKey).outerHeight()*0.5);
					if(newElement.tagName.toUpperCase() != "LI") {
						newElement = document.elementFromPoint( $(Keyboard.activeKey).offset().left + $(Keyboard.activeKey).outerWidth()/2.2, $(Keyboard.activeKey).offset().top - $(Keyboard.activeKey).outerHeight()*0.5);
					}
					Keyboard.resetFocus(newElement);
				}
			},
			Down: function(){
				console.log("Down");
				var parentElem = $(Keyboard.activeKey).parent().parent();
				if( !$(parentElem).hasClass("bottom-nav") ){
					var newElement = document.elementFromPoint( $(Keyboard.activeKey).offset().left + $(Keyboard.activeKey).outerWidth()/2, $(Keyboard.activeKey).offset().top + $(Keyboard.activeKey).outerHeight()*1.5);
					if(newElement.tagName.toUpperCase() != "LI") {
						newElement = document.elementFromPoint( $(Keyboard.activeKey).offset().left + $(Keyboard.activeKey).outerWidth()/2.2, $(Keyboard.activeKey).offset().top + $(Keyboard.activeKey).outerHeight()*1.5);
					}
					Keyboard.resetFocus(newElement);
				}
			},
			getPreviousVisibleElement: function(elem){
				var tempElem = isVisible($(elem).prev());
				function isVisible(x){
					if( $(x).is(":visible") ){
						return $(x);
					} else {
						return isVisible($(x).prev());
					}
				}
				return tempElem;
			},
			getNextVisibleElement: function(elem){
				var tempElem = isVisible($(elem).next());
				function isVisible(x){
					if( $(x).is(":visible") ){
						return $(x);
					} else {
						return isVisible($(x).next());
					}
				}
				return tempElem;
			}
		}

	};

	Keyboard.init();

});
