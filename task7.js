(() => {
  'use strict';

  let imputDay = '';
  let imputPro = '';
  let imputId = '';

  const imputfeakd = (eve, day, pro, id) => {
    eve.record.重複禁止項目_文字列.value = `${day}-${pro}-${id}`;
  }

  kintone.events.on('app.record.create.show', (event) => {
    event.record.重複禁止項目_文字列.disabled = true;
    imputDay = dateFns.format(event.record.日付.value, 'YYYYMMDD');
    imputfeakd(event, imputDay, imputPro, imputId);
    return event;
  });

  kintone.events.on('app.record.create.change.日付', (event) => {
    imputDay = dateFns.format(event.record.日付.value, 'YYYYMMDD');
    imputfeakd(event, imputDay, imputPro, imputId);
    return event;
  });

  kintone.events.on('app.record.create.change.サイボウズ製品', (event) => {
    switch (event.record.サイボウズ製品.value) {
      case 'kintone' :
        imputPro = 'KN';
        break;
      case 'Garoon' :
        imputPro = 'GR';
        break;
      case 'サイボウズ Office' :
        imputPro = 'OF';
        break;
      case 'Mailwise' :
        imputPro = 'MW';
        break;              
    }
    imputfeakd(event, imputDay, imputPro, imputId);
    return event;
  });

  kintone.events.on('app.record.create.change.管理番号', (event) => {
    imputId = event.record.管理番号.value;
    imputfeakd(event, imputDay, imputPro, imputId);
    return event;
  });
})();

// date-fnsを有効にするため、kintoneに以下のURLを登録しておく
// https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.28.5/date_fns.min.js