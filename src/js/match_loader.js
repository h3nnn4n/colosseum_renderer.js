//const API_URL = "https://colosseum.website/"
const API_URL = "http://localhost:8001/"


function getMatch(matchId) {
  let url = API_URL + "api/matches/" + matchId + "/"
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url, false );
  xmlHttp.send( null );

  let rawPayload = xmlHttp.responseText;
  return JSON.parse(rawPayload);
}

function getMatchReplay(matchId) {
  let url = API_URL + "api/matches/" + matchId + "/replay/"
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url, false );
  xmlHttp.send( null );

  let rawPayload = xmlHttp.responseText;
  return JSON.parse(rawPayload);
}

export { getMatch, getMatchReplay };
