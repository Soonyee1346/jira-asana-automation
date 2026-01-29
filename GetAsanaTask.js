function getAsanaTask(taskGid) {
  const url = `https://app.asana.com/api/1.0/tasks/${taskGid}`;
  
  const options = {
    "method": "get",
    "headers": {
      "Authorization": "Bearer " + ASANA_API_TOKEN,
      "Accept": "application/json"
    },
    "muteHttpExceptions": true
  };

  const response = UrlFetchApp.fetch(url, options);
  const responseCode = response.getResponseCode();
  const content = JSON.parse(response.getContentText());

  if (responseCode === 200) {
    return content.data;
  } else if (responseCode === 404) {
    Logger.log("Task not found (it may have been deleted).");
    return null;
  } else {
    Logger.log("Error fetching task: " + content.errors[0].message);
    return null;
  }
}