export const environment = {
    production: true,
    sessionDuration: '2h',
    services: {
        core: 'http://core-service.proyecto-gps.svc.cluster.local:3001',
        clinical: 'http://clinical-service.proyecto-gps.svc.cluster.local:3002',
        nutrition: 'http://nutrition-service.proyecto-gps.svc.cluster.local:3003',
        odonto: 'http://odonto-service.proyecto-gps.svc.cluster.local:3004',
        patient: 'http://patient-service.proyecto-gps.svc.cluster.local:3005',
        pharmacy: 'http://pharmacy-service.proyecto-gps.svc.cluster.local:3006',
        vaccination: 'http://vaccination-service.proyecto-gps.svc.cluster.local:3007'
    }
};
