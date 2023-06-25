(() => {
  'use strict';

  const defaultList = ['あくなき探求', '不屈の心体', '理想への共感', '心を動かす', '知識を増やす', '公明正大'];
  (() => {
    kintone.events.on('app.record.create.show', (event) => {
      for (let i = 0; i < defaultList.length; i++) {
        if (i === 0) {
          event.record.Table.value[i].value.Action5.value = defaultList[i];
          event.record.Table.value[i].id = 120;
        } else {
          const newObjcopy = Object.assign({}, JSON.parse(JSON.stringify(event.record.Table.value[0])));
          newObjcopy.value.Action5.value = defaultList[i];
          newObjcopy.id = 120 + i;
          newObjcopy.value.課題.value = '';
          event.record.Table.value.push(newObjcopy);
        }
      }
      return event;
    });
  })();
})();