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
    'app.record.edit.change.管理番号'
  ]

  const saveLs = [
    'app.record.create.submit',
    'app.record.edit.submit'
  ]

  const imputfeakd = (eve, day, pro, id) => {
    eve.record.重複禁止項目.value = `${day}-${pro}-${id}`;
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

  const checkrepeat = (regist,chlist) => {
    let repeatnum = 0;
    chlist.forEach((lsindex) => {
      console.log(lsindex);
      if (regist === lsindex){
        repeatnum = repeatnum+1;
      }
    });
    return repeatnum;
  }

  kintone.events.on(eventLs, async(event) => {
    const imputDay = dateFns.format(event.record.日付.value, 'YYYYMMD'); //DD にすると 01 などと表示され値に合わない
    const imputPro = proName(event.record.サイボウズ製品.value);
    const imputId = Number(event.record.管理番号.value);
    await kintone.app.record.setFieldShown('重複禁止項目', false);
    imputfeakd(event, imputDay, imputPro, imputId);
    return event;
  });

  kintone.events.on(saveLs, async (saveevent) => {
    const saveParam = {app: 32,fields: ['重複禁止項目']};
    const getValues = await kintone.api(kintone.api.url('/k/v1/records.json'), 'GET', saveParam);
    const getList = [];
    for (let i = 0; i < getValues.records.length; i++) {
      getList[i] = await getValues.records[i].重複禁止項目.value;
    }
    if (checkrepeat(saveevent.record.重複禁止項目.value,getList) !== 0) {
      if (window.confirm(`${checkrepeat(saveevent.record.重複禁止項目.value,getList)}件のレコードと重複しています。\nこのまま保存しますか？`) === false) {
//      if (window.confirm('レコードが重複しています。このまま保存しますか？') === false) {
        saveevent = false;
        return saveevent;
      }  
    }
  });
})();