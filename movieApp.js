var baseImgUrl = 'http://image.tmdb.org/t/p/w185/';
var baseImgUrlL = 'http://image.tmdb.org/t/p/w500/';
var moviesArr;
var apiKey = 'bab007b9a6288af1455b8cee1f4f9d36';
var movieData;

function LoadData () {
  var mostPopularURL = 'http://api.themoviedb.org/3/movie/popular?api_key=';
  var topRatedURL = 'http://api.themoviedb.org/3/movie/top_rated?api_key=';
  getMovies(mostPopularURL);
   $('#topRated').click(function (){

    getMovies(topRatedURL);
  });
  $('#MostPopular').click(function (){
    getMovies(mostPopularURL);
  });
}


function addListener ()
{
    $('#details').click(function (){
    getMovieDetails(moviesArr[0].id);
  });
    $('#trailers').click(function (){
    getMovieTrailers(moviesArr[0].id);
  });
    $('#reviews').click(function (){
    getMovieReviews(moviesArr[0].id);
  });

}


function loadMovies()
{
  $('#movies').empty();
  var rowCount = 1;
  $("#movies").append("<div id='movies"+rowCount+"'' class='row moviesRow'></div>");
  for (var i =0; i < moviesArr.length; i ++) {
    if (i%6 === 0 && i !==0 && i !== 1)
    {
      rowCount++;
      $("#movies").append("<div id='movies"+rowCount+"'' class='row moviesRow'></div>");
    }
    var idName = '#movies' + rowCount;
    $(idName).append("<div class='col-xs-2'><a href='details.html?id="+moviesArr[i].id+"'><img src='"+ baseImgUrl + moviesArr[i].poster_path +"'></a></div>");
  }
}

function getMovies(url)
{
  $.ajax({
    type: 'GET',
    url: url + apiKey,
    async: true,
    jsonpCallback: 'testing',
    contentType: 'application/json',
    dataType: 'jsonp',
      success: function(json) {
        moviesArr = json.results;
        addListener();
        loadMovies();
        console.log(json);
      },
      error: function(e) {
        console.log(e.message);
      }
  });
}

function getMovieDetails (movieId)
{
  $.ajax({
    type: 'GET',
    url: 'http://api.themoviedb.org/3/movie/'+ movieId+'?api_key=' + apiKey,
    async: false,
    jsonpCallback: 'testing',
    contentType: 'application/json',
    dataType: 'jsonp',
      success: function(json) {
        movieData = json;
        loadMovieDetails();
      },
      error: function(e) {
        console.log(e.message);
      }
  });
}

var movieTra= '';
function getMovieTrailers (movieId)
{
  $.ajax({
    type: 'GET',
    url: 'http://api.themoviedb.org/3/movie/'+ movieId+'/videos?api_key=' + apiKey,
    async: false,
    jsonpCallback: 'testing',
    contentType: 'application/json',
    dataType: 'jsonp',
      success: function(json) {
        movieTra = json.results;
        loadMoviesTrailars();
        console.log(json);
      },
      error: function(e) {
        console.log(e.message);
      }
  });
}

var movieReviewList='';
function getMovieReviews (movieId)
{
  $.ajax({
    type: 'GET',
    url: 'http://api.themoviedb.org/3/movie/'+ movieId+'/reviews?api_key=' + apiKey,
    async: false,
    jsonpCallback: 'testing',
    contentType: 'application/json',
    dataType: 'jsonp',
      success: function(json) {
        movieReviewList = json.results;
        loadMoviesReviews();
        console.log(json);
      },
      error: function(e) {
        console.log(e.message);
      }
  });
}

var param1var;
function loadDetailsPage()
{
  param1var = getQueryVariable("id");
  getMovieDetails(param1var);

}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  alert('Query Variable ' + variable + ' not found');
}

function loadMovieDetails()
{
  $('#poster').append("<img id='poster' src='"+ baseImgUrlL + movieData.poster_path+"'' alt='movie poster' class='img-responsive poster-img'>");
  $('#movieTitle').append("<h2>"+movieData.original_title+"</h2>");
  $('#releaseDate').append("<p>"+movieData.release_date+"</p>");
  $('#movieRateing').append("<p>"+movieData.vote_average+"</p>");
  $('#movieRuntime').append("<p>"+movieData.runtime+"</p>");
  $('#overView').append("<p>"+movieData.overview+"</p>");
  //var movieReviewList =
  $("#trailerbtn").click(function(){
    getMovieTrailers(param1var);
  });
    $("#reviewbtn").click(function(){
    getMovieReviews(param1var);
  });

}

function loadMoviesTrailars()
{$("#trailersList").empty();
  for (var i = 0; i< movieTra.length; i++) {
    $("#trailersList").append("<li><a href='https://www.youtube.com/watch?v="+ movieTra[i].key+"'>"+movieTra[i].name+"</a><hr></li>")
  }

}

function loadMoviesReviews()
{$("#reviewList").empty();
  for (var i = 0; i< movieReviewList.length; i++) {
    $("#reviewList").append("<li><p class='review'>"+movieReviewList[i].content+"</p><p class='review'>By: "+movieReviewList[i].author+"</p><hr></li>")

  }

}







