import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout, LocaleProvider} from 'antd';
import {IntlProvider} from 'react-intl';
import {Debounce} from 'react-throttle';
import WindowResizeListener from 'react-window-size-listener';
import {ThemeProvider} from 'styled-components';
import authAction from '../../redux/auth/actions';
import appActions from '../../redux/app/actions';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import AppRouter from './AppRouter';
import {AppLocale} from '../../dashApp';
import themes from '../../settings/themes';
import AppHolder from './commonStyle';
import './global.css';
import {Spin} from 'antd';

const {Content} = Layout;
const {logout} = authAction;
const {toggleAll, loadChange} = appActions;

export class App extends Component {
    render() {
        const {url} = this.props.match;
        const {locale, selectedTheme, height, admin, isUser, isVehicleManager, loading, isGenerator, isConveyor, isSubAdmin} = this.props;
        const currentAppLocale = AppLocale[locale];
        const appHeight = window.innerHeight;

        return (
            <LocaleProvider locale={currentAppLocale.antd}>
                <IntlProvider
                    locale={currentAppLocale.locale}
                    messages={currentAppLocale.messages}
                >
                    <ThemeProvider theme={themes[selectedTheme]}>
                        <AppHolder>
                            <Layout style={{height: appHeight}}>
                                <Debounce time="1000" handler="onResize">
                                    <WindowResizeListener
                                        onResize={windowSize =>
                                            this.props.toggleAll(
                                                windowSize.windowWidth,
                                                windowSize.windowHeight
                                            )
                                        }
                                    />
                                </Debounce>
                                <Topbar url={url}/>
                                <Layout style={{flexDirection: 'row', overflowX: 'hidden'}}>
                                    <Sidebar url={url} admin={admin} isUser={isUser} isGenerator={isGenerator}
                                             isConveyor={isConveyor}
                                             isVehicleManager={isVehicleManager}
                                             isSubAdmin={isSubAdmin}
                                    />
                                    <Layout
                                        className="isoContentMainLayout"
                                        style={{
                                            height: height
                                        }}
                                    >
                                        <Content
                                            className="isomorphicContent"
                                            style={{
                                                padding: '70px 0 0',
                                                flexShrink: '0',
                                                background: 'rgba(244, 246, 251)',
                                                position: 'relative'
                                            }}
                                        >
                                            <Spin spinning={loading > 0}>

                                                <AppRouter url={url}/>
                                            </Spin>

                                        </Content>
                                    </Layout>
                                </Layout>
                            </Layout>
                        </AppHolder>
                    </ThemeProvider>
                </IntlProvider>
            </LocaleProvider>

        );
    }
}

export default connect(
    state => ({
        auth: state.Auth,
        locale: state.LanguageSwitcher.language.locale,
        selectedTheme: state.ThemeSwitcher.changeThemes.themeName,
        height: state.App.height,
        loading: state.App.loading
    }),
    {logout, toggleAll, loadChange}
)(App);
