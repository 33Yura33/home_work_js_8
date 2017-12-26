$(document).ready(function(){

	var api_key = "f24a0fd18f52218851075901c5a108a0",
		url_ = "https://api.themoviedb.org/3/",
		language = "ru-RU";

	$("#search-films").submit(function(){

		var search_url = url_ + "search/movie",
			search_query = $(this).find("#film-q").val();

		if (search_query.length < 1) {
			alert("Введите как минимум 1 символ");
			return false;
		}
		$.ajax({
			url: search_url,
			method: "GET",
			data: {
				"api_key" : api_key,
				"language" : language,
				"query" : search_query,
				"page" : 1,
				"include_adult" : false
			},
			success : function(result){
				$("#film-q").val("");
				showFilms($(".films_list"), result.results, search_query);
			}
		});

		return false;
	});

	$("#search-popular").click(function(){

		var popular_url = url_ + "movie/popular";

		$.ajax({
			url: popular_url,
			method: "GET",
			data: {
				"api_key" : api_key,
				"language" : language,
				"page" : 1,
			},
			success : function(result){
				showFilms($(".films_list"), result.results);
			}
		});

		return false;
	});

	$("#search-top-rated").click(function(){
		
		var top_rated_url = url_ + "movie/top_rated";

		$.ajax({
			url: top_rated_url,
			method: "GET",
			data: {
				"api_key" : api_key,
				"language" : language,
				"page" : 1,
			},
			success : function(result){
				showFilms($(".films_list"), result.results);
			}
		});

		return false;
	});

	$("#search-upcoming").click(function(){
		
		var upcoming_url = url_ + "movie/upcoming";

		$.ajax({
			url: upcoming_url,
			method: "GET",
			data: {
				"api_key" : api_key,
				"language" : language,
				"page" : 1,
			},
			success : function(result){
				showFilms($(".films_list"), result.results);
			}
		});

		return false;
	});

});


function showFilms(selector, films_aray, search_query = ""){
	selector.html("");

	if (films_aray.length <= 0) {
		selector.append($("#films_not_found").tmpl({
			"search_query" : search_query
		}));
		return false;
	}

	films_aray.forEach(function(film, index){
		selector.append($("#film_element").tmpl({
			film_name: film.title,
			film_description: film.overview.substring(0,100) + "...",
			film_poster: film.poster_path,
			film_date: film.release_date,
			film_raiting: film.vote_average
		}));
	});
}