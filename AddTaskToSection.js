function addTaskToSection(taskId, sectionId) {
  const url = `https://app.asana.com/api/1.0/sections/${sectionId}/addTask`

  const payload = {
    data: {
      task: `${taskId}`
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
  Logger.log(`Asana Task has been moved` + responseText);
}
