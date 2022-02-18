var lzma = require('lzma-native');

//var xz = require("xz");
//var lzmajs = require('lzma-purejs');

//require("stream-browserify");Url
//import xz from "xz";

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

function getMatchReplayUrl(matchId) {
  return getMatch(matchId)["replay"];
}

function getMatchReplay(matchId) {
  let url = getMatchReplayUrl(matchId);
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url, false );
  xmlHttp.send( null );

  let rawPayload = xmlHttp.responseText;
  return rawPayload
}

export { getMatch, getMatchReplayUrl, getMatchReplay };
