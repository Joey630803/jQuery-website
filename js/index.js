$(function() {
  // 资讯快递27 行业资讯28 系统公告29 热点资讯30 精彩资讯31
  var uri = 'http://118.31.237.150:8090';
  // 资讯快递
  fetch(uri + '/matterController/selectMatterPageBymidTojson?pageNum=1&Size=3&type=24')
  .then(function(response) {
    return response.json()
  }).then(function(data) {
      var listData = data.list;
      var title = "<div class='news-title'><h5>资讯速递/<span>NEWS</span></h5></div>"
      var contentHtml = "";
      for(var i=0;i<listData.length;i++){
          var thumbnail = typeof listData[i].path === 'undefined' ? 'images/none-01.jpg' : uri + listData[i].path
          contentHtml+="<div class='news-pic-info clearfix'>"
          +"<div class='news-pic'><img src='"+ thumbnail +"' alt='没有图片哟' width='380' height='216'/></div>"+
          "<div class='news-info'><div><span  class='news-date'>"+listData[i].updata_date+"</span><span class='wechat'><icon class='fa fa-wechat'/>"+ (Math.random() * 1000).toFixed(0) +"</span></div><h5>"+listData[i].matterTitle+"</h5><p>"+listData[i].digest  +"</p><a href='details.html?type=24&newId="+listData[i].m_id+"' class='more'>详情</a></div>"+
          "</div> <hr class='xian'/>"
      }
      $("#fastMail").html(title+contentHtml);
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })

  // 行业讯息
  fetch(uri + '/matterController/selectMatterPageBymidTojson?pageNum=1&Size=5&type=28')
  .then(function(response) {
    return response.json()
  }).then(function(data) {
      var industryData = data.list;
      //左边
      var firtData = industryData[0];
      var thumbnail = typeof firtData.path === 'undefined' ? 'images/none-01.jpg' : uri + firtData.path;
      var leftHtml = '<a href="details.html?type=28&newId='+firtData.m_id+'"> <img src="'+thumbnail+'" alt="" width="380" height="216"></a><h5>'+firtData.matterTitle+'</h5>'+
      '<p>'+''+' </p>'
      $("#industry-content-left").html(leftHtml);
      //右边
      var rightHtml = "";
      for(var j=1 ; j< industryData.length;j++ ){
        rightHtml += '<li><a href="details.html?type=28&newId='+industryData[j].m_id+'">'+industryData[j].matterTitle+' <span class="date">'+industryData[j].updata_date+'</span></a></li>'
      }
      $("#industry-content-right").html('<ul>'+rightHtml+'</ul>');
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })

  // 系统公告
  fetch(uri + '/matterController/selectMatterPageBymidTojson?pageNum=1&Size=5&type=29')
  .then(function(response) {
    return response.json()
  }).then(function(data) {
      //系统公告
      var systemData = data.list;
      var systemFirstData = systemData[0];
      var thumbnail = typeof systemFirstData.path === 'undefined' ? 'images/none-01.jpg' : uri + systemFirstData.path;
      var headHtml = '<div class="pic-text clearfix"><img src="'+thumbnail+'" alt=""/>'+
      '<p>'+systemFirstData.matterTitle+'</p></div>'+
      '<div class="button-boxs"><a href="#">联系</a><a href="details.html?type=29&newId='+systemFirstData.m_id+'">详情</a> </div>';
      $("#system-head").html(headHtml);

      var systemListHtml = "";
      for(var j=1 ; j< systemData.length;j++ ){
          systemListHtml += ' <li><a href="details.html?type=29&newId='+systemData[j].m_id+'">'+systemData[j].matterTitle+' <span class="iconRight"><icon class="fa fa-arrow-circle-right"/></span></a></li>'
      }
      $("#system-list").html(systemListHtml)
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })

function searchNews(searchVal){

  var reg = new RegExp(searchVal, 'gi')

  fetch(uri + '/matterController/selectMatterPageBymidTojson?pageNum=1&Size=3&type=24')
  .then(function(res) {
    return res.json()
  }).then(function(data) {
      var listData = data.list;
      var title = "<div class='news-title'><h5>资讯速递/<span>NEWS</span></h5></div>"
      var contentHtml = "";

      let result=listData.map((j,index)=>{

      var Match = j.matterTitle.match(reg);
      
      if (!Match) {
        return null;
      }else{
        return {
          ...j
        }
      }
      }).filter(j => !!j)

      for(var i=0;i<result.length;i++){

        var thumbnail = typeof result[i].path === 'undefined' ? 'images/none-01.jpg' : uri + result[i].path
        contentHtml+="<div class='news-pic-info clearfix'>"
        +"<div class='news-pic'><img src='"+ thumbnail +"' alt='没有图片哟' width='380' height='216'/></div>"+
        "<div class='news-info'><div><span  class='news-date'>"+result[i].updata_date+"</span><span class='wechat'><icon class='fa fa-wechat'/>"+ (Math.random() * 1000).toFixed(0) +"</span></div><h5>"+result[i].matterTitle+"</h5><p>"+result[i].digest  +"</p><a href='details.html?type=24&newId="+result[i].m_id+"' class='more'>详情</a></div>"+
        "</div> <hr class='xian'/>"
      }
      $("#fastMail").html(title+contentHtml);
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })

}

  $('.inputSearch').keyup(function(e){
    if(e.keyCode === 13){
      var searchVal = $('.inputSearch').val()
      searchNews(searchVal)
    }
  })

  $('.search').on('click',function(){
    var searchVal = $('.inputSearch').val()
    searchNews(searchVal)
  })



      // $.getJSON('Json/data.json', function(data) {

        // 专题
        // var topicsData = data.topicsInfo.newList;
        // var topicsListHtml = "";
        // for(var j=0 ; j< topicsData.length;j++ ){
        //     console.log(topicsData[j].newId)
        //     topicsListHtml += '<li><img src="'+topicsData[j].imgUrl+'" alt=""/><a href="details.html?type=topicsInfos&newId='+topicsData[j].newId+'">'+topicsData[j].title+'</a></li>'
        // }
        // $("#topicsList").html(topicsListHtml);
         
    //});
});
