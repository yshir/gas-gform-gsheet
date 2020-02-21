Sheet = {}

Sheet.getValues = ({ id, name }) => {
  id = id || SpreadsheetApp.getActiveSpreadsheet().getId()

  const sheet = SpreadsheetApp.openById(id).getSheetByName(name)
  const sheetCols = Array.prototype.concat.apply([], sheet.getSheetValues(1, 1, 1, sheet.getLastColumn())).filter(String)

  const sheetLastRow = sheet.getLastRow()
  if (!sheetLastRow || sheetLastRow <= 1) {
    return []
  }

  const sheetValues = sheet.getSheetValues(2, 1, sheetLastRow - 1, sheet.getLastColumn()).filter(String)

  return sheetValues.map((sheetValue) => {
    return sheetCols.reduce((acc, __, index) => {
      acc[sheetCols[index]] = sheetValue[index]
      return acc
    }, {})
  })
}
