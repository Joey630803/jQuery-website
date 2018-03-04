var uri = 'http://118.31.237.150:8090';

function getDetails(pageNum, matterTitle, isReload) {
    // 资讯快递
    var title = typeof matterTitle === 'undefined' ? '' : matterTitle;
    ///matterController/selectMatterPageBymidTojson?type=24&matterTitle
    fetch(uri + '/matterController/selectMatterPageBymidTojson?pageNum='+pageNum+'&Size=5&type=24&&matterTitle='+title)
    .then(function(response) {
        return response.json()
    }).then(function(data) {
        var listData = data.list;
        //var title = "<div class='news-title'><h5>资讯速递/<span>NEWS</span></h5></div><div class='searchName clearfix'><input placeholder='请输入' id='searchInput'><button id='search'>搜索</button></div>"
        var title = "<div class='news-title'><h5>资讯速递/<span>NEWS</span></h5></div>"
        var contentHtml = "";
        for(var i=0;i<listData.length;i++){
            console.log(listData[i])
            var thumbnail = typeof listData[i].path === 'undefined' ||listData[i].path === null? 'images/none-01.jpg' : uri + listData[i].path
            var digest=listData[i].digest === ''||listData[i].digest === null ? '':listData[i].digest
            contentHtml+="<div class='news-pic-info clearfix'>"
            +"<div class='news-pic'><img src='"+ thumbnail +"' alt='没有图片哟' width='380' height='216'/></div>"+
            "<div class='news-info'><div><span  class='news-date'>"+listData[i].updata_date+"</span><span class='wechat'><icon class='fa fa-wechat'/>"+ (Math.random() * 1000).toFixed(0) +"</span></div><h5>"+listData[i].matterTitle+"</h5><p>"+digest  +"</p><a href='details.html?type=27&newId="+listData[i].m_id+"' class='more'>详情</a></div>"+
            "</div> <hr class='xian'/>"
        }
        if ((!$('.M-box').children().length && listData.length) || isReload) {
            $('.M-box').pagination({
                totalData: data.total,
                showData: 5,
                coping: true,
                callback: function (api) {
                    getDetails(api.getCurrent())
                    //$('html,body').animate({scrollTop: '150px'}, 3000);
                }
            });
        }
        $("#newsList").html(title+contentHtml);
    }).catch(function(ex) {
        console.log('parsing failed', ex)
    })
}

$(function() {
    getDetails(1, '', true);

    $('#search').on('click', function() {
        var inputValue = $('#searchInput').val();
        getDetails(1, inputValue, true)
    })
    // 热点资讯
    fetch(uri + '/matterController/selectMatterPageBymidTojson?pageNum=1&Size=6&type=30')
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
});