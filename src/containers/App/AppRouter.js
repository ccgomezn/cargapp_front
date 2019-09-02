import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import asyncComponent from '../../helpers/AsyncFunc';

const routes = [
    {
        path: '',
        component: asyncComponent(() => import('../Dashboard/index.js')),
    },
    {
        path: 'tracking',
        component: asyncComponent(() => import('../Tracking'))
    },
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
        path: 'services/add',
        component: asyncComponent(() => import('../AdminCargapp/Services/create'))
    },
    {
        path: 'services/edit/:id',
        component: asyncComponent(() => import('../AdminCargapp/Services/edit'))
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
        path: 'cargapp_models/add',
        component: asyncComponent(() => import('../AdminCargapp/CargappModels/create'))
    },
    {
        path: 'trackingmap',
        component: asyncComponent(() => import('../TrackingMap'))
    },
    {
        path: 'trackingservice',
        component: asyncComponent(() => import('../TrackingService'))
    },
    {
        path: 'inbox',
        component: asyncComponent(() => import('../Mail')),
    },
    {
        path: 'mailbox',
        component: asyncComponent(() => import('../Mail')),
    },
    {
        path: 'calendar',
        component: asyncComponent(() => import('../Calendar/Calendar')),
    },
    {
        path: 'googlemap',
        component: asyncComponent(() => import('../Map/GoogleMap/googleMap')),
    },
    {
        path: 'leafletmap',
        component: asyncComponent(() => import('../Map/Leaflet/leaflet')),
    },
    {
        path: 'table_ant',
        component: asyncComponent(() => import('../Tables/antTables')),
    },
    {
        path: 'allFormComponent',
        component: asyncComponent(() => import('../Forms/allComponents/')),
    },
    {
        path: 'InputField',
        component: asyncComponent(() => import('../Forms/Input')),
    },
    {
        path: 'editor',
        component: asyncComponent(() => import('../Forms/editor/')),
    },
    {
        path: 'stepperForms',
        component: asyncComponent(() => import('../Forms/StepperForms/')),
    },
    {
        path: 'FormsWithValidation',
        component: asyncComponent(() => import('../Forms/FormsWithValidation')),
    },
    {
        path: 'progress',
        component: asyncComponent(() => import('../Forms/Progress')),
    },
    {
        path: 'button',
        component: asyncComponent(() => import('../Forms/Button')),
    },
    {
        path: 'tab',
        component: asyncComponent(() => import('../Forms/Tab')),
    },
    {
        path: 'autocomplete',
        component: asyncComponent(() => import('../Forms/AutoComplete')),
    },
    {
        path: 'checkbox',
        component: asyncComponent(() => import('../Forms/Checkbox')),
    },
    {
        path: 'radiobox',
        component: asyncComponent(() => import('../Forms/Radiobox/')),
    },
    {
        path: 'selectbox',
        component: asyncComponent(() => import('../Forms/Select/')),
    },
    {
        path: 'transfer',
        component: asyncComponent(() => import('../Forms/Transfer/')),
    },
    {
        path: 'gridLayout',
        component: asyncComponent(() => import('../Box/GridLayout')),
    },
    {
        path: 'notes',
        component: asyncComponent(() => import('../Notes')),
    },
    {
        path: 'todo',
        component: asyncComponent(() => import('../Todo')),
    },
    {
        path: 'articles',
        component: asyncComponent(() => import('../FirestoreCRUD/Article')),
    },
    {
        path: 'investors',
        component: asyncComponent(() => import('../FirestoreCRUD/Investor')),
    },
    {
        path: 'contacts',
        component: asyncComponent(() => import('../Contacts')),
    },
    {
        path: 'alert',
        component: asyncComponent(() => import('../Feedback/Alert')),
    },
    {
        path: 'modal',
        component: asyncComponent(() => import('../Feedback/Modal/')),
    },
    {
        path: 'message',
        component: asyncComponent(() => import('../Feedback/Message')),
    },
    {
        path: 'notification',
        component: asyncComponent(() => import('../Feedback/Notification')),
    },
    {
        path: 'Popconfirm',
        component: asyncComponent(() => import('../Feedback/Popconfirm')),
    },
    {
        path: 'spin',
        component: asyncComponent(() => import('../Feedback/Spin')),
    },
    {
        path: 'shuffle',
        component: asyncComponent(() => import('../Shuffle')),
    },
    {
        path: 'affix',
        component: asyncComponent(() => import('../Navigation/affix')),
    },
    {
        path: 'breadcrumb',
        component: asyncComponent(() =>
            import('../Uielements/Breadcrumb/breadcrumb')
        ),
    },
    {
        path: 'backToTop',
        component: asyncComponent(() => import('../Navigation/backToTop')),
    },
    {
        path: 'dropdown',
        component: asyncComponent(() => import('../Uielements/Dropdown/dropdown')),
    },
    {
        path: 'op_badge',
        component: asyncComponent(() => import('../Uielements/Badge')),
    },
    {
        path: 'op_card',
        component: asyncComponent(() => import('../Uielements/Card')),
    },
    {
        path: 'op_carousel',
        component: asyncComponent(() => import('../Uielements/Carousel')),
    },
    {
        path: 'op_collapse',
        component: asyncComponent(() => import('../Uielements/Collapse')),
    },
    {
        path: 'op_tooltip',
        component: asyncComponent(() => import('../Uielements/Tooltip/')),
    },
    {
        path: 'rating',
        component: asyncComponent(() => import('../Uielements/rating/')),
    },
    {
        path: 'tree',
        component: asyncComponent(() => import('../Uielements/Tree/')),
    },
    {
        path: 'op_tag',
        component: asyncComponent(() => import('../Uielements/Tag')),
    },
    {
        path: 'op_timeline',
        component: asyncComponent(() => import('../Uielements/Timeline')),
    },
    {
        path: 'op_popover',
        component: asyncComponent(() => import('../Uielements/Popover')),
    },
    {
        path: 'googleChart',
        component: asyncComponent(() => import('../Charts/googleChart')),
    },
    {
        path: 'reecharts',
        component: asyncComponent(() => import('../Charts/recharts')),
    },
    {
        path: 'menu',
        component: asyncComponent(() => import('../Navigation/menu')),
    },
    {
        path: 'ReactChart2',
        component: asyncComponent(() => import('../Charts/reactChart2')),
    },
    {
        path: 'pagination',
        component: asyncComponent(() =>
            import('../Uielements/Pagination/pagination')
        ),
    },
    {
        path: 'card',
        component: asyncComponent(() => import('../Ecommerce/card')),
    },
    {
        path: 'cart',
        component: asyncComponent(() => import('../Ecommerce/cart')),
    },
    {
        path: 'checkout',
        component: asyncComponent(() => import('../Ecommerce/checkout')),
    },
    {
        path: 'shop',
        component: asyncComponent(() =>
            import('../Ecommerce/algolia/instantSearch')
        ),
    },
    {
        path: 'reactDates',
        component: asyncComponent(() =>
            import('../AdvancedUI/ReactDates/reactDates')
        ),
    },
    {
        path: 'codeMirror',
        component: asyncComponent(() => import('../AdvancedUI/codeMirror')),
    },
    {
        path: 'uppy',
        component: asyncComponent(() => import('../AdvancedUI/uppy')),
    },
    {
        path: 'dropzone',
        component: asyncComponent(() => import('../AdvancedUI/dropzone')),
    },
    {
        path: 'frappeChart',
        component: asyncComponent(() => import('../Charts/frappeChart')),
    },
    {
        path: 'invoice/:invoiceId',
        component: asyncComponent(() => import('../Invoice/singleInvoice')),
    },
    {
        path: 'invoice',
        component: asyncComponent(() => import('../Invoice')),
    },
    {
        path: 'chat',
        component: asyncComponent(() => import('../Chat')),
    },
];

class AppRouter extends Component {
    render() {
        const {url, style} = this.props;
        if (url === '/admin') {
            return (
                <div style={style}>
                    {routes_admin.map(singleRoute => {
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
