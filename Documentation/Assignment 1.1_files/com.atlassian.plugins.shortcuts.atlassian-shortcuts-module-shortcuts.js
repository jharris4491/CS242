(function(D){D.hotkeys={version:"0.8",specialKeys:{8:"backspace",9:"tab",13:"return",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"insert",46:"del",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",106:"*",107:"+",109:"-",110:".",111:"/",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"numlock",145:"scroll",188:",",190:".",191:"/",224:"meta",219:"[",221:"]"},keypressKeys:["<",">","?"],shiftNums:{"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":": ","'":'"',",":"<",".":">","/":"?","\\":"|"}};D.each(D.hotkeys.keypressKeys,function(E,F){D.hotkeys.shiftNums[F]=F});function A(E){this.num=0;this.timer=E>0?E:false}A.prototype.val=function(){return this.num};A.prototype.inc=function(){if(this.timer){clearTimeout(this.timeout);this.timeout=setTimeout(D.proxy(A.prototype.reset,this),this.timer)}this.num++};A.prototype.reset=function(){if(this.timer){clearTimeout(this.timeout)}this.num=0};function C(G){if(!(D.isPlainObject(G.data)||D.isArray(G.data)||typeof G.data==="string")){return }var F=G.handler,E={timer:700};(function(H){if(typeof H==="string"){E.combo=[H]}else{if(D.isArray(H)){E.combo=H}else{D.extend(E,H)}}E.combo=D.map(E.combo,function(I){return I.toLowerCase()})})(G.data);G.index=new A(E.timer);G.handler=function(M){if(this!==M.target&&(/textarea|select|input/i.test(M.target.nodeName))){return }var J=M.type!=="keypress"&&D.hotkeys.specialKeys[M.which],N=String.fromCharCode(M.which).toLowerCase(),K,L="",I={};if(M.altKey&&J!=="alt"){L+="alt+"}if(M.ctrlKey&&J!=="ctrl"){L+="ctrl+"}if(M.metaKey&&!M.ctrlKey&&J!=="meta"){L+="meta+"}if(M.shiftKey&&J!=="shift"){L+="shift+"}I[L+(J||N)]=true;if(/shift+/.test(L)){I[L.replace("shift+","")+D.hotkeys.shiftNums[(J||N)]]=true}var H=G.index,O=E.combo;if(B(O[H.val()],I)){if(H.val()===O.length-1){H.reset();return F.apply(this,arguments)}else{H.inc()}}else{H.reset();if(B(O[0],I)){H.inc()}}}}function B(H,F){var I=H.split(" ");for(var G=0,E=I.length;G<E;G++){if(F[I[G]]){return true}}return false}D.each(["keydown","keyup","keypress"],function(){D.event.special[this]={add:C}})})(jQuery);
jQuery(document).bind("iframeAppended",function(B,A){jQuery(A).load(function(){var C=jQuery(A).contents();C.bind("keyup.whenitype keydown.whenitype keypress.whenitype",function(D){if(jQuery.browser.safari&&D.type==="keypress"){return }if(!jQuery(D.target).is(":input")){jQuery(document).trigger(D)}})})});AJS.whenIType=function(F){F=jQuery.isArray(F)?F:[F];var A=AJS.I18n?AJS.I18n.getText("keyboard.shortcut.type"):AJS.params.keyType,C=AJS.I18n?AJS.I18n.getText("keyboard.shortcut.then"):AJS.params.keyThen;var B,G=function(H){var I=jQuery.grep(H,function(J){return/^[a-z0-9\?]$/i.test(J)}).length===H.length;jQuery(document).bind((I?"keypress":"keydown")+".whenitype",H,function(J){if(B&&!AJS.popup.current&&!AJS.dropDown.current&&!AJS.InlineDialog.current){B(J);J.preventDefault();J.stopImmediatePropagation()}});jQuery(document).bind("keyup.whenitype",H,function(J){J.preventDefault()})},D=function(H){var J=jQuery(H),K=J.attr("title")||"",I=F.slice(0);if(J.data("kbShortcutAppended")){E(J,I,K);return }K+=" ( "+A+" '"+I.shift()+"'";jQuery.each(I,function(){K+=" "+C+" '"+this+"'"});K+=" )";J.attr("title",K);J.data("kbShortcutAppended",true)},E=function(I,H,J){J=J.replace(/\)$/," OR ");J+="'"+H.shift()+"'";jQuery.each(H,function(){J+=" "+C+" '"+this+"'"});J+=" )";I.attr("title",J)};G(F);return{moveToNextItem:function(H){B=function(){var J,L=true,I=jQuery(H),K=jQuery(H+".focused");if(!B.blurHandler){jQuery(document).one("keypress.whenitype",function(M){if(M.keyCode===27&&K){K.removeClass("focused")}})}if(K.length===0){L=false;K=jQuery(H).eq(0)}else{K.removeClass("focused");J=jQuery.inArray(K.get(0),I);if(J<I.length-1){J=J+1;K=I.eq(J)}else{K.removeClass("focused");K=jQuery(H).eq(0);L=false}}if(K&&K.length>0){K.addClass("focused");K.moveTo(L);K.find("a:first").focus()}}},moveToPrevItem:function(H){B=function(){var J,L=true,I=jQuery(H),K=jQuery(H+".focused");if(!B.blurHandler){jQuery(document).one("keypress.whenitype",function(M){if(M.keyCode===27&&K){K.removeClass("focused")}})}if(K.length===0){L=false;K=jQuery(H+":last")}else{K.removeClass("focused");J=jQuery.inArray(K.get(0),I);if(J>0){J=J-1;K=I.eq(J)}else{K.removeClass("focused");K=jQuery(H+":last");L=false}}if(K&&K.length>0){K.addClass("focused");K.moveTo(L);K.find("a:first").focus()}}},click:function(H){D(H);B=function(){var I=jQuery(H);if(I.length>0){I.click()}}},goTo:function(H){B=function(){window.location.href=contextPath+H}},evaluate:function(H){H.call(this)},followLink:function(H){D(H);B=function(){var I=jQuery(H);if(I.length>0&&(I.attr("nodeName").toLowerCase()==="a"||I.attr("nodeName").toLowerCase()==="link")){I.click();window.location.href=I.attr("href")}}},execute:function(I){var H=this;B=function(){I.call(H)}},moveToAndClick:function(H){D(H);B=function(){var I=jQuery(H);if(I.length>0){I.click();I.moveTo()}}},moveToAndFocus:function(H){D(H);B=function(J){var I=jQuery(H);if(I.length>0){I.focus();I.moveTo&&I.moveTo();if(I.is(":input")){J.preventDefault()}}}},or:function(H){G(H);return this}}};
AJS.bind("initialize.keyboardshortcuts",function(){var D=AJS.$,B=AJS.Data.get,C=B("context-path")+"/rest/shortcuts/latest/shortcuts/"+B("build-number")+"/"+B("keyboardshortcut-hash"),A=function(E){if(E.keyCode===27&&D(E.target).is(":input")){D(E.target).blur()}};D.getJSON(C,function(G){var E=G.shortcuts;if(!E){throw new Error("Server returned no shortcuts.")}AJS.trigger("shortcuts-loaded.keyboardshortcuts",{shortcuts:E});var I={enableContext:function(J){D.each(E,function(M,K){if(K.context!=J){return }var L=K.op,N=K.param;D.each(K.keys,function(){if(L==="execute"||L==="evaluate"){N=Function(N)}AJS.whenIType(this)[L](N)})})}};var F=function(){D(document).bind("keyup.whenitype",A);D(document).bind("iframeAppended.whenitype",function(K,J){D(J).load(function(){if(J.contentWindow&&J.contentWindow.jQuery){J.contentWindow.jQuery("body").bind("keyup.whenitype",A)}})});AJS.trigger("register-contexts.keyboardshortcuts",{shortcutRegistry:I})};F();AJS.bind("add-bindings.keyboardshortcuts",F);var H=function(){D(document).unbind(".whenitype");D("iframe").each(function(){if(this.contentWindow&&this.contentWindow.jQuery){this.contentWindow.jQuery("body").unbind(".keyboard-shortcuts.whenitype")}})};AJS.bind("remove-bindings.keyboardshortcuts",H)})});
