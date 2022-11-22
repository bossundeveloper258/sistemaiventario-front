import { SideNavInterface } from '../../interfaces/side-nav.type';
export const ROUTES: SideNavInterface[] = [
    {
        path: '',
        title: 'Dashboard',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'dashboard',
        submenu: [],
        user: true
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
                title: 'Usuarios', 
                iconType: '', 
                icon: '',
                iconTheme: 'outline',
                submenu: [],
                user: false
            }
        ],
        user: false
    },
    { 
        path: '',
        title: 'Equipos', 
        iconType: 'nzIcon', 
        icon: 'appstore',
        iconTheme: 'outline',
        submenu: [],
        user: true
    }
]    