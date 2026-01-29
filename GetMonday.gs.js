function getMondaySectionName(dateString) {
  const parts = dateString.split('-');
  let d = new Date(parts[0], parts[1] - 1, parts[2]);

  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); 
  const monday = new Date(d.setDate(diff));

  return Utilities.formatDate(monday, Session.getScriptTimeZone(), "d/M/yyyy");
}
