export const options = [
    {
        key: '',
        label: 'sidebar.home',
        leftIcon: 'ion-android-apps',
    },
    {
        key: 'analytics',
        label: 'sidebar.analytics',
        leftIcon: 'ion-stats-bars',
    },
    {
        key: 'tracking',
        label: 'sidebar.travels',
        leftIcon: 'ion-android-car',
    },
    {
        key: 'trackingmap',
        label: 'sidebar.map',
        leftIcon: 'ion-map'
    },
    {
        key: 'chat',
        label: 'sidebar.chat',
        leftIcon: 'ion-email',
    },
    {
        key: 'settings',
        label: 'sidebar.settings',
        leftIcon: 'ion-gear-b',
    }
];

export const optionsVehicle = [
    {
        key: '',
        label: 'sidebar.home',
        leftIcon: 'ion-android-apps',
    },
    {
        key: 'drivers',
        label: 'sidebar.drivers',
        leftIcon: 'ion-android-person',
    },
    {
        key: 'vehicles',
        label: 'sidebar.vehicles',
        leftIcon: 'ion-android-car',
    },
    {
        key: 'services',
        label: 'sidebar.allServices',
        leftIcon: 'ion-lightbulb',
    },
    {
        key: 'marketplace',
        label: 'sidebar.marketplace',
        leftIcon: 'ion-bag',
    },
];

export const optionsGenerator = [
    {
        key: '',
        label: 'sidebar.home',
        leftIcon: 'ion-android-apps',
    },
    {
        key: 'services',
        label: 'sidebar.allServices',
        leftIcon: 'ion-lightbulb',
    },
    {
        key: 'active_services',
        label: 'sidebar.activeServices',
        leftIcon: 'ion-android-star',
    }, {
        key: 'marketplace',
        label: 'sidebar.marketplace',
        leftIcon: 'ion-bag',
    },
];


export const optionsConveyor = [
    {
        key: '',
        label: 'sidebar.home',
        leftIcon: 'ion-android-apps',
    },
    {
        key: 'services',
        label: 'sidebar.services',
        leftIcon: 'ion-lightbulb',
    },
    {
        key: 'mine_services',
        label: 'sidebar.mineServices',
        leftIcon: 'ion-lightbulb',
    }, {
        key: 'marketplace',
        label: 'sidebar.marketplace',
        leftIcon: 'ion-bag',
    },
];

export const optionsAdmin = [
    {
        key: '',
        label: 'sidebar.home',
        leftIcon: 'ion-android-apps',
    },
    {
        key: 'roles_user',
        label: 'sidebar.rolesUsers',
        leftIcon: 'ion-android-person',
        children: [{
            key: 'roles',
            label: 'sidebar.roles',
            leftIcon: 'ion-android-person',
            keyName: 'ROLES'
            },
            {
                key: 'users',
                label: 'sidebar.users',
                leftIcon: 'ion-android-person',
                keyName: 'USERS'
            },
            {
                key: 'user_roles',
                label: 'sidebar.userRoles',
                leftIcon: 'ion-android-person',
                keyName: 'USER_ROLES'

            },
            {
                key: 'profiles',
                label: 'sidebar.profiles',
                leftIcon: 'ion-android-person',
                keyName: 'PROFILES'

            },
            {
                key: 'companies',
                label: 'sidebar.companies',
                leftIcon: 'ion-android-person',
                keyName: 'COMPANIES'

            }]
    },
    {
        key: 'locations',
        label: 'sidebar.locations',
        leftIcon: 'ion-ios-location',
        children: [{
            key: 'countries',
            label: 'sidebar.countries',
            leftIcon: 'ion-android-person',
            keyName: 'COUNTRIES'

        },
            {
                key: 'states',
                label: 'sidebar.states',
                leftIcon: 'ion-android-person',
                keyName: 'STATES'

            },
            {
                key: 'cities',
                label: 'sidebar.cities',
                leftIcon: 'ion-android-person',
                keyName: 'CITIES'

            }]
    },
    {
        key: 'vehicles_loads',
        label: 'sidebar.vehiclesLoads',
        leftIcon: 'ion-android-car',
        children: [{
            key: 'vehicles',
            label: 'sidebar.vehicles',
            leftIcon: 'ion-android-person',
            keyName: 'VEHICLES'

        },
            {
                key: 'vehicle_types',
                label: 'sidebar.vehicleTypes',
                leftIcon: 'ion-android-person',
                keyName: 'VEHICLE_TYPES'

            },
            {
                key: 'load_types',
                label: 'sidebar.loadTypes',
                leftIcon: 'ion-android-person',
                keyName: 'LOAD_TYPES'

            }]
    }, {
        key: 'coupons',
        label: 'sidebar.couponsPrizes',
        leftIcon: 'ion-ios-pricetag',
        children: [{
            key: 'coupons',
            label: 'sidebar.coupons',
            keyName: 'COUPONS'

        },
            {
                key: 'user_coupons',
                label: 'sidebar.usersCoupons',
                keyName: 'USER_COUPONS'

            },
            {
                key: 'prizes',
                label: 'sidebar.prizes',
                leftIcon: 'ion-android-person',
                keyName: 'PRIZES'

            },
            {
                key: 'user_prizes',
                label: 'sidebar.userPrizes',
                keyName: 'USER_PRIZES'

            }]
    }, {
        key: 'documents',
        label: 'sidebar.documents',
        leftIcon: 'ion-android-document',
        children: [{
            key: 'documents',
            label: 'sidebar.documents',
            keyName: 'DOCUMENTS'

        },
            {
                key: 'document_types',
                label: 'sidebar.documentTypes',
                keyName: 'DOCUMENT_TYPES'

            }]
    }, {
        key: 'challenges',
        label: 'sidebar.challenges',
        leftIcon: 'ion-android-walk',
        children: [{
            key: 'challenges',
            label: 'sidebar.challenges',
            keyName: 'CHALLENGES'

        },
            {
                key: 'user_challenges',
                label: 'sidebar.userChallenges',
                keyName: 'USER_CHALLENGES'

            }]
    }, {
        key: 'indoors',
        label: 'sidebar.indoors',
        leftIcon: 'ion-log-in',
        children: [{
            key: 'cargapp_models',
            label: 'sidebar.cargappModels',
            keyName: 'CARGAPP_MODELS'

        }, {
            key: 'cargapp_ads',
            label: 'sidebar.cargappAds',
            keyName: 'CARGAPP_ADS'

        },
            {
                key: 'parameters',
                label: 'sidebar.parameters',
                keyName: 'PARAMETERS'

            },
            {
                key: 'permissions',
                label: 'sidebar.permissions',
                keyName: 'PERMISSIONS'

            }, {
                key: 'status',
                label: 'sidebar.status',
                keyName: 'STATUS'

            }, {
                key: 'cargapp_integrations',
                label: 'sidebar.integrations',
                keyName: 'CARGAPP_INTEGRATIONS'

            }, {
                key: 'tickets',
                label: 'sidebar.tickets',
                keyName: 'TICKETS'

            }, {
                key: 'reports',
                label: 'sidebar.reports',
                keyName: 'REPORTS'

            },
            {
                key: 'service_locations',
                label: 'sidebar.serviceLocations',
                leftIcon: 'ion-android-person',
                keyName: 'SERVICE_LOCATIONS'

            },
            {
                key: 'user_locations',
                label: 'sidebar.userLocations',
                leftIcon: 'ion-android-person',
                keyName: 'USER_LOCATIONS'

            }]
    }
    , {
        key: 'payments',
        label: 'sidebar.payments',
        leftIcon: 'ion-cash',
        children: [{
            key: 'payment_methods',
            label: 'sidebar.payment_methods',
            keyName: 'PAYMENT_METHODS'

        }, {
            key: 'bank_accounts',
            label: 'sidebar.bankAccounts',
            keyName: 'BANK_ACCOUNTS'

        },
            {
                key: 'user_payment_methods',
                label: 'sidebar.user_payment_methods',
                keyName: 'USER_PAYMENT_METHODS'

            },
            {
                key: 'payments',
                label: 'sidebar.payments',
                keyName: 'PAYMENTS'

            },
            {
                key: 'cargapp_payments',
                label: 'sidebar.cargappPayments',
                keyName: 'CARGAPP_PAYMENTS'

            },]
    }, {
        key: 'services',
        label: 'sidebar.services',
        leftIcon: 'ion-lightbulb',
        children: [{
            key: 'services',
            label: 'sidebar.services',
            keyName: 'SERVICES'

        }, {
            key: 'service_documents',
            label: 'sidebar.serviceDocuments',
            keyName: 'SERVICE_DOCUMENTS'

        }, {
            key: 'rate_services',
            label: 'sidebar.rateServices',
            keyName: 'RATE_SERVICES'

        }]
    },
    {
        key: 'routes',
        label: 'sidebar.routes',
        leftIcon: 'ion-android-map',
        children: [{
            key: 'favorite_routes',
            label: 'sidebar.favoriteRoutes',
            keyName: 'FAVORITE_ROUTES'

        }]
    },
];

export default options;
