import React from "react";
import {Route, Redirect} from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'
import {connect} from "react-redux";
import App from "./containers/App/App";
import asyncComponent from "./helpers/AsyncFunc";
import importantVariables from "./helpers/hashVariables"
import {decrypt} from "./helpers/utility";

const RestrictedRoute = ({component: Component, isLoggedIn, isUser, admin, isVehicleManager, isConveyor, isGenerator,isSubAdmin, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isLoggedIn && (isUser || isVehicleManager || admin || isConveyor || isGenerator || isSubAdmin) ? (
                <Component {...props} admin={admin} isUser={isUser} isConveyor={isConveyor} isGenerator={isGenerator}
                           isVehicleManager={isVehicleManager} isSubAdmin={isSubAdmin}/>
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: {from: props.location}
                    }}
                />
            )
        }
    />
);


const PublicRoute = ({component: Component, isLoggedIn, isUser, admin, isVehicleManager, isGenerator, isConveyor,isSubAdmin, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isLoggedIn && (admin || isSubAdmin) ? (
                <Redirect
                    to={{
                        pathname: "/admin/",
                        state: {from: props.location}
                    }}
                />
            ) : (
                isLoggedIn && (isVehicleManager) ? (
                    <Redirect
                        to={{
                            pathname: "/vehicle_manager",
                            state: {from: props.location}
                        }}
                    />
                ) : isLoggedIn && isGenerator ? (

                    <Redirect
                        to={{
                            pathname: "/generator",
                            state: {from: props.location}
                        }}
                    />
                ) : isLoggedIn && isConveyor ?
                    <Redirect
                        to={{
                            pathname: "/conveyor",
                            state: {from: props.location}
                        }}
                    /> : (

                        <Component {...props} />
                    )

            )
        }
    />
);

const PublicRoutes = ({history, isLoggedIn, isUser, isAdmin, isVehicleManager, isGenerator, isConveyor, isSubAdmin}) => {
    return (
        <ConnectedRouter history={history}>
            <div>
                <PublicRoute
                    exact
                    path={"/"}
                    component={asyncComponent(() => import("./containers/Page/signin"))}
                    isLoggedIn={isLoggedIn}
                    isUser={isUser}
                    isSubAdmin={isSubAdmin}
                    admin={isAdmin}
                    isGenerator={isGenerator}
                    isConveyor={isConveyor}
                    isVehicleManager={isVehicleManager}
                />
                <Route
                    exact

                    path={"/404"}
                    component={asyncComponent(() => import("./containers/Page/404"))}
                />
                <Route
                    exact
                    path={"/500"}
                    component={asyncComponent(() => import("./containers/Page/500"))}
                />
                <PublicRoute
                    exact
                    path={"/signin"}
                    component={asyncComponent(() => import("./containers/Page/signin"))}
                    isLoggedIn={isLoggedIn}
                    isUser={isUser}
                    admin={isAdmin}
                    isVehicleManager={isVehicleManager}
                    isSubAdmin={isSubAdmin}
                />
                <PublicRoute
                    exact
                    path={"/signup"}
                    component={asyncComponent(() => import("./containers/Page/signup"))}
                />
                <PublicRoute
                    exact
                    path={"/forgot"}
                    component={asyncComponent(() => import("./containers/Page/forgotPassword"))}
                />
                <PublicRoute
                    exact
                    path={"/signup_company"}
                    component={asyncComponent(() => import("./containers/Page/signupCompany"))}
                />
                <PublicRoute
                    exact
                    path={"/signup_financial"}
                    component={asyncComponent(() => import("./containers/Page/signupFinancial"))}

                />
                <PublicRoute
                    exact
                    path={"/signup_financial_credit"}
                    component={asyncComponent(() => import("./containers/Page/signupFinancial"),{generator: true})}
                    />
                <PublicRoute
                    exact
                    path={"/forgot_password"}
                    component={asyncComponent(() =>
                        import("./containers/Page/forgotPassword")
                    )}
                    isLoggedIn={isLoggedIn}
                    isUser={isUser}
                    admin={isAdmin}
                    isVehicleManager={isVehicleManager}
                    isSubAdmin={isSubAdmin}
                />
                <PublicRoute
                    exact
                    path={"/reset_password"}
                    component={asyncComponent(() =>
                        import("./containers/Page/resetPassword")
                    )}
                    isLoggedIn={isLoggedIn}
                    isUser={isUser}
                    admin={isAdmin}
                    isVehicleManager={isVehicleManager}
                    isSubAdmin={isSubAdmin}
                />

                <RestrictedRoute
                    path="/admin"
                    component={App}
                    isLoggedIn={isLoggedIn}
                    isUser={isAdmin}
                    admin={isAdmin}
                    isVehicleManager={isVehicleManager}
                    isSubAdmin={isSubAdmin}
                />
                <RestrictedRoute
                    path="/dashboard"
                    component={App}
                    isLoggedIn={isLoggedIn}
                    isUser={isUser}
                    admin={isAdmin}
                    isVehicleManager={isVehicleManager}
                    isSubAdmin={isSubAdmin}
                />
                <RestrictedRoute
                    path="/vehicle_manager"
                    component={App}
                    isLoggedIn={isLoggedIn}
                    isUser={isUser}
                    admin={isAdmin}
                    isVehicleManager={isVehicleManager}
                    isGenerator={isGenerator}
                    isConveyor={isConveyor}
                    isSubAdmin={isSubAdmin}
                />
                <RestrictedRoute
                    path="/generator"
                    component={App}
                    isLoggedIn={isLoggedIn}
                    isUser={isUser}
                    admin={isAdmin}
                    isVehicleManager={isVehicleManager}
                    isGenerator={isGenerator}
                    isSubAdmin={isSubAdmin}
                />
                <RestrictedRoute
                    path="/conveyor"
                    component={App}
                    isLoggedIn={isLoggedIn}
                    isUser={isUser}
                    admin={isAdmin}
                    isVehicleManager={isVehicleManager}
                    isConveyor={isConveyor}
                    isSubAdmin={isSubAdmin}
                />


            </div>
        </ConnectedRouter>
    );
};

export default connect(state => {
    let idToken = state.Auth.idToken;
    let roles = state.Auth.roles;

    if (idToken !== null) {
        idToken = decrypt(idToken);
        if (roles !== null && roles !== undefined) {
            roles = decrypt(roles).slice(idToken.length);
            roles = roles.split(",");
        }
    }

    return (
        {
            isLoggedIn: idToken !== null && idToken !== undefined && idToken !== '',
            isUser: roles !== null && roles !== undefined && roles.includes(String(importantVariables.load_generator_role_id)),
            isAdmin: roles !== null && roles !== undefined && roles.includes(String(importantVariables.admin_role_id)),
            isVehicleManager: roles !== null && roles !== undefined && roles.includes(String(importantVariables.vehicle_admin_role_id)),
            isConveyor: roles !== null && roles !== undefined && roles.includes(String(importantVariables.conveyor_role_id)),
            isGenerator: roles !== null && roles !== undefined && roles.includes(String(importantVariables.generator_role_id)),
            isSubAdmin: roles !== null && roles !== undefined && roles.includes(String(importantVariables.sub_admin_role_id))
        }
    )
})(PublicRoutes);
