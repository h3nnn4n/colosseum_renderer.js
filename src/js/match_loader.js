function jsonGet(url) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', url, false);
  xmlHttp.send(null);

  let rawPayload = xmlHttp.responseText;
  return JSON.parse(rawPayload);
}

function getMatchReplay(url) {
  return jsonGet(url);
}

export { getMatchReplay };
