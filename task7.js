(() => {
  'use strict';

  const eventLs = [
    'app.record.create.show',
    'app.record.create.change.日付',
    'app.record.create.change.サイボウズ製品',
    'app.record.create.change.管理番号',
    'app.record.edit.show',
    'app.record.edit.change.日付',
    'app.record.edit.change.サイボウズ製品',
    'app.record.edit.change.管理番号',
  ]

  const imputfeakd = (eve, day, pro, id) => {
    eve.record.重複禁止項目_文字列.value = `${day}-${pro}-${id}`;
  };

  const proName = (name) => {
    switch (name) {
      case 'kintone':
        return 'KN';
      case 'Garoon':
        return 'GR';
      case 'サイボウズ Office':
        return 'OF';
      case 'Mailwise':
        return 'MW';
    }
  }
    kintone.events.on(eventLs, (event) => {
    event.record.重複禁止項目_文字列.disabled = true;
    const imputDay = dateFns.format(event.record.日付.value, 'YYYYMMDD');
    const imputPro = proName(event.record.サイボウズ製品.value);
    const imputId = event.record.管理番号.value;
    imputfeakd(event, imputDay, imputPro, imputId);
    return event;
  });
})();