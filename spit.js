(function() {

!function(a,b,c){"undefined"!=typeof module&&module.exports?module.exports=c():"function"==typeof define&&define.amd?define(c):b[a]=c()}("SpitKeen",this,function(){"use strict";function Keen(){return _init.apply(this,arguments)}function _init(a){if(_isUndefined(a))throw new Error("Check out our JavaScript SDK Usage Guide: https://keen.io/docs/clients/javascript/usage-guide/");if(_isUndefined(a.projectId)||"String"!==_type(a.projectId)||a.projectId.length<1)throw new Error("Please provide a projectId");this.configure(a)}function _extend(a){for(var b=1;b<arguments.length;b++)for(var c in arguments[b])a[c]=arguments[b][c];return a}function _isUndefined(a){return void 0===a}function _type(a){var b=a.constructor.toString();return b.match(/function (.*)\(/)[1]}function _each(a,b,c){var d;if(!a)return 0;if(c=c?c:a,"array"===_type(a)){for(d=0;d<a.length;d++)if(b.call(c,a[d],d,a)===!1)return 0}else for(d in a)if(a.hasOwnProperty(d)&&b.call(c,a[d],d,a)===!1)return 0;return 1}function _set_protocol(a){switch(a){case"http":return"http";case"auto":return location.protocol.replace(/:/g,"");case"https":case void 0:default:return"https"}}function _set_request_type(a){var b=a||"jsonp",c=!1;return("Object"===_type(XMLHttpRequest)||"Function"===_type(XMLHttpRequest))&&"withCredentials"in new XMLHttpRequest&&(c=!0),null==b||"xhr"==b?c?"xhr":"jsonp":b}function _build_url(a){return this.client.endpoint+"/projects/"+this.client.projectId+a}function _uploadEvent(a,b,c,d){var e=_build_url.apply(this,["/events/"+a]),f={};this.client.globalProperties&&(f=this.client.globalProperties(a));for(var g in b)b.hasOwnProperty(g)&&(f[g]=b[g]);switch(this.client.requestType){case"xhr":_request.xhr.apply(this,["POST",e,null,f,this.client.writeKey,c,d]);break;case"jsonp":var h=JSON.stringify(f),i=Keen.Base64.encode(h);e=e+"?api_key="+this.client.writeKey,e=e+"&data="+i,e=e+"&modified="+(new Date).getTime(),_request.jsonp.apply(this,[e,this.client.writeKey,c,d]);break;case"beacon":var h=JSON.stringify(f),i=Keen.Base64.encode(h);e=e+"?api_key="+encodeURIComponent(this.client.writeKey),e=e+"&data="+encodeURIComponent(i),e=e+"&modified="+encodeURIComponent((new Date).getTime()),e+="&c=clv1",_request.beacon.apply(this,[e,null,c,d])}}Keen.prototype.configure=function(a){return a.host=_isUndefined(a.host)?"api.keen.io/3.0":a.host.replace(/.*?:\/\//g,""),a.protocol=_set_protocol(a.protocol),a.requestType=_set_request_type(a.requestType),this.client={projectId:a.projectId,writeKey:a.writeKey,readKey:a.readKey,globalProperties:null,endpoint:a.protocol+"://"+a.host,requestType:a.requestType},Keen.trigger("client",this,a),this.trigger("ready"),this};var _request={xhr:function(a,b,c,d,e,f,g){if(!e)return Keen.log("Please provide a writeKey for https://keen.io/project/"+this.client.projectId);var h=new XMLHttpRequest;if(h.onreadystatechange=function(){if(4==h.readyState)if(h.status>=200&&h.status<300){var a;try{a=JSON.parse(h.responseText)}catch(b){Keen.log("Could not JSON parse HTTP response: "+h.responseText),g&&g(h,b)}f&&a&&f(a)}else Keen.log("HTTP request failed."),g&&g(h,null)},h.open(a,b,!0),e&&h.setRequestHeader("Authorization",e),d&&h.setRequestHeader("Content-Type","application/json"),c)for(var i in c)c.hasOwnProperty(i)&&h.setRequestHeader(i,c[i]);var j=d?JSON.stringify(d):null;h.send(j)},jsonp:function(a,b,c,d){if(!b)return Keen.log("Please provide a writeKey for https://keen.io/project/"+this.client.projectId);if(b&&a.indexOf("api_key")<0){var e=a.indexOf("?")>0?"&":"?";a=a+e+"api_key="+b}for(var f="keenJSONPCallback"+(new Date).getTime();f in window;)f+="a";var g=!1;window[f]=function(a){g=!0,c&&a&&c(a),window[f]=void 0},a=a+"&jsonp="+f;var h=document.createElement("script");h.id="keen-jsonp",h.src=a,document.getElementsByTagName("head")[0].appendChild(h),h.onreadystatechange=function(){g===!1&&"loaded"===this.readyState&&(g=!0,d&&d())},h.onerror=function(){g===!1&&(g=!0,d&&d())}},beacon:function(a,b,c,d){if(b&&a.indexOf("api_key")<0){var e=a.indexOf("?")>0?"&":"?";a=a+e+"api_key="+b}var f=!1,g=document.createElement("img");g.onload=function(){if(f=!0,"naturalHeight"in this){if(this.naturalHeight+this.naturalWidth===0)return void this.onerror()}else if(this.width+this.height===0)return void this.onerror();c&&c({created:!0})},g.onerror=function(){f=!0,d&&d()},g.src=a}},Events=Keen.Events={on:function(a,b){this.listeners||(this.listeners={});var c=this.listeners[a]||(this.listeners[a]=[]);return c.push({callback:b}),this},off:function(a,b){if(!a&&!b)return this.listeners=void 0,delete this.listeners,this;for(var c=this.listeners[a]||[],d=c.length;d--;)b&&b==c[d].callback&&this.listeners[a].splice(d,1),b&&0!=c.length||(this.listeners[a]=void 0,delete this.listeners[a]);return this},trigger:function(a){if(!this.listeners)return this;for(var b=Array.prototype.slice.call(arguments,1),c=this.listeners[a]||[],d=0;d<c.length;d++)c[d].callback.apply(this,b);return this}};_extend(Keen.prototype,Events),_extend(Keen,Events),Keen.loaded=!0,Keen.ready=function(a){Keen.on("ready",a)},Keen.log=function(a){console.log("[Keen IO]",a)};var Plugins=Keen.Plugins={};Keen.prototype.addEvent=function(){_uploadEvent.apply(this,arguments)},Keen.prototype.trackExternalLink=function(a,b,c,d,e){void 0===d&&(d=500);var f=!1,g=function(){};return"A"===a.nodeName?g=function(){f||(f=!0,window.location=a.href)}:"FORM"===a.nodeName&&(g=function(){f||(f=!0,a.submit())}),e&&(g=function(){f||(f=!0,e())}),_uploadEvent.apply(this,arguments),setTimeout(function(){g()},d),!1},Keen.prototype.setGlobalProperties=function(a){if(!this.client)return Keen.log("Check out our JavaScript SDK Usage Guide: https://keen.io/docs/clients/javascript/usage-guide/");if(!a||"function"!=typeof a)throw new Error("Invalid value for global properties: "+a);this.client.globalProperties=a},Keen.Base64={map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(a){var b,c,d,e,f,g,h,i="",j=0,k=this.map;for(a=this.utf8.encode(a);j<a.length;)b=a.charCodeAt(j++),c=a.charCodeAt(j++),d=a.charCodeAt(j++),e=b>>2,f=(3&b)<<4|c>>4,g=isNaN(c)?64:(15&c)<<2|d>>6,h=isNaN(c)||isNaN(d)?64:63&d,i=i+k.charAt(e)+k.charAt(f)+k.charAt(g)+k.charAt(h);return i},decode:function(a){var b,c,d,e,f,g,h,i="",j=0,k=this.map,l=String.fromCharCode;for(a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");j<a.length;)b=k.indexOf(a.charAt(j++)),c=k.indexOf(a.charAt(j++)),d=k.indexOf(a.charAt(j++)),e=k.indexOf(a.charAt(j++)),f=b<<2|c>>4,g=(15&c)<<4|d>>2,h=(3&d)<<6|e,i=i+(l(f)+(64!=d?l(g):""))+(64!=e?l(h):"");return this.utf8.decode(i)},utf8:{encode:function(a){for(var b,c="",d=0,e=String.fromCharCode;d<a.length;)b=a.charCodeAt(d++),c+=128>b?e(b):b>127&&2048>b?e(b>>6|192)+e(63&b|128):e(b>>12|224)+e(b>>6&63|128)+e(63&b|128);return c},decode:function(a){for(var b,c,d="",e=0,f=String.fromCharCode;e<a.length;)c=a.charCodeAt(e),d+=128>c?[f(c),e++][0]:c>191&&224>c?[f((31&c)<<6|63&(b=a.charCodeAt(e+1))),e+=2][0]:[f((15&c)<<12|(63&(b=a.charCodeAt(e+1)))<<6|63&(c3=a.charCodeAt(e+2))),e+=3][0];return d}}},"object"!=typeof JSON&&(JSON={}),function(){function f(a){return 10>a?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return"string"==typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g,h=gap,i=b[a];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(a)),"function"==typeof rep&&(i=rep.call(b,a,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,g=[],"[object Array]"===Object.prototype.toString.apply(i)){for(f=i.length,c=0;f>c;c+=1)g[c]=str(c,i)||"null";return e=0===g.length?"[]":gap?"[\n"+gap+g.join(",\n"+gap)+"\n"+h+"]":"["+g.join(",")+"]",gap=h,e}if(rep&&"object"==typeof rep)for(f=rep.length,c=0;f>c;c+=1)"string"==typeof rep[c]&&(d=rep[c],e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));return e=0===g.length?"{}":gap?"{\n"+gap+g.join(",\n"+gap)+"\n"+h+"}":"{"+g.join(",")+"}",gap=h,e}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;"function"!=typeof JSON.stringify&&(JSON.stringify=function(a,b,c){var d;if(gap="",indent="","number"==typeof c)for(d=0;c>d;d+=1)indent+=" ";else"string"==typeof c&&(indent=c);if(rep=b,b&&"function"!=typeof b&&("object"!=typeof b||"number"!=typeof b.length))throw new Error("JSON.stringify");return str("",{"":a})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),void 0!==d?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();var loaded=window.SpitKeen,cached=window._Keen||{},clients,ready;if(loaded&&cached){clients=cached.clients||{},ready=cached.ready||[];for(var instance in clients)if(clients.hasOwnProperty(instance)){var client=clients[instance];for(var method in Keen.prototype)Keen.prototype.hasOwnProperty(method)&&(loaded.prototype[method]=Keen.prototype[method]);if(loaded.Query=Keen.Query?Keen.Query:function(){},loaded.Visualization=Keen.Visualization?Keen.Visualization:function(){},client._config&&(client.configure.call(client,client._config),delete client._config),client._setGlobalProperties){for(var globals=client._setGlobalProperties,i=0;i<globals.length;i++)client.setGlobalProperties.apply(client,globals[i]);delete client._setGlobalProperties}if(client._addEvent){for(var queue=client._addEvent||[],i=0;i<queue.length;i++)client.addEvent.apply(client,queue[i]);delete client._addEvent}var callback=client._on||[];if(client._on){for(var i=0;i<callback.length;i++)client.on.apply(client,callback[i]);client.trigger("ready"),delete client._on}}for(var i=0;i<ready.length;i++){var callback=ready[i];Keen.on("ready",function(){callback()})}}return setTimeout(function(){Keen.loaded&&Keen.trigger("ready")},0),Keen});
;
  window.Spit = (function() {

    /*
      Spit should be constructed with an options parameters. Here are the keys
      that are required:

        name ~ This should be a string with the name of the test set

        variations ~ this should be an array of variations. The variations should be
          formatted as such:

          {
            name: "Blue Button"
            path: "/blue_button" #This would prepend all asset paths with "/blue_button"
          }

        keen_write_key ~ The keen write key

        keen_project_id ~ The keen project id

      Here are the optional values that you can pass:

      multiple_goals ~ allow goal events to be sent multiple times
      css: array of CSS files that should be loaded with the variant path prepended
      js: array of JS files that should be loaded with the variant path prepended
     */
    Spit.prototype.goalCompleted = false;

    function Spit(options) {
      this.options = options;
      if ((this.options.name == null) || this.options.name === "") {
        throw "You need to name the test!";
      }
      if (!this.options.variations) {
        throw "You can't spit without passing in some variations!";
      }
      if (this.options.variations.length === 0) {
        throw "Your didn't provide any variations!";
      }
      if ((this.options.keen_write_key == null) || this.options.keen_write_key === "") {
        throw "You have to provide a Keen.IO write key!";
      }
      if ((this.options.keen_project_id == null) || this.options.keen_project_id === "") {
        throw "You have to provide a Keen.IO write key!";
      }
      this.getVariation();
      this.setUUID();
      this.initializeKeen();
      this.pageload();
      this.loadCSS();
      this.loadJS();
    }

    Spit.prototype.initializeKeen = function() {
      this.keen = new SpitKeen({
        projectId: this.options.keen_project_id,
        writeKey: this.options.keen_write_key
      });
      return this.keen.setGlobalProperties(this.keenGlobals.bind(this));
    };

    Spit.prototype.keenGlobals = function(eventCollection) {
      var properties;
      properties = {
        test: this.options.name,
        variation: this.variation.name
      };
      return properties;
    };

    Spit.prototype.getVariation = function() {
      var currentVariant, variant, _i, _len, _ref;
      currentVariant = this.getCookie("spit_variant");
      if (currentVariant) {
        _ref = this.options.variations;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          variant = _ref[_i];
          if (variant.name === currentVariant) {
            this.variation = variant;
          }
        }
      }
      if (this.variation == null) {
        this.variation = this.options.variations[Math.floor(Math.random() * this.options.variations.length)];
        return this.setCookie("spit_variant", this.variation.name);
      }
    };

    Spit.prototype.setUUID = function() {
      this.uuid = this.getCookie("spit_uuid");
      if (!this.uuid) {
        this.uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r, v;
          r = Math.random() * 16 | 0;
          v = c === 'x' ? r : r & 0x3 | 0x8;
          return v.toString(16);
        });
        return this.setCookie("spit_uuid", this.uuid, false);
      }
    };

    Spit.prototype.loadCSS = function() {
      var link, style, _i, _len, _ref, _results;
      if ((this.options.css != null) && typeof this.options.css === "object" && (this.options.css.length != null)) {
        _ref = this.options.css;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          style = _ref[_i];
          link = document.createElement("link");
          link.type = "text/css";
          link.rel = "stylesheet";
          link.href = this.variantPath(style);
          console.log(link);
          _results.push(document.head.appendChild(link));
        }
        return _results;
      }
    };

    Spit.prototype.loadJS = function() {
      var js, script, _i, _len, _ref, _results;
      if ((this.options.js != null) && typeof this.options.js === "object" && (this.options.js.length != null)) {
        _ref = this.options.js;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          js = _ref[_i];
          script = document.createElement("script");
          script.type = "text/javascript";
          script.src = this.variantPath(js);
          _results.push(document.head.appendChild(script));
        }
        return _results;
      }
    };

    Spit.prototype.pageload = function() {
      return this.sendEvent({
        test: this.options.name,
        variation: this.variation.name,
        event: "pageload"
      });
    };

    Spit.prototype.goal = function(label) {
      if (!this.goalCompleted) {
        this.goalCompleted = true;
        return this.sendEvent({
          test: this.options.name,
          variation: this.variation.name,
          event: "goal",
          label: label
        });
      }
    };

    Spit.prototype.action = function(label) {
      if ((label == null) || label === "") {
        throw "Can't send an action without a label!";
      }
      return this.sendEvent({
        test: this.options.name,
        variation: this.variation.name,
        event: "action",
        label: label,
        completedGoal: this.goalCompleted
      });
    };

    Spit.prototype.sendEvent = function(evnt) {
      return this.keen.addEvent("ab_event", evnt);
    };

    Spit.prototype.variantPath = function(path) {
      return "" + this.variation.path + path;
    };

    Spit.prototype.getCookie = function(name) {
      var parts, value;
      value = "; " + document.cookie;
      parts = value.split("; " + name + "=");
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      } else {
        return false;
      }
    };

    Spit.prototype.setCookie = function(name, value, expiresDate) {
      if (expiresDate == null) {
        expiresDate = true;
      }
      if (expiresDate === true) {
        expiresDate = "; expires=" + (Math.round(Date.now() / 1000) + (60 * 60 * 24 * 7));
      } else if (expiresDate) {
        expiresDate = "; expires=" + expiresDate;
      } else {
        expiresDate = "";
      }
      return document.cookie = "" + name + "=" + value + expiresDate;
    };

    return Spit;

  })();

}).call(this);
