$(document).ready(function() {
    $("a").on("click", function(e) {
        event.preventDefault();
        var url= "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url + '?' + $.param( {
            ' api-key': "2824c92828de454daccd0f86c22fb3e4"
        });
        $.ajax( {
            url: url, method: 'GET',
        })
          .done(function (data) {
            var articles= data.response.docs;
            for (var i=0; i < articles.length; i++) {
                if(data.response.docs[i].multimedia.length >2) {
                    console.log(data);
console.log(data)
                    var clone=$('article').eq(0).clone();
                    var web_url=data.response.docs[i].web_url;
                    var snippet= data.response.docs[i].snippet;
                    var multimedia= "https://nytimes.com/" + (data.response.docs[i].multimedia[1].url);
                    console.log(web_url);
                    console.log(snippet);
                    console.log(multimedia);
                    console.log(data);                    $(clone).css("background-image", "url("+ multimedia +")");
                    $(clone).children('.white').html(snippet);
                    $(clone).children('.clip').attr("href", web_url);
                    $("article").children(".pic").attr("src", multimedia);
                    $("article div").children('.white').text(snippet);
                    $("article div").children(".url").attr("href", web_url);
                    $('.response').append(clone);
                    $('article').show();


                    function buildArticle(data) {
                      var articles= data.response.docs;
                      for (var i=0; i < articles.length; i++){
                          if(data.response.docs[i].multimedia.length >2) {
                            var clone=$('article').eq(0).clone();
                            var web_url=data.response.docs[i].web_url;

                            var snippet= data.response.docs[i].snippet;

                            var multimedia= "https://nytimes.com/" + (data.response.docs[i].multimedia[1].url);

                            $(clone).css("background-image", "url("+ multimedia +")");
                            $(clone).children('.article').children('p').html(snippet);
                            $(clone).children('.clip').attr("href", web_url);
                            $("article").children(".pic").attr("src", multimedia);
                            $("article div").children("p").text(snippet);
                            $("article div").children(".url").attr("href", web_url);
                            $('.response').append(clone);
                            $('article').show();

                          };
                      };
                    };
                  };
              };
            });
        });
  })
