$(document).ready(function() {
  /** function and created variables for elements within NY Times result object **/
  function create(result){
    var web_url=result.results[0].url;
    var multimedia= result.results[0].multimedia[4].url;
    var snippet=result.results[0].abstract;
}
/** select section **/
  $('select').on( "change", function() {
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


    }).fail(function(err) {
      throw err;
    });


  })
})
