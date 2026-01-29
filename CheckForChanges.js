function checkForChanges(taskId, previousDate, date, manager, assignee) {

  const task = getAsanaTask(taskId);
  let dateChanged = false;

  if (task) {

    const updatePayload = {};
    const customFields = {};
    let hasChanges = false;

    // 1. Check Date
    if (date !== previousDate) {
      updatePayload.due_on = date;
      hasChanges = true;
      dateChanged = true;
    }

    // 2. Check Manager
    const managerField = task.custom_fields.find(f => f.gid === "1212674241283034");
    if (manager && (!managerField || managerField.text_value !== manager)) {
      customFields["1212674241283034"] = manager;
      hasChanges = true;
    }

    // 3. Assignee
    if(task.assignee){
      const assigneeField = task.assignee.gid;
      if (assignee && assigneeField !== assignee) {
        updatePayload.assignee = assignee;
        hasChanges = true;
      } else if (!assignee){
        updatePayload.assignee = null;
        hasChanges = true;
      }
    } else{
      if (assignee) {
        updatePayload.assignee = assignee;
        hasChanges = true;
      }
    }

    if (hasChanges) {
      if (Object.keys(customFields).length > 0) {
        updatePayload.custom_fields = customFields;
      }

      Logger.log("Changes detected. Updating Asana...");
      updateAsanaTask(task.gid, updatePayload);
    } else {
      Logger.log("Everything matches. No update needed.");
    }
  }

  return dateChanged;
}