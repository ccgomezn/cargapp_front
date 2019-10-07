import React from "react";
import {Route, Redirect} from "react-router-dom";
import {ConnectedRouter} from "react-router-redux";
import {connect} from "react-redux";
import App from "./containers/App/App";
import asyncComponent from "./helpers/AsyncFunc";
import importantVariables from "./helpers/hashVariables"
import {decrypt} from "./helpers/utility";

const RestrictedRoute = ({component: Component, isLoggedIn, isUser, admin, isVehicleManager, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isLoggedIn && (isUser || isVehicleManager)? (
                <Component {...props} admin={admin} isUser={isUser} isVehicleManager={isVehicleManager}/>
            ) : (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: {from: props.location}
                    }}
                />
            )
        }
    />
);


const PublicRoute = ({component: Component, isLoggedIn, isUser, admin, isVehicleManager,isGenerator, isConveyor, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isLoggedIn  && admin ? (
                <Redirect
                    to={{
                        pathname: "/admin/",
                        state: {from: props.location}
                    }}
                />
            ) : (
                isLoggedIn && (isVehicleManager)? (
                    <Redirect
                        to={{
                            pathname: "/vehicle_manager",
                            state: {from: props.location}
                        }}
                    />
                ) : isLoggedIn && (isGenerator)?(

                    <Redirect
                        to={{
                            pathname: "/vehicle_manager",
                            state: {from: props.location}
                        }}
                    />
                ): isLoggedIn && isConveyor &&
                    <Redirect
                        to={{
                            pathname: "/vehicle_manager",
                            state: {from: props.location}
                        }}
                    />

            )
        }
    />
);

const PublicRoutes = ({history, isLoggedIn, isUser, isAdmin,isVehicleManager, isGenerator, isConveyor}) => {
    return (
        <ConnectedRouter history={history}>
            <div>
                <PublicRoute
                    exact
                    path={"/"}
                    component={asyncComponent(() => import("./containers/Page/signin"))}
                    isLoggedIn={isLoggedIn}
                    isUser={isUser}
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
                />
                <PublicRoute
                    exact
                    path={"/signup"}
                    component={asyncComponent(() => import("./containers/Page/signup"))}
                    isLoggedIn={isLoggedIn}
                    isUser={isUser}
                    admin={isAdmin}
                    isVehicleManager={isVehicleManager}

                />
                <PublicRoute
                    exact
                    path={"/signupcompany"}
                    component={asyncComponent(() => import("./containers/Page/signupCompany"))}
                    isLoggedIn={isLoggedIn}
                    isUser={isUser}
                    admin={isAdmin}
                    isVehicleManager={isVehicleManager}
                />
                <PublicRoute
                    exact
                    path={"/signupfinancial"}
                    component={asyncComponent(() => import("./containers/Page/signupFinancial"))}
                    isLoggedIn={isLoggedIn}
                    isUser={isUser}
                    dmin={isAdmin}

                />
                <PublicRoute
                    exact
                    path={"/forgotpassword"}
                    component={asyncComponent(() =>
                        import("./containers/Page/forgotPassword")
                    )}
                    isLoggedIn={isLoggedIn}
                    isUser={isUser}
                    admin={isAdmin}
                    isVehicleManager={isVehicleManager}

                />
                <PublicRoute
                    exact
                    path={"/resetpassword"}
                    component={asyncComponent(() =>
                        import("./containers/Page/resetPassword")
                    )}
                    isLoggedIn={isLoggedIn}
                    isUser={isUser}
                    admin={isAdmin}
                    isVehicleManager={isVehicleManager}

                />

                <RestrictedRoute
                    path="/admin"
                    component={App}
                    isLoggedIn={isLoggedIn}
                    isUser={isAdmin}
                    admin={isAdmin}
                    isVehicleManager={isVehicleManager}

                />
                <RestrictedRoute
                    path="/dashboard"
                    component={App}
                    isLoggedIn={isLoggedIn}
                    isUser={isUser}
                    admin={isAdmin}
                    isVehicleManager={isVehicleManager}

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
                />
                <RestrictedRoute
                    path="/dashboard"
                    component={App}
                    isLoggedIn={isLoggedIn}
                    isUser={isUser}
                    admin={isAdmin}
                    isVehicleManager={isVehicleManager}
                />
                <RestrictedRoute
                    path="/dashboard"
                    component={App}
                    isLoggedIn={isLoggedIn}
                    isUser={isUser}
                    admin={isAdmin}
                    isVehicleManager={isVehicleManager}

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
            isLoggedIn: idToken !== null && idToken !== undefined,
            isUser: roles !== null && roles !== undefined && roles.includes(String(importantVariables.load_generator_role_id)),
            isAdmin: roles !== null && roles !== undefined && roles.includes(String(importantVariables.admin_role_id)),
            isVehicleManager: roles !== null && roles !== undefined && roles.includes(String(importantVariables.vehicle_admin_role_id)),
            isConveyor: roles !== null && roles !== undefined && roles.includes(String(importantVariables.conveyor_role_id)),
            isGenerator: roles !== null && roles !== undefined && roles.includes(String(importantVariables.generator_role_id))
        }
    )
})(PublicRoutes);
