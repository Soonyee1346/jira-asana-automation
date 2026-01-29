function addAsanaSection() {
  const url = `https://app.asana.com/api/1.0/projects/${ASANA_PROJECT_ID}/sections`

  const addWeek = new Date();
  addWeek.setDate(addWeek.getDate() + (10*7));
  
  const formattedDate = Utilities.formatDate(addWeek, Session.getScriptTimeZone(), "d/M/YYYY");
  
  const payload = {
    data: {
      name: formattedDate.toString(),
    }
  };

  const options = {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + ASANA_API_TOKEN
    },
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const res = UrlFetchApp.fetch(url, options);
  const responseText = res.getContentText();
  Logger.log("Asana Task Created: " + responseText);

  /*const responseObj = JSON.parse(res.getContentText());
  const asanaGid = responseObj.data.gid;
  Logger.log("The GID is: " + asanaGid);*/
}