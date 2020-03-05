export const options = [
    {
        key: '',
        label: 'sidebar.home',
        leftIcon: 'ion-android-apps',
        keyName: ''
    },
    {
        key: 'mine_services',
        label: 'sidebar.mineServices',
        leftIcon: 'ion-lightbulb',
        keyName: 'mineServicesBase'
    },
    {
        key: 'drivers',
        label: 'sidebar.drivers',
        leftIcon: 'ion-android-person',
        keyName: 'driversBase'
    },
    {
        key: 'vehicles',
        label: 'sidebar.vehicles',
        leftIcon: 'ion-android-car',
        keyName: 'vehiclesBase'
    },

    {
        key: 'services',
        label: 'sidebar.allServices',
        leftIcon: 'ion-lightbulb',
        keyName: 'servicesBase'
    }, {
        key: 'active_services',
        label: 'sidebar.activeServices',
        leftIcon: 'ion-android-star',
        keyName: 'activeServicesBase'
    },
    {
        key: 'roles_user',
        label: 'sidebar.rolesUsers',
        leftIcon: 'ion-android-person',
        children: [{
            key: 'roles',
            label: 'sidebar.roles',
            leftIcon: 'ion-android-person',
            keyName: 'rolesRolesUser'
        },
            {
                key: 'users',
                label: 'sidebar.users',
                leftIcon: 'ion-android-person',
                keyName: 'usersRolesUser'
            },
            {
                key: 'user_roles',
                label: 'sidebar.userRoles',
                leftIcon: 'ion-android-person',
                keyName: 'userRolesRolesUser'

            },
            {
                key: 'profiles',
                label: 'sidebar.profiles',
                leftIcon: 'ion-android-person',
                keyName: 'profilesRolesUser'

            },
            {
                key: 'companies',
                label: 'sidebar.companies',
                leftIcon: 'ion-android-person',
                keyName: 'companiesRolesUser'

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
            keyName: 'countriesLocations'

        },
            {
                key: 'states',
                label: 'sidebar.states',
                leftIcon: 'ion-android-person',
                keyName: 'statesLocations'

            },
            {
                key: 'cities',
                label: 'sidebar.cities',
                leftIcon: 'ion-android-person',
                keyName: 'citiesLocations'

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
            keyName: 'vehiclesVehiclesLoads'

        },
            {
                key: 'vehicle_types',
                label: 'sidebar.vehicleTypes',
                leftIcon: 'ion-android-person',
                keyName: 'vehicleTypesVehiclesLoads'

            },
            {
                key: 'load_types',
                label: 'sidebar.loadTypes',
                leftIcon: 'ion-android-person',
                keyName: 'loadTypesVehiclesLoads'

            }]
    }, {
        key: 'coupons',
        label: 'sidebar.couponsPrizes',
        leftIcon: 'ion-ios-pricetag',
        children: [{
            key: 'coupons',
            label: 'sidebar.coupons',
            keyName: 'couponsCoupons'

        },
            {
                key: 'user_coupons',
                label: 'sidebar.usersCoupons',
                keyName: 'userCouponsCoupons'

            },
            {
                key: 'prizes',
                label: 'sidebar.prizes',
                leftIcon: 'ion-android-person',
                keyName: 'prizesCoupons'

            },
            {
                key: 'user_prizes',
                label: 'sidebar.userPrizes',
                keyName: 'userPrizesCoupons'

            }]
    }, {
        key: 'documents',
        label: 'sidebar.documents',
        leftIcon: 'ion-android-document',
        children: [{
            key: 'documents',
            label: 'sidebar.documents',
            keyName: 'documentsDocuments'

        },
            {
                key: 'document_types',
                label: 'sidebar.documentTypes',
                keyName: 'documentTypesDocuments'

            }]
    }, {
        key: 'challenges',
        label: 'sidebar.challenges',
        leftIcon: 'ion-android-walk',
        children: [{
            key: 'challenges',
            label: 'sidebar.challenges',
            keyName: 'challengesChallenges'

        },
            {
                key: 'user_challenges',
                label: 'sidebar.userChallenges',
                keyName: 'userChallengesChallenges'

            }]
    }, {
        key: 'indoors',
        label: 'sidebar.indoors',
        leftIcon: 'ion-log-in',
        children: [{
            key: 'cargapp_models',
            label: 'sidebar.cargappModels',
            keyName: 'cargappModelsIndoors'

        }, {
            key: 'cargapp_ads',
            label: 'sidebar.cargappAds',
            keyName: 'cargappAdsIndoors'

        },
            {
                key: 'parameters',
                label: 'sidebar.parameters',
                keyName: 'parametersIndoors'

            },
            {
                key: 'permissions',
                label: 'sidebar.permissions',
                keyName: 'permissionsIndoors'

            }, {
                key: 'status',
                label: 'sidebar.status',
                keyName: 'statusIndoors'

            }, {
                key: 'cargapp_integrations',
                label: 'sidebar.integrations',
                keyName: 'cargappIntegrationsIndoors'

            }, {
                key: 'tickets',
                label: 'sidebar.tickets',
                keyName: 'ticketsIndoors'

            }, {
                key: 'reports',
                label: 'sidebar.reports',
                keyName: 'reportsIndoors'

            },
            {
                key: 'service_locations',
                label: 'sidebar.serviceLocations',
                leftIcon: 'ion-android-person',
                keyName: 'serviceLocationsIndoors'

            },
            {
                key: 'user_locations',
                label: 'sidebar.userLocations',
                leftIcon: 'ion-android-person',
                keyName: 'userLocationsIndoors'

            }]
    }
    , {
        key: 'payments',
        label: 'sidebar.payments',
        leftIcon: 'ion-cash',
        children: [{
            key: 'payment_methods',
            label: 'sidebar.payment_methods',
            keyName: 'paymentMethodsPayments'

        }, {
            key: 'bank_accounts',
            label: 'sidebar.bankAccounts',
            keyName: 'bankAccountsPayments'

        },
            {
                key: 'user_payment_methods',
                label: 'sidebar.user_payment_methods',
                keyName: 'userPaymentMethodsPayments'

            },
            {
                key: 'payments',
                label: 'sidebar.payments',
                keyName: 'PaymentsPayments'

            },
            {
                key: 'cargapp_payments',
                label: 'sidebar.cargappPayments',
                keyName: 'cargappPaymentsPayments'

            },]
    }, {
        key: 'services',
        label: 'sidebar.services',
        leftIcon: 'ion-lightbulb',
        children: [{
            key: 'services',
            label: 'sidebar.services',
            keyName: 'servicesServices'

        }, {
            key: 'service_documents',
            label: 'sidebar.serviceDocuments',
            keyName: 'serviceDocumentsServices'

        }, {
            key: 'rate_services',
            label: 'sidebar.rateServices',
            keyName: 'rateServicesServices'

        }]
    },
    {
        key: 'routes',
        label: 'sidebar.routes',
        leftIcon: 'ion-android-map',
        children: [{
            key: 'favorite_routes',
            label: 'sidebar.favoriteRoutes',
            keyName: 'favoriteRoutesRoutes'

        }]
    },
    {
        key: 'chats',
        label: 'sidebar.chat',
        leftIcon: 'ion-android-chat',
        keyName: 'chatBase'
    },
];

export default options;
