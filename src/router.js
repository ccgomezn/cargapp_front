import React from "react";
import {Route, Redirect} from "react-router-dom";
import {ConnectedRouter} from "react-router-redux";
import {connect} from "react-redux";
import App from "./containers/App/App";
import asyncComponent from "./helpers/AsyncFunc";
import importantVariables from "./helpers/hashVariables"
import {decrypt} from "./helpers/utility";

const RestrictedRoute = ({component: Component, isLoggedIn, isUser, admin, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isLoggedIn && isUser ? (
                <Component {...props} admin={admin}/>
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


const PublicRoute = ({component: Component, isLoggedIn, isUser, admin, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isLoggedIn && isUser && admin ? (
                <Redirect
                    to={{
                        pathname: "/admin/",
                        state: {from: props.location}
                    }}
                />
            ) : (
                isLoggedIn && isUser ? (
                    <Redirect
                        to={{
                            pathname: "/dashboard",
                            state: {from: props.location}
                        }}
                    />
                ) : (
                    <Component {...props} />

                )

            )
        }
    />
);

const PublicRoutes = ({history, isLoggedIn, isUser, isAdmin}) => {
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

                />
                <PublicRoute
                    exact
                    path={"/signup"}
                    component={asyncComponent(() => import("./containers/Page/signup"))}
                    isLoggedIn={isLoggedIn}
                    isUser={isUser}
                    admin={isAdmin}

                />
                <PublicRoute
                    exact
                    path={"/signupcompany"}
                    component={asyncComponent(() => import("./containers/Page/signupCompany"))}
                    isLoggedIn={isLoggedIn}
                    isUser={isUser}
                    admin={isAdmin}

                />
                <PublicRoute
                    exact
                    path={"/signupfinancial"}
                    component={asyncComponent(() => import("./containers/Page/signupFinancial"))}
                    isLoggedIn={isLoggedIn}
                    isUser={isUser}
                    admin={isAdmin}

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

                />

                <RestrictedRoute
                    path="/admin"
                    component={App}
                    isLoggedIn={isLoggedIn}
                    isUser={isAdmin}
                    admin={isAdmin}
                />
                <RestrictedRoute
                    path="/dashboard"
                    component={App}
                    isLoggedIn={isLoggedIn}
                    isUser={isUser}
                    admin={isAdmin}
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
            isUser: roles !== null && roles !== undefined && roles.includes(String(importantVariables.user_role_id)),
            isAdmin: roles !== null && roles !== undefined && roles.includes(String(importantVariables.admin_role_id)),
        }
    )
})(PublicRoutes);
