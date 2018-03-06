(function(){
	var buttonsContainer = document.getElementsByClassName('buttons-container')[0];
	var newsContainer = document.getElementsByClassName('news-container')[0];
	buttonsContainer.addEventListener('click', onSourceClick);

	var API_KEY = '6dc2f16f1c6245c8ac3b8a6815dc9044';
	var sourcesUrl = 'https://newsapi.org/v2/sources?apiKey=' + API_KEY;
	var topHeadlinesUrlTemplate = 'https://newsapi.org/v2/top-headlines?apiKey=' + API_KEY;


	var sourcesXhr = new XMLHttpRequest();

	sourcesXhr.open('GET', sourcesUrl);
	sourcesXhr.send();

	sourcesXhr.onreadystatechange = function(){
		if(sourcesXhr.readyState !== 4){
			return;
		}	

		renderButtons();
	};

	function renderButtons(){
		var sources = JSON.parse(sourcesXhr.response).sources;

		for(var i = 0, len = sources.length; i < len; i++){
			addButton(sources[i]);
		}
	}

	function addButton(source){
		var button = document.createElement('button');

		button.innerText = source.name;
		button.setAttribute('data-source-id', source.id);
		buttonsContainer.appendChild(button);
	}
	
	
	
	
	function onSourceClick(event){
		newsContainer.innerText = '';
		event.preventDefault();
		var sourceId = event.target.getAttribute('data-source-id');
		
		if(sourceId){
			getNews(sourceId);
		}
		
	}
	
	function getNews(sourceId){
		var url = topHeadlinesUrlTemplate + '&sources=' + sourceId;
		var requestXhr = new XMLHttpRequest();
		
		requestXhr.open('GET', url);
		requestXhr.send();
		requestXhr.onreadystatechange = function(){
			if(requestXhr.readyState != 4){
				return;
			}
			
			var news = JSON.parse(requestXhr.response).articles;
			for(var i = 0,len = news.length; i < len; i++){
				renderArtice(news[i]);
			}
		}
		
	}
	
	function renderArtice(article){
		var elem = document.createElement('div');
		var link = document.createElement('a');
		link.innerText = article.url;
		elem.innerText = article.title;
		newsContainer.appendChild(elem);
		newsContainer.appendChild(link);
	}

})();