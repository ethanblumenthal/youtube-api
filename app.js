function onClientLoad() {
  gapi.client.load("youtube", "v3", onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
  gapi.client.setApiKey('AIzaSyAoDQfhej71ofLLY36Vx7hVJjwtcdaUrb8');
}

function callYouTubeApi(query) {
  let request = gapi.client.youtube.search.list({
    part: 'snippet',
    q: query,
    maxResults: 3
  });
  request.execute(renderResults);
}

function renderResults(response) {
  let results = [];
  $.each(response.items, function(index, item) {
    results.push(`<img src="${item.snippet.thumbnails.medium.url}" />`);
  });
  $('.main').html(results);
}

function handleSubmit() {
  $('form').submit(evt => {
    evt.preventDefault();
    let query = $('input').val();
    $('input').val('');
    callYouTubeApi(query);
  });
}
handleSubmit();