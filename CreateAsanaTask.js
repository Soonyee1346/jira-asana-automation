function createAsanaTask(name, date, computer, location, manager, position, assignee, jiraKey) {
  const url = "https://app.asana.com/api/1.0/tasks";

  Logger.log(`Values: ${name}, ${date}, ${computer}, ${location}, ${manager}, ${position}, ${assignee}, ${jiraKey}`);
  
  const payload = {
    data: {
      projects: [ASANA_PROJECT_ID],
      name: name,
      resource_subtype: 'default_task',
      due_on: date,
      completed: false,
      assignee: assignee,
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

  const responseObj = JSON.parse(res.getContentText());
  const taskId= responseObj.data.gid;

  updateAsanaCustomField(taskId, computer, CUSTOM_FIELD_MAP['computerField'], location, CUSTOM_FIELD_MAP['locationField'], manager, CUSTOM_FIELD_MAP['managerField'], position, CUSTOM_FIELD_MAP['positionField'], jiraKey, CUSTOM_FIELD_MAP['jiraField']);

  let sectionId = getSectionId(date);

  addTaskToSection(taskId, sectionId);

  return taskId;
}

function getSectionId(date){
  const startMonday = getMondaySectionName(date);

  const targetName = startMonday.toString();

  const sections = getAsanaSections();

  const targetSection = sections.find(section => section.name === targetName);

  console.log("Target Section: " + targetSection);

  let sectionId = "";

  if (targetSection) {
    sectionId = targetSection.gid;
    Logger.log("Found GID: " + sectionId);
  } else {
    Logger.log("Section not found.");
  }

  return sectionId;
}

function updateAsanaCustomField(taskId, computer, computerField, location, locationField, manager, managerField, position, positionField, jiraKey, jiraField){

  const url = `https://app.asana.com/api/1.0/tasks/${taskId}`;
  const jiraUrl = `https://xero.atlassian.net/browse/${jiraKey}`

  const payload = {
    "data": {
      "custom_fields": {
        [computerField] : computer,
        [locationField] : location,
        [managerField] : manager,
        [positionField] : position,
        [jiraField] : jiraUrl
      }
    }
  };

  const options = {
    "method": "put",
    "headers": { 
      "Authorization": "Bearer " + ASANA_API_TOKEN,
      "Accept": "application/json"
    },
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

  const res = UrlFetchApp.fetch(url, options);
  Logger.log("Custom Field Updated: " + res.getContentText());
}