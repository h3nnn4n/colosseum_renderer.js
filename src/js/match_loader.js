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

  console.log(`getting match data from ${url}`);
  let data = jsonGet(url);
  const gameName = data.game.name;

  console.log(data);
  setPlayerInfo(data, url);

  console.log(`game name and id is ${data.game.name} ${data.game.id}`);

  return gameName;
}

function setPlayerInfo(data, baseUrl) {
  const re = new RegExp('/api/match.*', 'i');
  const participants = data.participants;
  window.agents = {};

  participants.forEach(function (agentId) {
    let url = baseUrl.replace(re, `/api/agents/${agentId}`);
    console.log(`getting player data from ${url}`);

    $.ajax({
      method: 'GET',
      url: url,
    }).done(function (data) {
      console.log(data);

      const agentId = data.id;
      window.agents[agentId] = data;
    });
  });
}

export { getMatchReplay, getMatchGame };
