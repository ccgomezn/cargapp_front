const importantVariables = {
        load_generator_role_id: 15,
        vehicle_admin_role_id: 27,
        generator_role_id: 15,
    conveyor_role_id: 34,
        user_role_id: 12,
        admin_role_id: 24,
        activeOptions: [
            {key: true, label: 'Activado'},
            {key: false, label: 'Desactivado'}
        ],
        status_road_service_map: {
            PendingForApproval: 'Waiting',
            Waiting: 'RoadToLoad',
            RoadToLoad: 'LoadingUp',
            LoadingUp: 'OnRoad',
            OnRoad: 'Unloading',
            Unloading: 'Closed'
        }
    }
;

export default importantVariables;

