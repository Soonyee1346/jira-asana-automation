function getAsanaUserGidByEmail() {

  const url = `https://app.asana.com/api/1.0/users/${encodeURIComponent('payal.patel@xero.com')}`;
  const options = {
    "method": "get",
    "headers": { "Authorization": "Bearer " + ASANA_API_TOKEN },
    "muteHttpExceptions": true
  };

  const res = UrlFetchApp.fetch(url, options);
  const responseData = JSON.parse(res.getContentText());

  if (responseData.data) {
    Logger.log(responseData.data.gid);
  } else {
    Logger.log("User not found in Asana for email: " + email);
    return null;
  }
}
