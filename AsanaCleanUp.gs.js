function cleanupSection() {

  const today = new Date();
  const diff = today.getDate() - 1;
  const mondayDate = new Date(today.setDate(diff));
  
  const targetDateString = Utilities.formatDate(mondayDate, Session.getScriptTimeZone(), "d/M/yyyy");
  Logger.log("Searching for section matching: " + targetDateString);

  const url = `https://app.asana.com/api/1.0/projects/${ASANA_PROJECT_ID}/sections`;
  const options = {
    "method": "get",
    "headers": { "Authorization": "Bearer " + ASANA_API_TOKEN }
  };

  const response = UrlFetchApp.fetch(url, options);
  const sections = JSON.parse(response.getContentText()).data;

  sections.forEach(section => {
    if (section.name.includes(targetDateString)) {
      Logger.log("Found matching section: " + section.name + " (GID: " + section.gid + ")");
      deleteAsanaSection(section.gid);
    }
  });
}

function deleteAsanaSection(sectionGid) {
  const url = `https://app.asana.com/api/1.0/sections/${sectionGid}`;
  const options = {
    "method": "delete",
    "headers": { "Authorization": "Bearer " + ASANA_API_TOKEN },
    "muteHttpExceptions": true
  };

  const res = UrlFetchApp.fetch(url, options);
  if (res.getResponseCode() === 200) {
    Logger.log("Successfully deleted section.");
  } else {
    Logger.log("Failed to delete section: " + res.getContentText());
  }
}
