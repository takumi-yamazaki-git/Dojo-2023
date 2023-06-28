(() => {
  'use strict';

  kintone.events.on('app.record.create.show', async (event) => {
    const appParam = {app: '33', lang: 'ja'};
    const feLog = await kintone.api(kintone.api.url('/k/v1/app/form/fields.json'), 'GET', appParam);
    const opList = feLog.properties.Table.fields.Action5.options;
    const lsSize = Object.keys(opList).length;
    const sortList = [];
    sortList[Number(lsSize) - 1] = '';
    Object.keys(opList).forEach((i) => {
      sortList[opList[i].index] = i;
    });
    for (let j = 0; j < sortList.length; j++) {
      if (j === 0) {
        event.record.Table.value[j].value.Action5.value = sortList[j];
        event.record.Table.value[j].id = 120;
      } else {
        const newObjcopy = Object.assign({}, JSON.parse(JSON.stringify(event.record.Table.value[0])));
        newObjcopy.value.Action5.value = sortList[j];
        newObjcopy.id = 120 + j;
        newObjcopy.value.課題.value = '';
        event.record.Table.value.push(newObjcopy);
      }
    }
    return event;
  });
})();