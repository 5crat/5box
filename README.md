5box
===
##### 一个chrome插件
##### 各种编码解码功能集
## 支持编码解码类型
+ Unicode
> eg:
>> encode: &nbsp;&nbsp;test ---> \u0074\u0065\u0073\u0074    
>> decode: &nbsp;&nbsp;哈哈--->\u54c8\u54c8
+ Base64
> eg:
>> encode: &nbsp;&nbsp;哈哈 ---> 5ZOI5ZOI
>> decode: &nbsp;&nbsp; 
+ HtmlToDec (html十进制编码解码)
> eg:
>> encode: &nbsp;&nbsp;haha ---> &#104;&#97;&#104;&#97
>> decode: &nbsp;&nbsp;&#104;&#101;&#104;&#101 ---> hehe
+ HtmlToHex (html十六进制编码解码)
> eg:
>> encode: &nbsp;&nbsp;haha ---> &#x0068;&#x0061;&#x0068;&#x0061
>> decode: &nbsp;&nbsp;&#x0068;&#x0065;&#x0068;&#x0065 ---> hehe
+ Urlencode (url编码解码)
> eg:
>> encode: &nbsp;&nbsp;<img/src="1">  ---> %3Cimg/src%3D%221%22%3E
>> decode: &nbsp;&nbsp;%3Fid%3D1%27   ---> ?id=1'
+ StringCharCode ()
> eg:  
>> encode: &nbsp;&nbsp; test ---> 116,101,115,116
>> decode: &nbsp;&nbsp; 104,97,104,97 ---> haha
>> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CHAR(116)+CHAR(101)+CHAR(115)+CHAR(116) ---> test           
>> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CHAR(116,101,115,116) ---> test
+ MD5
> eg:
>> encode: &nbsp;&nbsp; test ---> 098f6bcd4621d373cade4e832627b4f6
>> decode: &nbsp;&nbsp; no support
+ Hex->Dec
> eg:
>> encode: &nbsp;&nbsp; 16 --->  22 (dec)
>> decode: &nbsp;&nbsp; 10 --->  a  (hex)

_____

上面的功能和解码都是我自己比较常用的一些，大伙可根据自己需求调整添加，除了上面那些编码解码功能，还加入了cookie利用工具，其中cookie injection参考了cos的插件，我基本没用过几次

主要功能实现代码在/src/js/devtoolbox.js

插件可能有bug存在，反正我还没发现，如果你发现了bug，自己修改。。。

如何添加到chrome不用说应该都知道