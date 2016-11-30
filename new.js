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

        // AJAX CALL TO GET THE ARTICLES
        var name = $('select option:selected').val();
        console.log(name);
        var url = "https://api.nytimes.com/svc/topstories/v2/" + name+".json";
        url += '?' + $.param({
          'api-key': "2824c92828de454daccd0f86c22fb3e4"
        });
        $.ajax({
          url: url,
          method: 'GET',
        }).done(function(result) {
            $(".loader").show();
          console.log(result);
            buildArticle(result);
        }).fail(function(err) {
          throw err;
        });
    })
})
