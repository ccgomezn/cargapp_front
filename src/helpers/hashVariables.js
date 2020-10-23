const importantVariables = {
        load_generator_role_id: 15,
        vehicle_admin_role_id: 27,
        generator_role_id: 15,
        conveyor_role_id: 34,
        user_role_id: 12,
        admin_role_id: 24,
        sub_admin_role_id: 28,
        activeOptions: [
            {key: true, label: 'Activado'},
            {key: false, label: 'Desactivado'}
        ],
        status_road_service_map: {
            PendingForApproval: {next: 'RoadToLoad'},
            Waiting: {next: 'RoadToLoad', id: 0},
            RoadToLoad: {next: 'LoadingUp', id: 1},
            LoadingUp: {next: 'OnRoad', id: 2},
            OnRoad: {next: 'Unloading', id: 3},
            Unloading: {next: 'Closed', id: 4},
            Closed: {next: null, id: 5}
        },

    }
;

export default importantVariables;

