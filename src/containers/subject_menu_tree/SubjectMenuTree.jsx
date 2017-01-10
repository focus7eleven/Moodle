import React from 'react'
import {fromJS,List} from 'immutable'
const dataMock = fromJS([{
  id:'1',
  children:[{
    id:'1-1',
    children:[{
      id:'1-1-1',
      children:[]
    },{
      id:'1-1-2',
      children:[]
    }]
  },{
    id:'1-2',
    children:[{
      id:'1-2-1',
      children:[]
    },{
      id:'1-2-2',
      children:[]
    }]
  }]
},{
  id:'2',
  children:[{
    id:'2-1',
    children:[{
      id:'2-1-1',
      children:[]
    },{
      id:'2-1-2',
      children:[]
    }]
  },{
    id:'2-2',
    children:[{
      id:'2-2-1',
      children:[]
    },{
      id:'2-2-2',
      children:[]
    }]
  }]
}])

const SubjectMenuTree = React.createClass({
  getInitialState(){
    return {
      openedList:List(['2','1','2-2'])
    }
  },
  calculatePos(tree){
    const INITX=0,INITY=0,DELTAX=20,DELTAY=20
    const that = this
    let result = List()
    const walk = (tree,INITX,INITY)=>{
      tree.forEach((v,key) => {
        const opened = this.state.openedList.some(item => item == v.get('title'))
        let x = INITX
        let y = INITY + result.size * DELTAY
        let style = {
          x:x,
          y:y,
        }
        result = result.push({
          ...style,
          data:v.get('title'),
          opened:opened,
        })
        if(opened){
          walk(v.get('children'),INITX+DELTAX,INITY+result.size*DELTAY)
        }
      })
    }
    walk(tree,INITX,INITY,result)
    return result
  },
  render(){
    // let result
    let styleList = this.calculatePos(dataMock)
    return (
      <div>
      </div>
    )
  }
})

export default SubjectMenuTree
