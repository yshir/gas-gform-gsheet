Form = {}

Form.create = ({ name, description }) => {
  const form = FormApp.create(name)
  const formId = form.getId()
  const formFile = DriveApp.getFileById(formId)
  DriveApp.getFolderById(Config.folder_id).addFile(formFile)
  DriveApp.getRootFolder().removeFile(formFile)

  if (description) {
    form.setDescription(description)
  }

  return form
}
