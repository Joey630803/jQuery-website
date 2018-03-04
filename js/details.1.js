function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}


$(function() {
    // 详情
    var m_id = GetQueryString('newId');
    fetch('http://120.26.128.15:8903/matterController/selectBymidjson?m_id='+m_id)
    .then(function(response) {
      return response.json()
    }).then(function(data) {
        //新闻详情
        var title = "<div class='news-title'><h5>"+data.matterTitle+"</h5></div>"
        $("#detailTitle").html(title)
        $('#date').html(data.date);
        $("#details").html(data.matterDetails);
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
    // 精彩资讯
    fetch('http://192.168.0.200:8090/matterController/selectBymidjson?m_id='+m_id)
    .then(function(response) {
      return response.json()
    }).then(function(data) {
        fetch('http://192.168.0.200:8090/matterController/selectMatterPageBymidTojson?pageNum=1&Size=3&type=24')
        .then(function(response) {
          return response.json()
        }).then(function(data) {
            var list = data.list;
            var listHtml = "";
            for(var j=0 ; j< list.length;j++ ){
                var thumbnail = typeof list[j].thumbnail === 'undefined' ? 'images/none-02.jpg' : list[j].thumbnail;
                listHtml += '<div class="hight-news-content clearfix">' +
                                    '<div class="hight-news-pic">' + 
                                        '<img src="'+thumbnail+'"/>' + 
                                    '</div>' +
                                    '<div class="hight-news-info">' + 
                                        '<p>'+list[j].matterTitle+'</p>' +
                                        '<span>'+list[j].date+'</span>' +
                                    '</div>' + 
                                  '</div>'
            }
            $("#hight-news").append(listHtml)
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        })
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
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
});