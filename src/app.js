_ = Underscore.load()

const app = () => {
  const name = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName()
  if (name === 'base') {
    Browser.msgBox('It is not allowd to create form by this sheet')
    return
  }

  const data = Sheet.getValues({ name })
  const form = Form.create({ name })

  form
    .addMultipleChoiceItem()
    .setTitle('性別')
    .setChoiceValues(['男性', '女性', 'その他', '回答しない'])
    .setRequired(true)

  form
    .addMultipleChoiceItem()
    .setTitle('年齢')
    .setChoiceValues(['〜10代', '20代', '30代', '40代〜', '回答しない'])
    .setRequired(true)

  data.forEach(item => {
    form
      .addScaleItem()
      .setTitle(item.question)
      .setBounds(1, 7)
      .setLabels('まったくそう思わない', 'とてもそう思う')
      .setRequired(true)
  })

  Browser.msgBox('Created new google form successfully 🎉')
}

function onOpen() {
  SpreadsheetApp.getActiveSpreadsheet().addMenu('Create new form', [{ name: 'Run', functionName: 'app' }])
}
