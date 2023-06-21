(() => {
  'use strict';

  const defaultList = ['あくなき探求', '不屈の心体', '理想への共感', '心を動かす', '知識を増やす', '公明正大'];
  kintone.events.on('app.record.create.show', (event) => {
    for (let i = 0; i < defaultList.length; i++) {
      if (i === 0) {
        console.log('if文が実行されました');
        event.record.Table.value[i].value.Action5.value = defaultList[i];
        event.record.Table.value[i].id = 120;
        console.log(event.record.Table.value[i].value.Action5.value);
      } else {
        console.log('else文が実行されました');
        const newObjcopy = Object.assign({}, JSON.parse(JSON.stringify(event.record.Table.value[0])));
        newObjcopy.value.Action5.value = defaultList[i];
        newObjcopy.id = 120 + i;
        // value = ""がなぜか存在しないので、自力で追加する
        newObjcopy.value.課題.value = '';
        event.record.Table.value.push(newObjcopy);
      }
      console.log(`処理結果`);
      console.log(event.record.Table.value[i].value.Action5.value);
      console.log(event.record.Table.value[i].id);
    }
    return event;
  });
})();

// 参考
// オブジェクトのコピーについて
// https://web-engineer-wiki.com/javascript/object-copy-deep/