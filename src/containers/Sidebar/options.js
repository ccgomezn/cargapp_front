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
        },
            {
                key: 'user_roles',
                label: 'sidebar.userRoles',
                leftIcon: 'ion-android-person',
            },
            {
                key: 'profiles',
                label: 'sidebar.profiles',
                leftIcon: 'ion-android-person',
            },
            {
                key: 'companies',
                label: 'sidebar.companies',
                leftIcon: 'ion-android-person',
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
        },
            {
                key: 'states',
                label: 'sidebar.states',
                leftIcon: 'ion-android-person',
            },
            {
                key: 'cities',
                label: 'sidebar.cities',
                leftIcon: 'ion-android-person',
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
        },
            {
                key: 'vehicle_types',
                label: 'sidebar.vehicleTypes',
                leftIcon: 'ion-android-person',
            },
            {
                key: 'load_types',
                label: 'sidebar.loadTypes',
                leftIcon: 'ion-android-person',
            }]
    }, {
        key: 'coupons',
        label: 'sidebar.couponsPrizes',
        leftIcon: 'ion-ios-pricetag',
        children: [{
            key: 'coupons',
            label: 'sidebar.coupons',
        },
            {
                key: 'user_coupons',
                label: 'sidebar.usersCoupons',
            },
            {
                key: 'prizes',
                label: 'sidebar.prizes',
                leftIcon: 'ion-android-person',
            },
            {
                key: 'user_prizes',
                label: 'sidebar.userPrizes',
            }]
    }, {
        key: 'documents',
        label: 'sidebar.documents',
        leftIcon: 'ion-android-document',
        children: [{
            key: 'documents',
            label: 'sidebar.documents',
        },
            {
                key: 'document_types',
                label: 'sidebar.documentTypes',
            }]
    }, {
        key: 'challenges',
        label: 'sidebar.challenges',
        leftIcon: 'ion-android-walk',
        children: [{
            key: 'challenges',
            label: 'sidebar.challenges',
        },
            {
                key: 'user_challenges',
                label: 'sidebar.userChallenges',
            }]
    }, {
        key: 'indoors',
        label: 'sidebar.indoors',
        leftIcon: 'ion-log-in',
        children: [{
            key: 'cargapp_models',
            label: 'sidebar.cargappModels',
        },
            {
                key: 'parameters',
                label: 'sidebar.parameters',
            },
            {
                key: 'permissions',
                label: 'sidebar.permissions',
            }, {
                key: 'status',
                label: 'sidebar.status',
            }, {
                key: 'cargapp_integrations',
                label: 'sidebar.integrations',
            }, {
                key: 'tickets',
                label: 'sidebar.tickets',
            },]
    }
    , {
        key: 'payments',
        label: 'sidebar.payments',
        leftIcon: 'ion-cash',
        children: [{
            key: 'payment_methods',
            label: 'sidebar.payment_methods',
        },
            {
                key: 'user_payment_methods',
                label: 'sidebar.user_payment_methods',
            }]
    },
];

export default options;