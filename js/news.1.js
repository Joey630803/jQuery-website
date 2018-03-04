function getDetails(pageNum) {
    // 资讯快递
    fetch('http://192.168.0.200:8090/matterController/selectMatterPageBymidTojson?pageNum='+pageNum+'&Size=5&type=24')
    .then(function(response) {
        return response.json()
    }).then(function(data) {
        var listData = data.list;
        var title = "<div class='news-title'><h5>资讯速递/<span>NEWS</span></h5></div><div class='searchName clearfix'><input placeholder='请输入'><button>搜索...</button></div>"
        var contentHtml = "";
        for(var i=0;i<listData.length;i++){
            var thumbnail = typeof listData[i].thumbnail === 'undefined' ? 'images/none-01.jpg' : listData[i].thumbnail
            contentHtml+="<div class='news-pic-info clearfix'>"
            +"<div class='news-pic'><img src='"+ thumbnail +"' alt='没有图片哟' width='380' height='216'/></div>"+
            "<div class='news-info'><div><span  class='news-date'>"+listData[i].date+"</span><span class='wechat'><icon class='fa fa-wechat'/>"+ (Math.random() * 1000).toFixed(0) +"</span></div><h5>"+listData[i].matterTitle+"</h5><p>"+listData[i].abstract  +"</p><a href='details.html?type=27&newId="+listData[i].m_id+"' class='more'>详情</a></div>"+
            "</div> <hr class='xian'/>"
        }
        if (!$('.M-box').children().length) {
            $('.M-box').pagination({
                totalData:listData.navigatePages,
                showData:5,
                coping:true,
                callback: function (api) {
                    getDetails(api.getCurrent())
                    $('html,body').animate({scrollTop: '150px'}, 800);
                }
            });
        }
        $("#newsList").html(title+contentHtml);
    }).catch(function(ex) {
        console.log('parsing failed', ex)
    })
}

$(function() {
    getDetails(1);
    // 热点资讯
    fetch('http://192.168.0.200:8090/matterController/selectMatterPageBymidTojson?pageNum=1&Size=6&type=24')
    .then(function(response) {
        return response.json()
    }).then(function(data) {
        var list = data.list;
        var html = '';
        for (var i=0;i<list.length;i++) {
            html += "<li><a href='details.html?type=27&newId="+list[i].m_id+"'>"+list[i].matterTitle+"</a></li>";
        }
        $('#hot-list').html(html);
    }).catch(function(ex) {
        console.log('parsing failed', ex)
    })
    // $.getJSON('Json/data.json', function(data) {

    //     //精彩资讯
    //     var highData = data.hightInfo.newList;
    //     var highTitle='<h5>'+data.hightInfo.hightTitle+'</h5>';
    //     var highHtml = "";
    //     for(var i=0;i<3;i++){
    //         highHtml+='<div class="hight-news-content clearfix"><div class="hight-news-pic"><img src="'+highData[i].imgUrl+'"/></div>'+
    //         '<div class="hight-news-info"><a href="details.html?type=hightInfo&newId='+highData[i].newId+'"><p>'+highData[i].title+'</p></a><span>'+highData[i].date+'</span></div></div>'
    //     }
    //     $("#hight-news").html(highTitle+highHtml);

    //     //热点资讯
    //     var hotData = data.hotInfo.newList;
    //     var hotHtml = "";
    //     for(var i=0;i<hotData.length;i++){
    //         hotHtml+=' <li><a href="details.html?type=hotInfo&newId="'+hotData.newId+'>'+hotData[i].title+'</a></li>'
    //     }
    //     $("#hot-list").html(hotHtml);


    // });
});