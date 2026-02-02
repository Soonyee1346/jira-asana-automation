function getJiraTicket() {

  const url = `${JIRA_URL}/rest/api/3/search/jql`;

  const jqlQuery = 'status IN (New, Open, Pending, "On Hold") AND summary ~ "STARTER" AND (summary ~ "Australia" OR summary ~ "AU:" OR summary ~ "India" OR summary ~ "PH:" OR summary ~ "Singapore")';

  const authString = Utilities.base64Encode(JIRA_EMAIL + ":" + JIRA_API_TOKEN);

  const payload = {
    "jql": jqlQuery,
    "maxResults": 50,
    "fields": ["summary", "description", "reporter", "status", "assignee", "key"]
  };

  const options = {
    "method": "post",
    "headers": {
      "Authorization": "Basic " + authString,
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

  const response = UrlFetchApp.fetch(url, options);
  const code = response.getResponseCode();
  const content = response.getContentText();

  if (code === 200) {
    const data = JSON.parse(content);
    Logger.log("Success! Found " + data.issues.length + " issues.");

    const logSheet = SpreadsheetApp.openById(LOGS_SPREADSHEET_ID).getSheetByName('Logs');
    const logRows = logSheet.getDataRange().getValues();

    if (data.issues && data.issues.length > 0) {
      data.issues.forEach(issue => {
        const jiraKey = issue.key;
        try {
          const existingRow = logRows.find(row => row[0] === jiraKey)
          const rowIndex = logRows.findIndex(row => row[0] === jiraKey);

          let {
            name,
            date,
            computer,
            location,
            manager,
            position,
            assignee
          } = extractProperties(issue);

          let taskId = "";

          if (!existingRow) {

            taskId = createAsanaTask(name, date, computer, location, manager, position, assignee, jiraKey);

            logSheet.appendRow([jiraKey, "'" + taskId, date]);

            Logger.log("Appended Log Sheet")

          } else {
            taskId = existingRow[1].toString().trim();
            let previousDate = Utilities.formatDate(existingRow[2], Session.getScriptTimeZone(), "yyyy-MM-dd").toString();

            let dateChanged = checkForChanges(taskId, previousDate, date, manager, assignee);

            if (dateChanged) {
              const sheetRow = rowIndex + 1;
              logSheet.getRange(sheetRow, 3).setValue(date);
              let sectionId = getSectionId(date);
              addTaskToSection(taskId, sectionId);
            }
          }
        } catch (err) {
          Logger.log(`CRITICAL ERROR for ${jiraKey}: ${err.message}`);
        }
      })
    }
  } else {
    Logger.log("Error Code: " + code);
    Logger.log("Error Message: " + content);
  }
}