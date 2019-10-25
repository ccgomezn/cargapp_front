import React, {Component} from "react";
import {connect} from "react-redux";
import clone from "clone";
import {Link} from "react-router-dom";
import {Layout} from "antd";
import {optionsAdmin, optionsGenerator, optionsVehicle, optionsConveyor} from "./options";
import Scrollbars from "../../components/utility/customScrollBar.js";
import Menu from "../../components/uielements/menu";
import IntlMessages from "../../components/utility/intlMessages";
import SidebarWrapper from "./sidebar.style";
import appActions from "../../redux/app/actions";
import Logo from "../../components/utility/logo";
import {findParameters} from "../../helpers/api/adminCalls";

const SubMenu = Menu.SubMenu;
const {Sider} = Layout;

const {
    toggleOpenDrawer,
    changeOpenKeys,
    changeCurrent,
    toggleCollapsed
} = appActions;
const stripTrailingSlash = str => {
    if (str.substr(-1) === "/") {
        return str.substr(0, str.length - 1);
    }
    return str;
};

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.onOpenChange = this.onOpenChange.bind(this);
        this.state = {
            subAdminOptions:  null
        };
    }


    componentDidMount() {
        findParameters('SUB_ADMIN').then((response) => {
            let parameters = [];
            response.data.parameters.forEach(parameter => {
                parameters.push(parameter.name);
            });

            let subAdminOptions = [];
            optionsAdmin.forEach(option => {
                if (option.key === '') {
                    subAdminOptions.push(option);
                } else if (option.children) {
                    let subChildren = [];
                    option.children.forEach(subOption => {
                        if (parameters.includes(subOption.key)) {
                            subChildren.push(subOption);
                        }
                    });
                    if (subChildren.length > 0) {
                        let copyOption = {};
                        copyOption = Object.assign(copyOption, option);
                        copyOption.children = subChildren;
                        subAdminOptions.push(copyOption);
                    }

                } else {
                    if (parameters.includes(option.key)) {
                        subAdminOptions.push(option);
                    }
                }
            });

            this.setState({subAdminOptions: subAdminOptions})
        });
    }

    handleClick(e) {
        this.props.changeCurrent([e.key]);
        if (this.props.app.view === "MobileView") {
            setTimeout(() => {


                this.props.toggleOpenDrawer();
            }, 100);
        }
    }

    onOpenChange(newOpenKeys) {
        const {app, changeOpenKeys} = this.props;
        const latestOpenKey = newOpenKeys.find(
            key => !(app.openKeys.indexOf(key) > -1)
        );
        const latestCloseKey = app.openKeys.find(
            key => !(newOpenKeys.indexOf(key) > -1)
        );
        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        changeOpenKeys(nextOpenKeys);
    }

    getAncestorKeys = key => {
        const map = {
            sub3: ["sub2"]
        };
        return map[key] || [];
    };
    getMenuItem = ({singleOption, submenuStyle, submenuColor}) => {
        const {key, label, leftIcon, children} = singleOption;
        const url = stripTrailingSlash(this.props.url);
        if (children) {
            return (
                <SubMenu
                    key={key}
                    title={
                        <span className="isoMenuHolder" style={submenuColor}>
              <i className={leftIcon}/>
              <span className="nav-text">
                <IntlMessages id={label}/>
              </span>
            </span>
                    }
                >
                    {children.map(child => {
                        const linkTo = child.withoutDashboard
                            ? `/${child.key}`
                            : `${url}/${child.key}`;
                        return (
                            <Menu.Item style={submenuStyle} key={child.key}>
                                <Link style={submenuColor} to={linkTo}>
                                    <IntlMessages id={child.label}/>
                                </Link>
                            </Menu.Item>
                        );
                    })}
                </SubMenu>
            );
        }
        return (
            <Menu.Item key={key}>
                <Link to={`${url}/${key}`}>
          <span className="isoMenuHolder" style={submenuColor}>
            <i className={leftIcon} style={{zoom: 1.3}}/>
            <span className="nav-text">
              <IntlMessages id={label}/>
            </span>
          </span>
                </Link>
            </Menu.Item>
        );
    };

    render() {
        const {toggleCollapsed} = this.props;

        const {app, customizedTheme, height, admin, isVehicleManager, isGenerator, isConveyor, isSubAdmin} = this.props;
        const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
        const mode = collapsed === true ? "vertical" : "inline";

        const styling = {
            backgroundColor: "white"
        };
        const submenuStyle = {
            backgroundColor: customizedTheme.textColor,
            color: customizedTheme.textColor
        };
        const submenuColor = {
            color: "rgb(178, 186, 200)"
        };
        return (
            <SidebarWrapper className="RealSide">
                <Sider
                    trigger={null}
                    collapsible={true}
                    collapsed={collapsed}
                    width={260}
                    className="isomorphicSidebar"
                    style={styling}
                >
                    <Logo collapsed={toggleCollapsed}/>
                    <Scrollbars style={{height: height - 70}}>
                        <Menu
                            onClick={this.handleClick}
                            theme="dark"
                            className="isoDashboardMenu"
                            mode={mode}
                            openKeys={collapsed ? [] : app.openKeys}
                            selectedKeys={app.current}
                            onOpenChange={this.onOpenChange}
                        >
                            {admin &&
                            optionsAdmin.map(singleOption =>
                                this.getMenuItem({submenuStyle, submenuColor, singleOption})
                            )}
                            {isGenerator &&
                            optionsGenerator.map(singleOption =>
                                this.getMenuItem({submenuStyle, submenuColor, singleOption})
                            )}
                            {isVehicleManager &&
                            optionsVehicle.map(singleOption =>
                                this.getMenuItem({submenuStyle, submenuColor, singleOption})
                            )}
                            {isConveyor &&
                            optionsConveyor.map(singleOption =>
                                this.getMenuItem({submenuStyle, submenuColor, singleOption})
                            )}
                            {isSubAdmin && this.state.subAdminOptions &&
                            this.state.subAdminOptions.map(singleOption =>
                                this.getMenuItem({submenuStyle, submenuColor, singleOption})
                            )}

                        </Menu>
                    </Scrollbars>
                </Sider>
            </SidebarWrapper>
        );
    }
}

export default connect(
    state => ({
        app: state.App,
        customizedTheme: state.ThemeSwitcher.sidebarTheme,
        height: state.App.height
    }),
    {toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed}
)(Sidebar);
