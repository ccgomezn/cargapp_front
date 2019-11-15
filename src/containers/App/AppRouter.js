import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import asyncComponent from '../../helpers/AsyncFunc';

const shared_routes = [
    {
        path: 'configurations',
        component: asyncComponent(() => import('../Users/Configurations/Configuration.js'))
    }
];


const routes_admin = [

    {
        path: 'roles',
        component: asyncComponent(() => import('../AdminCargapp/Roles'))
    },

    {
        path: 'roles/add',
        component: asyncComponent(() => import('../AdminCargapp/Roles/create'))
    },
    {
        path: 'roles/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/Roles/edit'))
    },
    {
        path: 'document_types',
        component: asyncComponent(() => import('../AdminCargapp/DocumentTypes'))
    },
    {
        path: 'document_types/add',
        component: asyncComponent(() => import('../AdminCargapp/DocumentTypes/create'))
    },
    {
        path: 'document_types/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/DocumentTypes/edit'))
    },
    {
        path: 'vehicle_types',
        component: asyncComponent(() => import('../AdminCargapp/VehicleTypes'))
    },
    {
        path: 'vehicle_types/add',
        component: asyncComponent(() => import('../AdminCargapp/VehicleTypes/create'))
    },
    {
        path: 'vehicle_types/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/VehicleTypes/edit'))
    },
    {
        path: 'load_types',
        component: asyncComponent(() => import('../AdminCargapp/LoadTypes'))
    },
    {
        path: 'load_types/add',
        component: asyncComponent(() => import('../AdminCargapp/LoadTypes/create'))
    },
    {
        path: 'load_types/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/LoadTypes/edit'))
    },
    {
        path: 'parameters',
        component: asyncComponent(() => import('../AdminCargapp/Parameters'))
    },
    {
        path: 'parameters/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/Parameters/show'))
    },
    {
        path: 'parameters/add',
        component: asyncComponent(() => import('../AdminCargapp/Parameters/create'))
    },
    {
        path: 'parameters/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/Parameters/edit'))
    },
    {
        path: 'vehicles',
        component: asyncComponent(() => import('../AdminCargapp/Vehicles'))
    },
    {
        path: 'vehicles/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/Vehicles/show'))
    },
    {
        path: 'vehicles/add',
        component: asyncComponent(() => import('../AdminCargapp/Vehicles/create'))
    },
    {
        path: 'vehicles/add/:id',
        component: asyncComponent(() => import('../AdminCargapp/Vehicles/create'))
    },
    {
        path: 'vehicles/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/Vehicles/edit'))
    },
    {
        path: 'challenges',
        component: asyncComponent(() => import('../AdminCargapp/Challenges'))
    },
    {
        path: 'challenges/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/Challenges/show'))
    },
    {
        path: 'challenges/add',
        component: asyncComponent(() => import('../AdminCargapp/Challenges/create'))
    },
    {
        path: 'challenges/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/Challenges/edit'))
    },
    {
        path: 'coupons',
        component: asyncComponent(() => import('../AdminCargapp/Coupons'))
    },
    {
        path: 'coupons/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/Coupons/show'))
    },
    {
        path: 'coupons/add',
        component: asyncComponent(() => import('../AdminCargapp/Coupons/create'))
    },
    {
        path: 'coupons/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/Coupons/edit'))
    },
    {
        path: 'user_challenges',
        component: asyncComponent(() => import('../AdminCargapp/UserChallenges'))
    },

    {
        path: 'user_challenges/add',
        component: asyncComponent(() => import('../AdminCargapp/UserChallenges/create'))
    },
    {
        path: 'user_challenges/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/UserChallenges/edit'))
    },
    {
        path: 'user_coupons',
        component: asyncComponent(() => import('../AdminCargapp/UserCoupons'))
    },

    {
        path: 'user_coupons/add',
        component: asyncComponent(() => import('../AdminCargapp/UserCoupons/create'))
    },
    {
        path: 'user_coupons/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/UserCoupons/edit'))
    },

    {
        path: 'profiles',
        component: asyncComponent(() => import('../AdminCargapp/Profiles'))
    },
    {
        path: 'profiles/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/Profiles/show'))
    },
    {
        path: 'profiles/add',
        component: asyncComponent(() => import('../AdminCargapp/Profiles/create'))
    },
    {
        path: 'profiles/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/Profiles/edit'))
    },

    {
        path: 'prizes',
        component: asyncComponent(() => import('../AdminCargapp/Prizes'))
    },
    {
        path: 'prizes/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/Prizes/show'))
    },
    {
        path: 'prizes/add',
        component: asyncComponent(() => import('../AdminCargapp/Prizes/create'))
    },
    {
        path: 'prizes/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/Prizes/edit'))
    },

    {
        path: 'user_prizes',
        component: asyncComponent(() => import('../AdminCargapp/UserPrizes'))
    },
    {
        path: 'user_prizes/add',
        component: asyncComponent(() => import('../AdminCargapp/UserPrizes/create'))
    },
    {
        path: 'user_prizes/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/UserPrizes/edit'))
    },
    {
        path: 'documents',
        component: asyncComponent(() => import('../AdminCargapp/Documents'))
    },
    {
        path: 'documents/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/Documents/show'))
    },
    {
        path: 'documents/add',
        component: asyncComponent(() => import('../AdminCargapp/Documents/create'))
    },
    {
        path: 'documents/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/Documents/edit'))
    },
    {
        path: 'companies',
        component: asyncComponent(() => import('../AdminCargapp/Companies'))
    },
    {
        path: 'companies/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/Companies/show'))
    },
    {
        path: 'companies/add',
        component: asyncComponent(() => import('../AdminCargapp/Companies/create'))
    },
    {
        path: 'companies/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/Companies/edit'))
    }, {
        path: 'tickets',
        component: asyncComponent(() => import('../AdminCargapp/Tickets'))
    },
    {
        path: 'tickets/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/Tickets/show'))
    },
    {
        path: 'tickets/add',
        component: asyncComponent(() => import('../AdminCargapp/Tickets/create'))
    },
    {
        path: 'tickets/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/Tickets/edit'))
    }, {
        path: 'services',
        component: asyncComponent(() => import('../AdminCargapp/Services'))
    },
    {
        path: 'services/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/Services/show'))
    },
    {
        path: 'services/detail/:id',
        component: asyncComponent(() => import('../AdminCargapp/Services/detail'))
    },
    {
        path: 'services/add',
        component: asyncComponent(() => import('../AdminCargapp/Services/create'))
    },
    {
        path: 'services/assign',
        component: asyncComponent(() => import('../AdminCargapp/Services/create'), {assign: true})
    },
    {
        path: 'services/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/Services/edit'), {assign: true})
    }, {
        path: 'service_documents',
        component: asyncComponent(() => import('../AdminCargapp/ServiceDocuments'))
    },
    {
        path: 'service_documents/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/ServiceDocuments/show'))
    },
    {
        path: 'service_documents/detailed/:id',
        component: asyncComponent(() => import('../AdminCargapp/ServiceDocuments'))
    },
    {
        path: 'service_documents/add',
        component: asyncComponent(() => import('../AdminCargapp/ServiceDocuments/create'))
    }, {
        path: 'users',
        component: asyncComponent(() => import('../AdminCargapp/Users'))
    },
    {
        path: 'users/add',
        component: asyncComponent(() => import('../AdminCargapp/Users/create'))
    },
    {
        path: 'users/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/Users/create'))
    },
    {
        path: 'users/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/Users/show'))
    },
    {
        path: 'drivers',
        component: asyncComponent(() => import('../AdminCargapp/Users'), {driver: true})
    },
    {
        path: 'drivers/dashboard/:id',
        component: asyncComponent(() => import('../AdminCargapp/Users/dashboard'), {driver: true})
    },
    {
        path: 'drivers/add',
        component: asyncComponent(() => import('../AdminCargapp/Users/driverCreate'))
    },
    {
        path: 'users/verify/:id',
        component: asyncComponent(() => import('../AdminCargapp/Users/verify'))
    },
    {
        path: 'users/documents/:id',
        component: asyncComponent(() => import('../AdminCargapp/Documents'))
    },
    {
        path: 'users/favorite_routes/:id',
        component: asyncComponent(() => import('../AdminCargapp/FavoriteRoutes'))
    }, {
        path: 'users/payments/:id',
        component: asyncComponent(() => import('../AdminCargapp/Payments'))
    }, {
        path: 'users/reports/:id',
        component: asyncComponent(() => import('../AdminCargapp/Reports'))
    },
    {
        path: 'service_documents/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/ServiceDocuments/edit'))
    }, {
        path: 'favorite_routes',
        component: asyncComponent(() => import('../AdminCargapp/FavoriteRoutes'))
    },
    {
        path: 'favorite_routes/add',
        component: asyncComponent(() => import('../AdminCargapp/FavoriteRoutes/create'))
    },
    {
        path: 'favorite_routes/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/FavoriteRoutes/edit'))
    },
    {
        path: 'cargapp_integrations',
        component: asyncComponent(() => import('../AdminCargapp/CargappIntegrations'))
    },
    {
        path: 'cargapp_integrations/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/CargappIntegrations/show'))
    },
    {
        path: 'cargapp_integrations/add',
        component: asyncComponent(() => import('../AdminCargapp/CargappIntegrations/create'))
    },
    {
        path: 'cargapp_integrations/personal',
        component: asyncComponent(() => import('../AdminCargapp/CargappIntegrations/personal'))
    },
    {
        path: 'cargapp_integrations/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/CargappIntegrations/edit'))
    },
    {
        path: 'permissions',
        component: asyncComponent(() => import('../AdminCargapp/Permissions'))
    },
    {
        path: 'permissions/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/Permissions/show'))
    },
    {
        path: 'permissions/add',
        component: asyncComponent(() => import('../AdminCargapp/Permissions/create'))
    },
    {
        path: 'permissions/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/Permissions/edit'))
    },
    {
        path: 'cargapp_ads',
        component: asyncComponent(() => import('../AdminCargapp/CargappAds'))
    },
    {
        path: 'cargapp_ads/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/CargappAds/show'))
    },
    {
        path: 'cargapp_ads/add',
        component: asyncComponent(() => import('../AdminCargapp/CargappAds/create'))
    },
    {
        path: 'cargapp_ads/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/CargappAds/edit'))
    },
    {
        path: 'user_locations',
        component: asyncComponent(() => import('../AdminCargapp/UserLocations'))
    },
    {
        path: 'user_locations/add',
        component: asyncComponent(() => import('../AdminCargapp/UserLocations/create'))
    },
    {
        path: 'user_locations/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/UserLocations/edit'))
    },
    {
        path: 'service_locations',
        component: asyncComponent(() => import('../AdminCargapp/ServiceLocations'))
    },
    {
        path: 'service_locations/add',
        component: asyncComponent(() => import('../AdminCargapp/ServiceLocations/create'))
    },
    {
        path: 'service_locations/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/ServiceLocations/edit'))
    }, {
        path: 'bank_accounts',
        component: asyncComponent(() => import('../AdminCargapp/BankAccounts'))
    },
    {
        path: 'bank_accounts/add',
        component: asyncComponent(() => import('../AdminCargapp/BankAccounts/create'))
    },
    {
        path: 'bank_accounts/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/BankAccounts/edit'))
    }, {
        path: 'rate_services',
        component: asyncComponent(() => import('../AdminCargapp/RateServices'))
    },
    {
        path: 'rate_services/add',
        component: asyncComponent(() => import('../AdminCargapp/RateServices/create'))
    },
    {
        path: 'rate_services/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/RateServices/edit'))
    },
    {
        path: 'rate_services/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/RateServices/show'))
    },
    {
        path: 'cargapp_payments',
        component: asyncComponent(() => import('../AdminCargapp/CargappPayments'))
    },
    {
        path: 'cargapp_payments/add',
        component: asyncComponent(() => import('../AdminCargapp/CargappPayments/create'))
    },
    {
        path: 'cargapp_payments/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/CargappPayments/edit'))
    },
    {
        path: 'cargapp_payments/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/CargappPayments/show'))
    },
    {
        path: 'payments',
        component: asyncComponent(() => import('../AdminCargapp/Payments'))
    },
    {
        path: 'payments/add',
        component: asyncComponent(() => import('../AdminCargapp/Payments/create'))
    },
    {
        path: 'payments/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/Payments/edit'))
    },
    {
        path: 'payments/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/Payments/show'))
    },
    {
        path: 'cargapp_models',
        component: asyncComponent(() => import('../AdminCargapp/CargappModels'))
    },
    {
        path: 'user_roles',
        component: asyncComponent(() => import('../AdminCargapp/UserRoles'))
    },
    {
        path: 'user_roles/add',
        component: asyncComponent(() => import('../AdminCargapp/UserRoles/create'))
    },
    {
        path: 'user_roles/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/UserRoles/edit'))
    },
    {
        path: 'status',
        component: asyncComponent(() => import('../AdminCargapp/Status'))
    },
    {
        path: 'status/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/Status/edit'))
    },
    {
        path: 'status/add',
        component: asyncComponent(() => import('../AdminCargapp/Status/create'))
    },
    {
        path: 'status/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/Status/show'))
    },
    {
        path: 'countries',
        component: asyncComponent(() => import('../AdminCargapp/Countries'))
    },
    {
        path: 'countries/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/Countries/edit'))
    },
    {
        path: 'countries/add',
        component: asyncComponent(() => import('../AdminCargapp/Countries/create'))
    },
    {
        path: 'countries/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/Countries/show'))
    },
    {
        path: 'payment_methods',
        component: asyncComponent(() => import('../AdminCargapp/PaymentMethods'))
    },
    {
        path: 'payment_methods/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/PaymentMethods/edit'))
    },
    {
        path: 'payment_methods/add',
        component: asyncComponent(() => import('../AdminCargapp/PaymentMethods/create'))
    },
    {
        path: 'payment_methods/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/PaymentMethods/show'))
    },
    {
        path: 'user_payment_methods',
        component: asyncComponent(() => import('../AdminCargapp/UserPaymentMethods'))
    },
    {
        path: 'user_payment_methods/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/UserPaymentMethods/edit'))
    },
    {
        path: 'user_payment_methods/add',
        component: asyncComponent(() => import('../AdminCargapp/UserPaymentMethods/create'))
    },
    {
        path: 'user_payment_methods/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/UserPaymentMethods/show'))
    },
    {
        path: 'reports',
        component: asyncComponent(() => import('../AdminCargapp/Reports'))
    },
    {
        path: 'reports/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/Reports/edit'))
    },
    {
        path: 'reports/add',
        component: asyncComponent(() => import('../AdminCargapp/Reports/create'))
    },
    {
        path: 'reports/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/Reports/show'))
    },
    {
        path: 'states',
        component: asyncComponent(() => import('../AdminCargapp/States'))
    },
    {
        path: 'states/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/States/edit'))
    },
    {
        path: 'states/add',
        component: asyncComponent(() => import('../AdminCargapp/States/create'))
    },
    {
        path: 'cities',
        component: asyncComponent(() => import('../AdminCargapp/Cities'))
    },
    {
        path: 'cities/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/Cities/edit'))
    },
    {
        path: 'cities/add',
        component: asyncComponent(() => import('../AdminCargapp/Cities/create'))
    },
    {
        path: 'cargapp_models/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/CargappModels/edit'))
    },
    {
        path: 'service_users/:id',
        component: asyncComponent(() => import('../AdminCargapp/Services/users'))
    },
    {
        path: 'cargapp_models/add',
        component: asyncComponent(() => import('../AdminCargapp/CargappModels/create'))
    },

    ...shared_routes
];

const routes_generator = [
    {
        path: 'services',
        component: asyncComponent(() => import('../AdminCargapp/Services'), {generator: true})
    },
    {
        path: 'services/add',
        component: asyncComponent(() => import('../AdminCargapp/Services/create'), {generator: true})
    },
    {
        path: 'active_services',
        component: asyncComponent(() => import('../AdminCargapp/Services'), {generator: true, active_services: true})
    },
    {
        path: 'services/detail/:id',
        component: asyncComponent(() => import('../AdminCargapp/Services/detail'), {generator: true})
    },
    {
        path: 'service_documents/detailed/:id',
        component: asyncComponent(() => import('../AdminCargapp/ServiceDocuments', ), {generator: true})
    },
    {
        path: 'service_documents/add/:id',
        component: asyncComponent(() => import('../AdminCargapp/ServiceDocuments/create'), {generator: true})
    },
    {
        path: 'service_documents/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/ServiceDocuments/show'), {generator: true})
    },
    {
        path: 'service_users/:id',
        component: asyncComponent(() => import('../AdminCargapp/Services/users'), {generator: true})
    },
    {
        path: 'users/show/:id/:service_id',
        component: asyncComponent(() => import('../AdminCargapp/Users/show'), {generator: true})
    },
    {
        path: 'users/show_detail/:id/:service_id',
        component: asyncComponent(() => import('../AdminCargapp/Users/show'), {generator: true, detail:true})
    }
];

const routes_vehicle_manager = [
    {
        path: 'vehicles',
        component: asyncComponent(() => import('../AdminCargapp/Vehicles'), {vehicle_manager: true})
    },
    {
        path: 'services',
        component: asyncComponent(() => import('../AdminCargapp/Services'), {vehicle_manager: true})
    },
    {
        path: 'services/subscribe/:id',
        component: asyncComponent(() => import('../AdminCargapp/Services/subscribe'), {vehicle_manager: true})
    },
    {
        path: 'drivers',
        component: asyncComponent(() => import('../AdminCargapp/Users'), {driver: true})
    },
    {
        path: 'drivers/add',
        component: asyncComponent(() => import('../AdminCargapp/Users/driverCreate'), {driver: true})
    },
    {
        path: 'vehicles/add/:id',
        component: asyncComponent(() => import('../AdminCargapp/Vehicles/create'), {vehicle_manager: true})
    },{
        path: 'vehicles/add',
        component: asyncComponent(() => import('../AdminCargapp/Vehicles/create'), {vehicle_manager: true})
    },{
        path: 'drivers/services/:id',
        component: asyncComponent(() => import('../AdminCargapp/Services'), {vehicle_manager: true})
    },{
        path: 'services/detail/:id',
        component: asyncComponent(() => import('../AdminCargapp/Services/detail'), {vehicle_manager: true})
    },
    {
        path: 'users/show/:id',
        component: asyncComponent(() => import('../AdminCargapp/Users/show'))
    }
];

class AppRouter extends Component {
    render() {
        const {url, style} = this.props;
        let routes;
        const real_url = url.replace(/[^a-zA-Z]/g, '');
        if (real_url === 'admin') {
            routes = routes_admin;

        } else if (real_url === 'generator') {
            routes = routes_generator;
        } else if (real_url === 'vehiclemanager') {
            routes = routes_vehicle_manager;
        }
        return (
            <div style={style}>
                {routes.map(singleRoute => {
                    const {path, exact, ...otherProps} = singleRoute;
                    return (
                        <Route
                            exact={exact === false ? false : true}
                            key={singleRoute.path}
                            path={`${url}/${singleRoute.path}`}
                            {...otherProps}
                        />
                    );
                })}
            </div>
        );
    }
}

export default AppRouter;
