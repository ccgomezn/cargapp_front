import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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
  {
    path: 'admin/roles',
    component: asyncComponent(() => import('../AdminCargapp/Roles'))
  },
  {
    path: 'admin/roles_add',
    component: asyncComponent(() => import('../AdminCargapp/Roles/create'))
  },
  {
    path: 'admin/roles/:id',
    component: asyncComponent(() => import('../AdminCargapp/Roles/edit'))
  },
  {
    path: 'admin/document_types',
    component: asyncComponent(() => import('../AdminCargapp/DocumentTypes'))
  },
  {
    path: 'admin/document_types_add',
    component: asyncComponent(() => import('../AdminCargapp/DocumentTypes/create'))
  },
  {
    path: 'admin/document_types/:id',
    component: asyncComponent(() => import('../AdminCargapp/DocumentTypes/edit'))
  },
  {
    path: 'admin/vehicle_types',
    component: asyncComponent(() => import('../AdminCargapp/VehicleTypes'))
  },
  {
    path: 'admin/vehicle_types_add',
    component: asyncComponent(() => import('../AdminCargapp/VehicleTypes/create'))
  },
  {
    path: 'admin/vehicle_types/:id',
    component: asyncComponent(() => import('../AdminCargapp/VehicleTypes/edit'))
  },
  {
    path: 'admin/load_types',
    component: asyncComponent(() => import('../AdminCargapp/LoadTypes'))
  },
  {
    path: 'admin/load_types_add',
    component: asyncComponent(() => import('../AdminCargapp/LoadTypes/create'))
  },
  {
    path: 'admin/load_types/:id',
    component: asyncComponent(() => import('../AdminCargapp/LoadTypes/edit'))
  },
  {
    path: 'admin/parameters',
    component: asyncComponent(() => import('../AdminCargapp/Parameters'))
  },
  {
    path: 'admin/parameters/show/:id',
    component: asyncComponent(() => import('../AdminCargapp/Parameters/show'))
  },
  {
    path: 'admin/parameters_add',
    component: asyncComponent(() => import('../AdminCargapp/Parameters/create'))
  },
  {
    path: 'admin/parameters/:id',
    component: asyncComponent(() => import('../AdminCargapp/Parameters/edit'))
  }, 
  {
    path: 'admin/cargapp_integrations',
    component: asyncComponent(() => import('../AdminCargapp/CargappIntegrations'))
  },
  {
    path: 'admin/cargapp_integrations/show/:id',
    component: asyncComponent(() => import('../AdminCargapp/CargappIntegrations/show'))
  },
  {
    path: 'admin/cargapp_integrations_add',
    component: asyncComponent(() => import('../AdminCargapp/CargappIntegrations/create'))
  },
  {
    path: 'admin/cargapp_integrations/:id',
    component: asyncComponent(() => import('../AdminCargapp/CargappIntegrations/edit'))
  },
  {
    path: 'admin/permissions',
    component: asyncComponent(() => import('../AdminCargapp/Permissions'))
  },
  {
    path: 'admin/permissions/show/:id',
    component: asyncComponent(() => import('../AdminCargapp/Permissions/show'))
  },
  {
    path: 'admin/permissions_add',
    component: asyncComponent(() => import('../AdminCargapp/Permissions/create'))
  },
  {
    path: 'admin/permissions/:id',
    component: asyncComponent(() => import('../AdminCargapp/Permissions/edit'))
  },
  {
    path: 'admin/cargapp_models',
    component: asyncComponent(() => import('../AdminCargapp/CargappModels'))
  },
  {
    path: 'admin/user_roles',
    component: asyncComponent(() => import('../AdminCargapp/UserRoles'))
  },
  {
    path: 'admin/user_roles/:id',
    component: asyncComponent(() => import('../AdminCargapp/UserRoles/edit'))
  },
  {
    path: 'admin/status',
    component: asyncComponent(() => import('../AdminCargapp/Status'))
  },
  {
    path: 'admin/status/:id',
    component: asyncComponent(() => import('../AdminCargapp/Status/edit'))
  },
  {
    path: 'admin/status_add',
    component: asyncComponent(() => import('../AdminCargapp/Status/create'))
  },
  {
    path: 'admin/status/show/:id',
    component: asyncComponent(() => import('../AdminCargapp/Status/show'))
  },
  {
    path: 'admin/countries',
    component: asyncComponent(() => import('../AdminCargapp/Countries'))
  },
  {
    path: 'admin/countries/:id',
    component: asyncComponent(() => import('../AdminCargapp/Countries/edit'))
  },
  {
    path: 'admin/countries_add',
    component: asyncComponent(() => import('../AdminCargapp/Countries/create'))
  },
  {
    path: 'admin/countries/show/:id',
    component: asyncComponent(() => import('../AdminCargapp/Countries/show'))
  },
  {
    path: 'admin/states',
    component: asyncComponent(() => import('../AdminCargapp/States'))
  },
  {
    path: 'admin/states/:id',
    component: asyncComponent(() => import('../AdminCargapp/States/edit'))
  },
  {
    path: 'admin/states_add',
    component: asyncComponent(() => import('../AdminCargapp/States/create'))
  },
  {
    path: 'admin/cities',
    component: asyncComponent(() => import('../AdminCargapp/Cities'))
  },
  {
    path: 'admin/cities/:id',
    component: asyncComponent(() => import('../AdminCargapp/Cities/edit'))
  },
  {
    path: 'admin/cities_add',
    component: asyncComponent(() => import('../AdminCargapp/Cities/create'))
  },
  {
    path: 'admin/cargapp_models/:id',
    component: asyncComponent(() => import('../AdminCargapp/CargappModels/edit'))
  },
  {
    path: 'admin/cargapp_models_add',
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
    const { url, style } = this.props;
    return (
      <div style={style}>
        {routes.map(singleRoute => {
          const { path, exact, ...otherProps } = singleRoute;
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
