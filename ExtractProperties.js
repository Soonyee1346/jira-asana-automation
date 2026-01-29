function extractProperties(issue) {

  Logger.log(issue.fields.summary);

  const body = flattenADF(issue.fields.description);

  const cleanDoubleText = (text) => {
    if (!text) return "Not found";
    let parts = text.split(",").map(p => p.trim());
    // If the first part matches the second part, just take the first
    if (parts.length >= 2 && parts[0] === parts[1]) {
      return parts[0];
    }
    return text.trim();
  };

  let computerMatch = "";
  let managerMatch = "";
  let manager = "";

  if(issue.fields.summary.includes("STARTER CW")){
    computerMatch = body.match(/Device Selection:\s*(.*)/i);
    manager = issue.fields.reporter.displayName;
  } else {
    computerMatch = body.match(/Laptop Preference:\s*([^:\n\r]*)/i);
    managerMatch = body.match(/People Leader:\s*(.*)/i);
    manager = cleanDoubleText(managerMatch ? managerMatch[1] : "")
  }

  // Gathers unformatted properties
  const nameMatch = body.match(/Preferred Name:\s*(.*)/i);
  const dateMatch = body.match(/Hire Date:\s*(.*)/i);
  const locationMatch = body.match(/Location:\s*(.*)/i);
  const positionMatch = body.match(/Business Title:\s*(.*)/i);

  // Format properties
  const name = cleanDoubleText(nameMatch ? nameMatch[1] : "");
  const date = cleanDoubleText(dateMatch ? dateMatch[1] : "");
  let computer = cleanDoubleText(computerMatch ? computerMatch[1] : "");

  if(computer.includes("Delivery")) computer = "";
  let location = cleanDoubleText(locationMatch ? locationMatch[1] : "");
  const position = cleanDoubleText(positionMatch ? positionMatch[1] : "");

  if(computer == 'Mac' || computer == 'Windows'){
    computer = specifyComputer(computer, position);
  }

  computer = COMPUTER_NAME_MAP[computer];
  location = LOCATION_NAME_MAP[location];

  assignee = issue.fields.assignee ? issue.fields.assignee.displayName : null;

  assignee = USER_GID_MAP[assignee];

  return {name, date, computer, location, manager, position, assignee};

}

function flattenADF(node) {
  if (!node) return "";
  if (node.type === "text") return node.text;
  if (node.content && Array.isArray(node.content)) {
    return node.content.map(flattenADF).join("");
  }
  // Add new lines for paragraphs or list items to keep formatting for Regex
  if (node.type === "paragraph" || node.type === "listItem") {
    return (node.content ? node.content.map(flattenADF).join("") : "") + "\n";
  }
  return "";
}

function specifyComputer(computer, position){
  const keywords = ['Designer', 'Engineer', 'Scientist', 'Architect'];

  if(keywords.some(word => position.includes(word))){
    if(computer == 'Mac'){
      computer = 'Physical Device - Macbook (Performance)';
    } else if (computer == 'Windows'){
      computer = 'Physical Device - Windows (Performance)'
    }
  } else {
    if(computer == 'Mac'){
      computer = 'Physical Device - Macbook (Standard)';
    } else if (computer == 'Windows'){
      computer = 'Physical Device - Windows (Standard)'
    }
  }

  return computer;
}
