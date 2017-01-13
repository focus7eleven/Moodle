import {fromJS,List,Map} from 'immutable'

export function getTreeFromList(list){
    let newList_1 = list.groupBy(v => v.get('pId')).filter(v => v.get('pId')!='-1')
    console.log("-->:",newList_1.toJS())
    let newList = newList_1.map((v,k) => {
      let parent = list.find(v => v.get('id')==k)
      return parent?parent.set('children',v):Map({pId:0,children:v})
    }).toList()
    console.log("haha:",newList.toJS())
    debugger
    if(newList.size == 1){
      return newList
    }else{
      return getTreeFromList(newList)
    }

}
