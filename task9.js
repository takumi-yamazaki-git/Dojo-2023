(() => {
  'use strict';

  const saveLs = [
    'app.record.create.submit',
    'app.record.edit.submit'
  ]

  kintone.events.on(saveLs, async (saveEvent) => {
    const chValue = saveEvent.record.重複禁止項目.value;
    const appID = await kintone.app.getId();
    const param = {app: appID,fields: ['重複禁止項目'], query: '重複禁止項目 = "' + chValue + '"'};
    const getValues = await kintone.api(kintone.api.url('/k/v1/records.json'), 'GET', param);
    if (getValues.records.length !== 0) {
      if (window.confirm('レコードが重複しています。このまま保存しますか？') === false) {
        saveEvent = false;
        return saveEvent;
      }
    }
  });
})();