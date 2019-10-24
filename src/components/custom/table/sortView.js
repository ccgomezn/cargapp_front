import React, { Component } from 'react';
import TableWrapper from './sortView.style';

export default class extends Component {



  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      dataList: this.props.dataList
    };
  }

  getSortAsc(sortKey, dataList) {
    return dataList.sort(function (a, b) {
      var x = a[sortKey]; var y = b[sortKey];
      return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
  }
  getSortDesc(sortKey, dataList) {
    return dataList.sort(function (a, b) {
      var x = a[sortKey]; var y = b[sortKey];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }



  onChange(pagination, filters, sorter) {
    const { dataList } = this.props;
    var newDataList =[]
    if (sorter && sorter.columnKey && sorter.order) {
      if (sorter.order === 'ascend') {
        newDataList = this.getSortAsc(sorter.columnKey, dataList);
      } else {
        newDataList = this.getSortDesc(sorter.columnKey, dataList);
      }
      console.log(newDataList);
      this.setState({ dataList: newDataList });
    }
  }
  render() {
    return (
      <TableWrapper
        columns={this.props.tableInfo.columns}
        onChange={this.onChange}
        dataSource={this.state.dataList}
        className="isoSortingTable"
      />
    );
  }
}
