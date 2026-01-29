function getAsanaSections(){
  const url = `https://app.asana.com/api/1.0/projects/${ASANA_PROJECT_ID}/sections`;

  const options = { 
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + ASANA_API_TOKEN
    },
    contentType: 'application/json',
    muteHttpExceptions: true
  };

  const res = UrlFetchApp.fetch(url, options);
  const responseText = res.getContentText();
  Logger.log("Asana Tasks: " + responseText);

  const sections = JSON.parse(responseText);

  return sections.data;

}