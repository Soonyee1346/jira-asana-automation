function updateAsanaTask(taskId, updateData) {
  const url = `https://app.asana.com/api/1.0/tasks/${taskId}`;

  const payload = {
    data: updateData
  };

  const options = {
    "method": "put",
    "headers": {
      "Authorization": "Bearer " + ASANA_API_TOKEN,
      "Content-Type": "application/json"
    },
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

  const response = UrlFetchApp.fetch(url, options);
  const result = JSON.parse(response.getContentText());

  if (response.getResponseCode() === 200) {
    Logger.log(`Successfully updated task: ${taskId}`);
  } else {
    Logger.log(`Update failed: ${result.errors[0].message}`);
  }
}
