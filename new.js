$(document).ready(function(){
    $("select").on("change", function(e){
        e.preventDefault();

        // CREATE THE ARTICLES
        function buildArticle (result) {
            $("article").not(':first').remove();
            var articleCounter = 1;
            for (var i in result.results) {
                if (result.results[i].multimedia.length != 0) {
                    if (articleCounter < 13) {
                        var webUrl = result.results[i].url;
                        var introInfo = result.results[i].abstract;
                        var image = result.results[i].multimedia[4].url;
                        var clones = $("article").eq(0).clone();

                        $(clones).css('background-image', "url("+ image + ")");
                        $(clones).css('background-size', "cover");
                        $(clones).children("a").children(".space-holder").children(".blurb").children("p").text(introInfo);
                        $(clones).children("a").attr("href", webUrl);

                        $("article").show();
                        $(".loader").hide();
                        $(".results").append(clones);
                        articleCounter = articleCounter +1;
                        }
                    }
                }
                $("article").eq(0).hide();
        }

        // ANIMATE THE HEADER MOVEMENT
        $("header.flex").css("height", "auto");
        $(".logo").animate({"width":"130px"}, 400);
        $("img").animate({"margin":"0 3em"}, 400);

    var value= $('select option:selected').val();
    var url = "https://api.nytimes.com/svc/topstories/v2/" + value +  '.json';
    url += '?' + $.param({
      'api-key': "2824c92828de454daccd0f86c22fb3e4"
  });

 /** get articles from NY Times API**/
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
        create(result);
        var articles= result.results;
        for (var i=0; i < articles.length; i++) {
          if (articles.length < 13) {
            if(result.results[i].multimedia.length>0) {
                var clone=$('article').eq(0).clone();
                var web_url=result.results[i].url;
                var multimedia=  result.results[i].multimedia[4].url;
                var snippet=result.results[i].abstract;
            /**using clone to duplicate elements  **/
                $(clone).css("background-image", "url("+ multimedia +")");
                $(clone).children('.blurb').html(snippet);
                $(clone).children('.url').attr("href", web_url);

            /**appending to  div with results class**/
                $('.results').append(clone);
                $('.article').show();

              }
            }
          }
       /**hide blank article  **/
          $("article").eq(0).hide();
    }).fail(function(err) {
      throw err;
    });


  })
})
