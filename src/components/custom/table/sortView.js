import React, {Component} from 'react';
import TableWrapper from './sortView.style';
import {Input, Button, Icon} from 'antd';
import Highlighter from 'react-highlight-words';

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
            var x = a[sortKey];
            var y = b[sortKey];
            return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        });
    }

    getSortDesc(sortKey, dataList) {
        return dataList.sort(function (a, b) {
            var x = a[sortKey];
            var y = b[sortKey];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }


    onChange(pagination, filters, sorter) {
        const {dataList} = this.props;
        var newDataList = []
        if (sorter && sorter.columnKey && sorter.order) {
            if (sorter.order === 'ascend') {
                newDataList = this.getSortAsc(sorter.columnKey, dataList);
            } else {
                newDataList = this.getSortDesc(sorter.columnKey, dataList);
            }
            console.log(newDataList);
            this.setState({dataList: newDataList});
        }
    }


    state = {
        searchText: '',
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Busque ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Buscar
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                    Borrar
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) => record[dataIndex]?
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()) : record[dataIndex],
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            typeof text === 'object' ?
                text :
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({searchText: selectedKeys[0]});
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''});
    };

    componentDidMount() {
        let columns = this.props.tableInfo.columns;
        let real_columns = [];
        columns.forEach((column) => {
          if(column.sorter){
            real_columns.push({...column, dataIndex: column.key, ...this.getColumnSearchProps(column.key)});

          }else{
            real_columns.push({...column});
          }
        });


        this.setState({
            columns: real_columns
        });
        console.log(real_columns);
    }


    render() {
        return (
            <div>
                {this.state.columns && <TableWrapper
                    columns={this.state.columns}
                    onChange={this.onChange}
                    dataSource={this.state.dataList}
                    className="isoSortingTable"
                />}
            </div>

        );
    }
}
