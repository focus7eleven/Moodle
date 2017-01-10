import React from 'react'
// import 'script-loader!../../utils/ueditor.all.js'
// import 'script-loader!../../utils/u'
const UeditorContainer = React.createClass({
  componentDidMount(){
    var ue = UE.getEditor('editor',{
      toolbars: [[
          'fullscreen', 'source', '|',
          'bold', 'italic', 'underline', '|', 'fontsize', '|', 'kityformula', 'preview'
      ]]
    });
  },
  isFocus(e){
        alert(UE.getEditor('editor').isFocus());
        UE.dom.domUtils.preventDefault(e)
    },
  setblur(e){
      UE.getEditor('editor').blur();
      UE.dom.domUtils.preventDefault(e)
  },
  render(){
    return (
      <div style={{width:'100%'}}>
        <div>
          <h1>完整demo</h1>
          <script id="editor" type="text/plain" style={{width:'1024px',height:'500px'}}></script>
        </div>
      </div>
    )
  }
})

export default UeditorContainer
