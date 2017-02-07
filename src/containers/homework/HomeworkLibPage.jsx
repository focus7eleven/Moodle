/**
 * Created by wuyq on 2017/1/19.
 */
import React from 'react';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux'
import {Select, Button} from 'antd';
import {fromJS, List} from 'immutable';

import {CustomTable} from '../../components/table/CustomTable';
import config from '../../config';
import permissionDic from '../../utils/permissionDic';
import {ROLE_TEACHER} from '../../constant';
import xhlStyles from '../../styles/xhl-style.scss';
//import {findMenuInTree} from '../../reducer/menu';

const Option = Select.Option;

const HomeworkLibPage = React.createClass({
  _gradeOptionList: List(),
  _termOptionList: List(),
  _subjectOptionList: List(),
  _versionOptionList: List(),

  getInitialState(){
    return {
      type: "",
      pageUrl: "",
      searchFilter: {
        search: "",
        gradeId: "",
        term: "",
        subjectId: "",
        version: "",
      }
    }
  },
  getDefaultProps() {
    return {};
  },
  componentWillMount(){
    this.setState({
      type: this.props.params.type,
      pageUrl: this.getSearchUrl(this.props.params.type)
    });
    //if(!this.props.menu.get('data').isEmpty()){
    //    this._currentMenu = findMenuInTree(this.props.menu.get('data'),this.state.type);
    //}
  },
  componentWillUpdate(nextProps, nextState){
    if (this.props.params.type != nextProps.params.type) {
      nextState.type = nextProps.params.type;
      nextState.pageUrl = this.getSearchUrl(nextProps.params.type);
      //this.handleTableSearch();
    }
  },
  render() {
    const columns = this.getTableHeader();
    const filters = [
      {}
    ];

    return (
      <div> {/* 过滤+表格+分页 */}
        <CustomTable columns={columns} showIndex={true} pageUrl={this.state.pageUrl}
                     additionalParams={this.state.searchFilter} filters={filters}></CustomTable>
      </div>
    );
  },
  getTableHeader() {
    let tableHeader = fromJS([
      {
        title: '作业名称', dataIndex: 'homework_name', key: 'homework_name',
        render: (text, record) => {
          return <a onClick={() => console.log(record.homework_name)}>{text}</a>
        }
      },
      {title: '创建时间', dataIndex: 'create_dt', key: 'create_dt'},
      {title: '发布人', dataIndex: 'create_user_name', key: 'create_user_name'},
      {title: '学科', dataIndex: 'subject', key: 'subject'},
      {title: '年级', dataIndex: 'gradeName', key: 'gradeName'},
      {title: '学期', dataIndex: 'term', key: 'term'},
      {title: '版本', dataIndex: 'textbook_version', key: 'textbook_version'}
    ]);
    if (this.props.userInfo && this.props.userInfo.get('userStyle') == ROLE_TEACHER) {
      //是老师时，显示布置作业按钮
      tableHeader = tableHeader.concat(
        [{
          title: permissionDic['edit'],
          dataIndex: 'edit',
          key: 'edit',
          render: (text, record) => {
            return (
              <div>
                <Button type="primary">布置作业</Button>
              </div>
            )
          }
        }]
      )
    }
    return tableHeader.toJS();
  },
  getSearchUrl(type) {
    let url = "";
    switch (type) {
      case 'homework_area':
        url = config.api.homework.areaHomeworkPageUrl;
        break;
      case 'homework_school':
        url = config.api.homework.schoolHomeworkPageUrl;
        break;
      case 'homework_self':
      default:
        url = config.api.homework.selfHomeworkPageUrl;
        break;
    }
    return url;
  }
});

function mapStateToProps(state) {
  return {
    menu: state.get('menu'),
    userInfo: state.get('user').get('userInfo')
    //workspace:state.get('workspace'),
  }
}
function mapDispatchToProps(dispatch) {
  return {
    //getWorkspaceData:bindActionCreators(getWorkspaceData2,dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeworkLibPage)