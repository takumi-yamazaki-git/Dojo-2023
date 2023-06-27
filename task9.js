(() => {
  'use strict';

  const eventLs = [
    'app.record.create.show',
    'app.record.edit.show',
  ]

  const saveLs = [
    'app.record.create.submit',
    'app.record.edit.submit'
  ]

  kintone.events.on(eventLs, async(event) => {
    await kintone.app.record.setFieldShown('重複禁止項目', false);
    return event;
  });

  kintone.events.on(saveLs, async (saveevent) => {
    const chValue = saveevent.record.重複禁止項目.value;
    const param = {app: 32,fields: ['重複禁止項目'], query: '重複禁止項目 = "' + chValue + '"'};
    const getValuesquery = await kintone.api(kintone.api.url('/k/v1/records.json'), 'GET', param);
    if (getValuesquery.records.length !== 0) {
      if (window.confirm('レコードが重複しています。このまま保存しますか？') === false) {
        saveevent = false;
        return saveevent;
      }
    }
  });
})();