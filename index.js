(function(){
	var buttonsContainer = document.getElementsByClassName('buttons-container')[0];
	buttonsContainer.addEventListener('click', onSourceClick);


	var API_KEY = '6dc2f16f1c6245c8ac3b8a6815dc9044';
	var sourcesUrl = 'https://newsapi.org/v2/sources?apiKey=' + API_KEY;
	var topHeadlinesUrlTemplate = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + API_KEY;


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
		event.preventDefault();
	}

})();