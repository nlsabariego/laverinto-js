let canvas,ctx;(function(){var e,t,n,i,o,s,r,c,_,u,h,a,l,f,d,y,p,m,g,k,v,b,w={}.hasOwnProperty,x=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1};_={is_unordered:!1,is_counting:!1,is_exclusive:!1,is_solitary:!1,prevent_default:!1,prevent_repeat:!1,normalize_caps_lock:!1},v=["meta","alt","option","ctrl","shift","cmd"],g="ctrl",(t={}).debug=!1,e=function(){function e(e){var t,n;for(t in e)w.call(e,t)&&!1!==(n=e[t])&&(this[t]=n);this.keys=this.keys||[],this.count=this.count||0}return e.prototype.allows_key_repeat=function(){return!this.prevent_repeat&&"function"==typeof this.on_keydown},e.prototype.reset=function(){return this.count=0,this.keyup_fired=null},e}(),t.Listener=function(){function t(e,t){var n,i,o,s;for(i in"undefined"!=typeof jQuery&&null!==jQuery&&e instanceof jQuery&&(1!==e.length&&m("Warning: your jQuery selector should have exactly one object."),e=e[0]),this.should_suppress_event_defaults=!1,this.should_force_event_defaults=!1,this.sequence_delay=800,this._registered_combos=[],this._keys_down=[],this._active_combos=[],this._sequence=[],this._sequence_timer=null,this._prevent_capture=!1,this._defaults=t||{},_)w.call(_,i)&&(o=_[i],this._defaults[i]=this._defaults[i]||o);this.element=e||document.body,n=function(e,t,n){return e.addEventListener?e.addEventListener(t,n):e.attachEvent&&e.attachEvent("on"+t,n),n},this.keydown_event=n(this.element,"keydown",(s=this,function(e){return e=e||window.event,s._receive_input(e,!0),s._bug_catcher(e)})),this.keyup_event=n(this.element,"keyup",function(e){return function(t){return t=t||window.event,e._receive_input(t,!1)}}(this)),this.blur_event=n(window,"blur",function(e){return function(){var t,n,i,o;for(n=0,i=(o=e._keys_down).length;n<i;n++)t=o[n],e._key_up(t,{});return e._keys_down=[]}}(this))}return t.prototype.destroy=function(){var e;return(e=function(e,t,n){return null!=e.removeEventListener?e.removeEventListener(t,n):null!=e.removeEvent?e.removeEvent("on"+t,n):void 0})(this.element,"keydown",this.keydown_event),e(this.element,"keyup",this.keyup_event),e(window,"blur",this.blur_event)},t.prototype._bug_catcher=function(e){var t,n;if("cmd"===g&&x.call(this._keys_down,"cmd")>=0&&"cmd"!==(t=s(null!=(n=e.keyCode)?n:e.key))&&"shift"!==t&&"alt"!==t&&"caps"!==t&&"tab"!==t)return this._receive_input(e,!1)},t.prototype._cmd_bug_check=function(e){return!("cmd"===g&&x.call(this._keys_down,"cmd")>=0&&x.call(e,"cmd")<0)},t.prototype._prevent_default=function(e,t){if((t||this.should_suppress_event_defaults)&&!this.should_force_event_defaults&&(e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation))return e.stopPropagation()},t.prototype._get_active_combos=function(e){var t,n,i;return t=[],(n=u(this._keys_down,(function(t){return t!==e}))).push(e),this._match_combo_arrays(n,(i=this,function(e){if(i._cmd_bug_check(e.keys))return t.push(e)})),this._fuzzy_match_combo_arrays(n,function(e){return function(n){if(!(x.call(t,n)>=0))return!n.is_solitary&&e._cmd_bug_check(n.keys)?t.push(n):void 0}}(this)),t},t.prototype._get_potential_combos=function(e){var t,n,i,o,s;for(n=[],i=0,o=(s=this._registered_combos).length;i<o;i++)(t=s[i]).is_sequence||x.call(t.keys,e)>=0&&this._cmd_bug_check(t.keys)&&n.push(t);return n},t.prototype._add_to_active_combos=function(e){var t,n,i,o,s,r,c,_,u,h,a,l,f,d,y;if(_=!1,c=!0,o=!1,x.call(this._active_combos,e)>=0)return!0;if(this._active_combos.length)for(r=u=0,d=this._active_combos.length;0<=d?u<d:u>d;r=0<=d?++u:--u)if((t=this._active_combos[r])&&t.is_exclusive&&e.is_exclusive){if(i=t.keys,!_)for(h=0,l=i.length;h<l;h++)if(n=i[h],_=!0,x.call(e.keys,n)<0){_=!1;break}if(c&&!_)for(a=0,f=(y=e.keys).length;a<f;a++)if(s=y[a],c=!1,x.call(i,s)<0){c=!0;break}_&&(o?null!=(t=this._active_combos.splice(r,1)[0])&&t.reset():(null!=(t=this._active_combos.splice(r,1,e)[0])&&t.reset(),o=!0),c=!1)}return c&&this._active_combos.unshift(e),_||c},t.prototype._remove_from_active_combos=function(e){var t,n,i;for(t=n=0,i=this._active_combos.length;0<=i?n<i:n>i;t=0<=i?++n:--n)if(this._active_combos[t]===e){(e=this._active_combos.splice(t,1)[0]).reset();break}},t.prototype._get_possible_sequences=function(){var e,t,n,i,o,s,r,c,_,h,a,l,f;for(o=[],r=0,h=(a=this._registered_combos).length;r<h;r++)for(e=a[r],n=c=1,l=this._sequence.length;1<=l?c<=l:c>=l;n=1<=l?++c:--c)if(s=this._sequence.slice(-n),e.is_sequence&&(!(x.call(e.keys,"shift")<0)||(s=u(s,(function(e){return"shift"!==e}))).length)){for(t=_=0,f=s.length;0<=f?_<f:_>f;t=0<=f?++_:--_){if(e.keys[t]!==s[t]){i=!1;break}i=!0}i&&o.push(e)}return o},t.prototype._add_key_to_sequence=function(e,t){var n,i,o,s,r;if(this._sequence.push(e),(i=this._get_possible_sequences()).length){for(o=0,s=i.length;o<s;o++)n=i[o],this._prevent_default(t,n.prevent_default);this._sequence_timer&&clearTimeout(this._sequence_timer),this.sequence_delay>-1&&(this._sequence_timer=setTimeout((r=this,function(){return r._sequence=[]}),this.sequence_delay))}else this._sequence=[]},t.prototype._get_sequence=function(e){var t,n,i,o,s,r,c,_,h,a,l,f,d;for(c=0,a=(l=this._registered_combos).length;c<a;c++)if((t=l[c]).is_sequence){for(i=_=1,f=this._sequence.length;1<=f?_<=f:_>=f;i=1<=f?++_:--_)if(r=u(this._sequence,(function(e){return x.call(t.keys,"shift")>=0||"shift"!==e})).slice(-i),t.keys.length===r.length)for(n=h=0,d=r.length;0<=d?h<d:h>d;n=0<=d?++h:--h)if(s=r[n],!(x.call(t.keys,"shift")<0&&"shift"===s||"shift"===e&&x.call(t.keys,"shift")<0)){if(t.keys[n]!==s){o=!1;break}o=!0}if(o)return t.is_exclusive&&(this._sequence=[]),t}return!1},t.prototype._receive_input=function(e,t){var n,i;if(this._prevent_capture)this._keys_down.length&&(this._keys_down=[]);else if(n=s(null!=(i=e.keyCode)?i:e.key),(t||this._keys_down.length||"alt"!==n&&n!==g)&&n)return t?this._key_down(n,e):this._key_up(n,e)},t.prototype._fire=function(e,t,n,i){if("function"==typeof t["on_"+e]&&this._prevent_default(n,!0!==t["on_"+e].call(t.this,n,t.count,i)),"release"===e&&(t.count=0),"keyup"===e)return t.keyup_fired=!0},t.prototype._match_combo_arrays=function(e,t){var n,s,r,c,_;for(r=0,c=(_=this._registered_combos).length;r<c;r++)s=_[r],n=e.slice(0),s.normalize_caps_lock&&x.call(n,"caps")>=0&&n.splice(n.indexOf("caps"),1),(!s.is_unordered&&o(n,s.keys)||s.is_unordered&&i(n,s.keys))&&t(s)},t.prototype._fuzzy_match_combo_arrays=function(e,t){var n,i,o,s;for(i=0,o=(s=this._registered_combos).length;i<o;i++)(!(n=s[i]).is_unordered&&l(n.keys,e)||n.is_unordered&&a(n.keys,e))&&t(n)},t.prototype._keys_remain=function(e){var t,n,i,o,s;for(i=0,o=(s=e.keys).length;i<o;i++)if(t=s[i],x.call(this._keys_down,t)>=0){n=!0;break}return n},t.prototype._key_down=function(e,t){var n,i,o,s,c,_,u,h,a,l,f,d,y,p,m;for(c in(a=r(e,t))&&(e=a),this._add_key_to_sequence(e,t),(h=this._get_sequence(e))&&this._fire("keydown",h,t),k)t[o=k[c]]&&(c===e||x.call(this._keys_down,c)>=0||this._keys_down.push(c));for(c in k)if(o=k[c],c!==e&&x.call(this._keys_down,c)>=0&&!t[o]){if("cmd"===c&&"cmd"!==g)continue;for(s=l=0,m=this._keys_down.length;0<=m?l<m:l>m;s=0<=m?++l:--l)this._keys_down[s]===c&&this._keys_down.splice(s,1)}for(i=this._get_active_combos(e),u=this._get_potential_combos(e),f=0,y=i.length;f<y;f++)n=i[f],this._handle_combo_down(n,u,e,t);if(u.length)for(d=0,p=u.length;d<p;d++)_=u[d],this._prevent_default(t,_.prevent_default);x.call(this._keys_down,e)<0&&this._keys_down.push(e)},t.prototype._handle_combo_down=function(e,t,n,i){var o,s,r,c,_,u;if(x.call(e.keys,n)<0)return!1;if(this._prevent_default(i,e&&e.prevent_default),o=!1,x.call(this._keys_down,n)>=0&&(o=!0,!e.allows_key_repeat()))return!1;if(c=this._add_to_active_combos(e,n),e.keyup_fired=!1,s=!1,e.is_exclusive)for(_=0,u=t.length;_<u;_++)if((r=t[_]).is_exclusive&&r.keys.length>e.keys.length){s=!0;break}return!s&&(e.is_counting&&"function"==typeof e.on_keydown&&(e.count+=1),c)?this._fire("keydown",e,i,o):void 0},t.prototype._key_up=function(e,t){var n,i,o,s,c,_,u,h,a,l,f,d,y,m,g,k,v,b,w;if(h=e,(u=r(e,t))&&(e=u),u=p[h],t.shiftKey?u&&x.call(this._keys_down,u)>=0||(e=h):h&&x.call(this._keys_down,h)>=0||(e=u),(_=this._get_sequence(e))&&this._fire("keyup",_,t),x.call(this._keys_down,e)<0)return!1;for(c=a=0,k=this._keys_down.length;0<=k?a<k:a>k;c=0<=k?++a:--a)if((v=this._keys_down[c])===e||v===u||v===h){this._keys_down.splice(c,1);break}for(i=this._active_combos.length,s=[],l=0,y=(b=this._active_combos).length;l<y;l++)n=b[l],x.call(n.keys,e)>=0&&s.push(n);for(f=0,m=s.length;f<m;f++)o=s[f],this._handle_combo_up(o,t,e);if(i>1)for(d=0,g=(w=this._active_combos).length;d<g;d++)void 0===(n=w[d])||x.call(s,n)>=0||this._keys_remain(n)||this._remove_from_active_combos(n)},t.prototype._handle_combo_up=function(e,t,n){var o,s;this._prevent_default(t,e&&e.prevent_default),s=this._keys_remain(e),e.keyup_fired||((o=this._keys_down.slice()).push(n),e.is_solitary&&!i(o,e.keys)||(this._fire("keyup",e,t),e.is_counting&&"function"==typeof e.on_keyup&&"function"!=typeof e.on_keydown&&(e.count+=1))),s||(this._fire("release",e,t),this._remove_from_active_combos(e))},t.prototype.simple_combo=function(e,t){return this.register_combo({keys:e,on_keydown:t})},t.prototype.counting_combo=function(e,t){return this.register_combo({keys:e,is_counting:!0,is_unordered:!1,on_keydown:t})},t.prototype.sequence_combo=function(e,t){return this.register_combo({keys:e,on_keydown:t,is_sequence:!0,is_exclusive:!0})},t.prototype.register_combo=function(t){var n,i,o,s;for(i in"string"==typeof t.keys&&(t.keys=t.keys.split(" ")),s=this._defaults)w.call(s,i)&&(o=s[i],void 0===t[i]&&(t[i]=o));if(n=new e(t),b(n))return this._registered_combos.push(n),n},t.prototype.register_many=function(e){var t,n,i,o;for(o=[],n=0,i=e.length;n<i;n++)t=e[n],o.push(this.register_combo(t));return o},t.prototype.unregister_combo=function(t){var n,s,r,c,_,u,h,a,l,f;if(!t)return!1;if(f=this,r=function(e){var t,n,i,o;for(o=[],t=n=0,i=f._registered_combos.length;0<=i?n<i:n>i;t=0<=i?++n:--n){if(e===f._registered_combos[t]){f._registered_combos.splice(t,1);break}o.push(void 0)}return o},t instanceof e)return r(t);if("string"==typeof t)for(s=c=0,h=(t=t.split(" ")).length;0<=h?c<h:c>h;s=0<=h?++c:--c)"meta"===t[s]&&(t[s]=g);for(l=[],_=0,u=(a=this._registered_combos).length;_<u;_++)null!=(n=a[_])&&(n.is_unordered&&i(t,n.keys)||!n.is_unordered&&o(t,n.keys)?l.push(r(n)):l.push(void 0));return l},t.prototype.unregister_many=function(e){var t,n,i,o;for(o=[],n=0,i=e.length;n<i;n++)t=e[n],o.push(this.unregister_combo(t));return o},t.prototype.get_registered_combos=function(){return this._registered_combos},t.prototype.reset=function(){return this._registered_combos=[]},t.prototype.listen=function(){return this._prevent_capture=!1},t.prototype.stop_listening=function(){return this._prevent_capture=!0},t.prototype.get_meta_key=function(){return g},t}(),c=function(){-1!==navigator.userAgent.indexOf("Mac OS X")&&(g="cmd")},n=function(){-1!==navigator.userAgent.indexOf("Opera")&&(y[17]="cmd")},s=function(e){return y[e]},u=function(e,t){var n;return e.filter?e.filter(t):function(){var i,o,s;for(s=[],i=0,o=e.length;i<o;i++)n=e[i],t(n)&&s.push(n);return s}()},i=function(e,t){var n,i,o;if(e.length!==t.length)return!1;for(i=0,o=e.length;i<o;i++)if(n=e[i],!(x.call(t,n)>=0))return!1;return!0},o=function(e,t){var n,i,o;if(e.length!==t.length)return!1;for(n=i=0,o=e.length;0<=o?i<o:i>o;n=0<=o?++i:--i)if(e[n]!==t[n])return!1;return!0},a=function(e,t){var n,i,o;for(i=0,o=e.length;i<o;i++)if(n=e[i],x.call(t,n)<0)return!1;return!0},h=Array.prototype.indexOf||function(e,t){var n,i,o;for(n=i=0,o=e.length;0<=o?i<=o:i>=o;n=0<=o?++i:--i)if(e[n]===t)return n;return-1},l=function(e,t){var n,i,o,s,r;for(o=0,s=0,r=e.length;s<r;s++){if(i=e[s],!((n=h.call(t,i))>=o))return!1;o=n}return!0},m=function(){if(t.debug)return console.log.apply(console,arguments)},f=function(e){var t,n;for(n in t=!1,y)if(e===y[n]){t=!0;break}if(!t)for(n in p)if(e===p[n]){t=!0;break}return t},b=function(e){var t,n,i,o,s,r,c,u,a,l,y,p,k,b;for(c=!0,e.keys.length||m("You're trying to bind a combo with no keys:",e),n=u=0,k=e.keys.length;0<=k?u<k:u>k;n=0<=k?++u:--u)i=e.keys[n],(t=d[i])&&(i=e.keys[n]=t),"meta"===i&&e.keys.splice(n,1,g),"cmd"===i&&m('Warning: use the "meta" key rather than "cmd" for Windows compatibility');for(a=0,y=(b=e.keys).length;a<y;a++)i=b[a],f(i)||(m('Do not recognize the key "'+i+'"'),c=!1);if(x.call(e.keys,"meta")>=0||x.call(e.keys,"cmd")>=0){for(s=e.keys.slice(),l=0,p=v.length;l<p;l++)o=v[l],(n=h.call(s,o))>-1&&s.splice(n,1);s.length>1&&(m("META and CMD key combos cannot have more than 1 non-modifier keys",e,s),c=!1)}for(r in e)e[r],"undefined"===_[r]&&m("The property "+r+" is not a valid combo property. Your combo has still been registered.");return c},r=function(e,t){var n;return!!t.shiftKey&&(null!=(n=p[e])&&n)},k={cmd:"metaKey",ctrl:"ctrlKey",shift:"shiftKey",alt:"altKey"},d={escape:"esc",control:"ctrl",command:"cmd",break:"pause",windows:"cmd",option:"alt",caps_lock:"caps",apostrophe:"'",semicolon:";",tilde:"~",accent:"`",scroll_lock:"scroll",num_lock:"num"},p={"/":"?",".":">",",":"<","'":'"',";":":","[":"{","]":"}","\\":"|","`":"~","=":"+","-":"_",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")"},y={0:"\\",8:"backspace",9:"tab",12:"num",13:"enter",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"caps",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",44:"print",45:"insert",46:"delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",91:"cmd",92:"cmd",93:"cmd",96:"num_0",97:"num_1",98:"num_2",99:"num_3",100:"num_4",101:"num_5",102:"num_6",103:"num_7",104:"num_8",105:"num_9",106:"num_multiply",107:"num_add",108:"num_enter",109:"num_subtract",110:"num_decimal",111:"num_divide",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",124:"print",144:"num",145:"scroll",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",223:"`",224:"cmd",225:"alt",57392:"ctrl",63289:"num",59:";",61:"=",173:"-"},t._keycode_dictionary=y,t._is_array_in_array_sorted=l,c(),n(),"function"==typeof define&&define.amd?define([],(function(){return t})):"undefined"!=typeof exports&&null!==exports?exports.keypress=t:window.keypress=t}).call(this);const FPS=50,anchoF=50,altoF=50;let imgHouse,imgBone,imgDog;const grass="#166b2d",way="#d46b15",bones="#753f0d",myHome="#b1ff4a",noBone="#000000",maze=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,2,2,2,2,0,2,2,2,2,2,0,1,0],[0,2,0,2,2,2,0,2,0,0,2,0,0,0,2,0,2,0,2,0],[0,2,0,2,0,2,0,2,2,2,2,0,2,2,2,0,2,0,2,0],[0,2,2,2,0,2,2,2,0,0,0,0,2,0,0,0,2,2,2,0],[0,2,0,0,0,0,0,0,0,2,2,2,2,0,2,2,2,0,0,0],[0,2,2,2,2,2,2,2,2,2,2,2,2,0,2,2,2,0,3,0],[0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0],[0,2,2,2,0,2,2,2,0,2,2,2,0,2,2,2,0,2,2,0],[0,2,2,2,0,2,2,2,0,2,0,2,2,2,0,2,0,2,0,0],[0,2,0,2,2,2,0,2,2,2,0,2,2,2,0,2,2,2,2,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],House=function(e,t){this.x=e,this.y=t,this.draw=function(){ctx.drawImage(imgHouse,this.x,this.y)}},Bone=function(e,t){this.x=e,this.y=t,this.draw=function(){ctx.drawImage(imgBone,this.x,this.y)}},Protagonist=function(){this.x=1,this.y=1,this.color="d46b15",this.bone=!1,this.draw=function(){ctx.drawImage(imgDog,50*this.x,50*this.y)},this.margins=function(e,t){let n=!1;return 0===maze[t][e]&&(n=!0),n},this.up=function(){!1===this.margins(this.x,this.y-1)&&(this.y--,this.logicObjects())},this.down=function(){!1===this.margins(this.x,this.y+1)&&(this.y++,this.logicObjects())},this.left=function(){!1===this.margins(this.x-1,this.y)&&(this.x--,this.logicObjects())},this.right=function(){!1===this.margins(this.x+1,this.y)&&(this.x++,this.logicObjects())},this.win=function(){console.log("ganaste"),this.x=1,this.y=1,this.bone=!1,maze[6][18]=3},this.logicObjects=function(){let e=maze[this.y][this.x];3===e&&(this.bone=!0,maze[this.y][this.x]=4,console.log("tienes el hueso")),1===e&&(!0===this.bone?this.win():console.log("no tienes hueso"))}};function drawMaze(){let e;for(let t=0;t<maze.length;t++)for(let n=0;n<20;n++)0===maze[t][n]&&(e=grass),2===maze[t][n]&&(e=way),1===maze[t][n]&&(e=myHome),3===maze[t][n]&&(e=bones),4===maze[t][n]&&(e=noBone),ctx.fillStyle=e,ctx.fillRect(50*n,50*t,50,50)}let dog=new Protagonist;const home=new House(900,50),prize=new Bone(900,300);function initialize(){canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d"),imgHouse=new Image,imgHouse.src="../assets/images/house.png",imgBone=new Image,imgBone.src="../assets/images/bone.png",imgDog=new Image,imgDog.src="../assets/images/dog.png",document.addEventListener("keydown",(function(e){38===e.keyCode&&dog.up(),40===e.keyCode&&dog.down(),37===e.keyCode&&dog.left(),39===e.keyCode&&dog.right()})),setInterval((function(){master()}),20)}function deleteCanvas(){canvas.width=1e3,canvas.height=600}function master(){deleteCanvas(),drawMaze(),home.draw(),prize.draw(),dog.draw()}