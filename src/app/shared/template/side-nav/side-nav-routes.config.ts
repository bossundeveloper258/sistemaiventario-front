import { SideNavInterface } from '../../interfaces/side-nav.type';
export const ROUTES: SideNavInterface[] = [
    {
        path: '',
        title: 'Dashboard',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'dashboard',
        submenu: [],
        role:[1,2]
    },
    {
        path: '',
        title: 'Mantenimiento',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'appstore',
        submenu: [
            { 
                path: 'maintenances/users',
                title: 'Field service', 
                iconType: '', 
                icon: '',
                iconTheme: 'outline',
                submenu: [],
                role:[1]
            }
        ],
        role:[1]
    },
    {
        path: '',
        title: 'Negocios',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'dashboard',
        submenu: [
            { 
                path: 'maintenances/businesses',
                title: 'Empresas', 
                iconType: '', 
                icon: '',
                iconTheme: 'outline',
                submenu: [],
                role:[1]
            },
            { 
                path: 'maintenances/sedes',
                title: 'Sedes', 
                iconType: '', 
                icon: '',
                iconTheme: 'outline',
                submenu: [],
                role:[1]
            },
            { 
                path: 'maintenances/areas',
                title: 'Areas', 
                iconType: '', 
                icon: '',
                iconTheme: 'outline',
                submenu: [],
                role:[1]
            },
            { 
                path: 'negocios/costcenters',
                title: 'Centro Costo', 
                iconType: '', 
                icon: '',
                iconTheme: 'outline',
                submenu: [],
                role:[1]
            },
            { 
                path: 'maintenances/employees',
                title: 'Empleados', 
                iconType: '', 
                icon: '',
                iconTheme: 'outline',
                submenu: [],
                role:[1,2]
            }
        ],
        role:[1,2]
    },
    { 
        path: '',
        title: 'Activos', 
        iconType: 'nzIcon', 
        icon: 'appstore',
        iconTheme: 'outline',
        submenu: [
            { 
                path: 'activos/computers',
                title: 'Computo', 
                iconType: '', 
                icon: '',
                iconTheme: 'outline',
                submenu: [],
                role:[1,2]
            }
        ],
        role:[1,2]
    }
]    