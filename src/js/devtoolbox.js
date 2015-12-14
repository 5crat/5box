$(document).ready(function(){
    /**
     * Base64 Object
     * @type {{_keyStr: string, encode: encode, decode: decode, _utf8_encode: _utf8_encode, _utf8_decode: _utf8_decode}}
     */
    var Base64 = {

        _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        /**\
         * 编码方法
         * @param input
         * @returns {string}
         */
        encode : function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            input = Base64._utf8_encode(input);

            while (i < input.length) {

                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

            }

            return output;
        },

        /**
         * 解码方法
         * @param input
         * @returns {string}
         */
        decode : function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

            }

            output = Base64._utf8_decode(output);

            return output;

        },

        /**
         * utf8编码解码
         * @param string
         * @returns {string}
         * @private
         */
        _utf8_encode : function (string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        },

        /**
         * utf8解码方法
         * @param utftext
         * @returns {string}
         * @private
         */
        _utf8_decode : function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;

            while ( i < utftext.length ) {
                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i+1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i+1);
                    c3 = utftext.charCodeAt(i+2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    }

    /**
     * Unicode Object
     * @type {{encode: encode, decode: decode}}
     */
    var Unicode = {
        /**
         * Unicode编码方法
         * @param str
         * @returns {string}
         */
        encode : function(str) {
            var res=[];
            for(var i=0;i < str.length;i++){
                var tmp = str.charCodeAt(i).toString(16);
                if(tmp.length == 2){
                    res[i]=("00"+str.charCodeAt(i).toString(16));
                }else{
                    res[i]=(str.charCodeAt(i).toString(16));
                }
            }
            return "\\u"+res.join("\\u");
        },
        /**
         * Unicode解码方法
         * @param str
         * @returns {*}
         */
        decode : function(str) {
            str=str.replace(/\\/g,"%");
            return unescape(str);
        }
    };

    /**
     * URL编码 Object
     * @type {{encode: encode, decode: decode}}
     */
    var Urlcode = {
        encode : function(str){
            return escape(str);
        },
        decode : function(str){
            return unescape(str);
        }
    };

    var StringCharCode = {
        encode : function(str){
            var res=[];
            for(var i=0;i < str.length;i++)
                res[i]=(str.charCodeAt(i));
            return res.join(",");
        },
        decode : function(str){
            var res = '';
            var reg1 = "/\d+/g";
            str = str.toLowerCase()
            if(str.indexOf('char(' > -1)){
                strs = str.match(reg1);
                for (i=0;i<strs.length;i++){
                    if (strs[i].indexOf('0x') > -1){
                        res += String.fromCharCode(parseInt(strs[i],16));
                    }else{
                        res += String.fromCharCode(parseInt(strs[i]));
                    }
                }
            }
            else if (str.indexOf(',') > -1){
                strs = str.split(',');
                for (var i=0;i<strs.length;i++){
                    res += String.fromCharCode(parseInt(strs[i]))
                }
            }else if(str.indexOf('0x')>-1){
                str = str.substring(2);
                strs = [];
                for (var m= 0,n=0;m<str.length;m+=2){
                    strs[n] = str.substring(m,m+2);
                    n++;
                }
                for (i=0;i<strs.length;i++){
                    res += String.fromCharCode(parseInt(strs[i],16))
                }
            }
            return res;
        }
    };

    //html转义功能代码
    var htmlToDec = {
        encode : function(str) {
            var res=[];
            for(var i=0;i < str.length;i++)
                res[i]=("&#"+str.charCodeAt(i));
            return res.join(";");
        },
        decode : function(str) {
            var str ="";
            var strs= $("#htmlescape").val().split("&#");
            for(var i=1;i<strs.length;i++)
            {
                str+=String.fromCharCode(parseInt(strs[i].replace(';','')));
            }
            return str;
        }
    };

    var htmlToHex = {
        encode : function(str) {
            var res=[];
            for(var i=0;i < str.length;i++)
                res[i]=("&#x"+"00"+str.charCodeAt(i).toString(16));
            return res.join(";");
        },
        decode : function(str) {
            var res ="";
            var strs= str.split("&#x");
            for(var i=1;i<strs.length;i++)
            {
                res+=String.fromCharCode(parseInt(strs[i],16));
            }
            return res;
        }
    };
    /**
     * MD5 Object
     * @type {{encode: encode, decode: decode}}
     */
    var MD5 = {
        encode : function(str){
            return $.md5(str);
        },
        decode : function(){
            $('#outCode').val("不支持MD5解密");
        }
    };

    /**
     * 监听“编码”按钮点击动作
     */
    $('button#encode').click(function(){
        var codeFormat = $('#codeFormat').val();
        var input = $('#inCode').val();
        var result = '';
        switch (codeFormat) {
            case "Base64":
                result = Base64.encode(input);
                break;
            case "Unicode":
                result = Unicode.encode(input);
                break;
            case "Urlcode":
                result = Urlcode.encode(input);
                break;
            case "MD5":
                result = MD5.encode(input);
                break;
            case "HtmlToDec":
                result = htmlToDec.encode(input);
                break;
            case "HtmlToHex":
                result = htmlToHex.encode(input);
                break;
            case "StringCharCode":
                result = StringCharCode.encode(input);
                break;
        }
        $('#outCode').val(result);
        getOutLen();
    });

    /**
     * 监听“解码”按钮点击动作
     */
    $('button#decode').click(function(){
        var codeFormat = $('#codeFormat').val();
        var input = $('#inCode').val();
        var result = '';
        switch (codeFormat) {
            case "Base64":
                result = Base64.decode(input);
                break;
            case "Unicode":
                result = Unicode.decode(input);
                break;
            case "Urlcode":
                result = Urlcode.decode(input);
                break;
            case "HtmlToDec":
                result = HtmlToDec.decode(input);
                break;
            case "HtmlToHex":
                result = HtmlToHex.decode(input);
                break;
            case "MD5":
                result = MD5.decode(input);
                break;
            case "StringCharCode":
                result = StringCharCode.decode(input);
                break;
        }
        $('#outCode').val(result);
        getOutLen();
    });

    /**
     * 监听输入框失去焦点计算字符串长度
     */
    $('#inCode').blur(function () {
        $('#intputLength').text($('#inCode').val().length);
    });

    /**
     * 监听输出框失去焦点计算字符串长度
     */
    $('#outCode').blur(function (){
        getOutLen();
    });


    /**
     * 获得输出框的值的长度
     */
    var getOutLen = function(){
        $('#outputLength').text($('#outCode').val().length);
    }

});