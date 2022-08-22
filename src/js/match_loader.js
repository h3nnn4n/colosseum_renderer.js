function jsonGet(url) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', url, false);
  xmlHttp.send(null);

  let rawPayload = xmlHttp.responseText;
  return JSON.parse(rawPayload);
}

function getMatchReplay(url) {
  console.log(`getting match url from ${url}`);
  return jsonGet(url);
}

function getMatchGame(url_) {
  let url = url_.replace('/replay/', '/');

  console.log(`getting match url from ${url}`);

  let data = jsonGet(url);
  const gameName = data.game.name;

  console.log(`game name and id is ${data.game.name} ${data.game.id}`);

  return gameName;
}

export { getMatchReplay, getMatchGame };
