export const environment = {
    production: true,
    sessionDuration: '2h',
    services: {
        core: 'http://core-service.proyecto-gps.svc.cluster.local',
        clinical: 'http://clinical-service.proyecto-gps.svc.cluster.local',
        nutrition: 'http://nutrition-service.proyecto-gps.svc.cluster.local',
        odonto: 'http://odonto-service.proyecto-gps.svc.cluster.local',
        patient: 'http://patient-service.proyecto-gps.svc.cluster.local',
        pharmacy: 'http://pharmacy-service.proyecto-gps.svc.cluster.local',
        vaccination: 'http://vaccination-service.proyecto-gps.svc.cluster.local'
    }
};
