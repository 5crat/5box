$(document).ready(function(){

    var currentTabUrl = '';
    /**
     * 设置cookie函数
     * @param cookies
     */
    var injectCookie = function(cookies){
        if(!cookies){
            $('#statusInfo').text("未填入cookie");
            return;
        }

        var t = new Date();;
        var expired = 365*70;
        var expirationDate = t.setTime(t.getTime()/1000+expired*24*3600);

        var domain = currentTabUrl.split('/')[2];
        if($('#domain').val() != domain){
            domain = $('#domain').val();
        }

        var url = currentTabUrl.split('/')[0] + '//' + domain;
        cookie = cookies.split(';');
        for(i in cookie){
            c = cookie[i].replace(/^\s+|\s+$/g, "");
            if(!c) continue;
            k = c.split('=')[0].replace(/^\s+|\s+$/g, "").replace(' ', '+');
            v = c.split('=')[1].replace(/^\s+|\s+$/g, "").replace(' ', '+');
            chrome.cookies.set({
                'url': url,
                'name': k,
                'value': v,
                'path': '/',
                'domain': $('#domain').val(),
                'expirationDate': expirationDate
            });
        }
        $('#statusInfo').text('success');
    };

    /**
     * 监听“inject”按钮点击
     */
    $('button#injectCookie').click(function(){
        var cookie = $('#cookieInfo').val();
        injectCookie(cookie);
    });

    /**
     * 获得当前tab页的url
     */
    chrome.tabs.getSelected(null,function(tab) {
        currentTabUrl = tab.url;
        //alert(currentTabUrl.split('/')[2]);
        $('#domain').val(currentTabUrl.split('/')[2]);
    });

    /**
     * 监听标签页切换
     */
    $('#toolTab a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    });

    /**
     * ip地理位置查询  用淘宝的API
     */
    $('#ipQuery').click(function(){
        var ipAddr = $('#ipAddr').val();
        $.get("http://ip.taobao.com/service/getIpInfo.php",{ip:ipAddr},function(data){
            try{
                var ipInfo = JSON.parse(data);
                $('#country').text(ipInfo['data']['country']);
                $('#area').text(ipInfo['data']['area']);
                $('#region').text(ipInfo['data']['region']);
                $('#city').text(ipInfo['data']['city']);
                $('#isp').text(ipInfo['data']['isp']);
            }catch (err){
                alert("Query Error!");
            }
        });
    });

    /**
     * 手机归属地查询  用淘宝的API
     */
    $('#mobileQuery').click(function () {
        var phone = $('#mobileNum').val();
        $.get("http://tcc.taobao.com/cc/json/mobile_tel_segment.htm",{tel:phone}, function (data) {
            try{
                var tmpInfo = JSON.stringify(data);
                var mobile = JSON.parse(tmpInfo);
                alert(typeof(mobile));
                $('#mobileIsp').text(mobile['catName']);
                $('#mobileAddr').text(mobile['province']);
            }catch (err){
                alert('Query Error!');
            }
        });
    });

});