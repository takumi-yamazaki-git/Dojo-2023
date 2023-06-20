(() => {
  'use strict';

  const defaultList = ['あくなき探求','不屈の身体','理想への共感','心を動かす','知識を増やす','公明正大']
//  kintone.events.on('app.record.edit.show', (event) => {
//    console.log(event.record.Table.value[0]);
//    console.log(event.record.Table.value[0].id);
//    console.log(event.record.Table.value[1]);
//    console.log(event.record.Table.value[1].id);
//    console.log(event.record.Table.value);
//  });

  kintone.events.on('app.record.create.show', (event) => {
//    console.log(event.record.Table.value);

    //  for(let j=0; j<defaultList.length-1; j++) {
    //    event.record.Table.value.push(event.record.Table.value[0+j]);
    //    event.record.Table.value[j].id = 100+j ;
    //  }

    for(let i=0; i<defaultList.length; i++) {
//      event.record.Table.value.push(newObjcopy) ;
//      event.record.Table.value.push(value.Action5: {type: 'DROP_DOWN' , value: defaultList[i]});
      if (i === 0) {
        console.log('if文が実行されました');
        event.record.Table.value[i].value.Action5.value = defaultList[i];
        event.record.Table.value[i].id = 500;
      } else {
        console.log('else文が実行されました');
        const newObjcopy = event.record.Table.value[0]
        newObjcopy.id += i;
        newObjcopy.value.Action5.value = defaultList[i];
        event.record.Table.value.push(newObjcopy);
      }
      console.log(`処理結果`);
      console.log(event.record.Table.value[0]);
      console.log(event.record.Table.value[0].value.Action5.value);
//      console.log(newObjcopy);

    }
//    event.record.Table.value.push(valueObj.Action5 = {type: 'DROP_DOWN' , value: '不屈の身体'})
    console.log('処理完了');
    console.log(event);
    return event;
  });
})();

//はっしーヒント
//const newObj = {...newRow, ...event.record.Table.value[0]};
//event.record.Table.value.push(newRow)