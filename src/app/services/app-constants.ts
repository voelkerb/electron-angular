
export interface NavLink {
    path: string;
    label: string;
    icon: string;
}

export const CONFIG_LINK:NavLink = {path: 'config', label: 'CONFIG.TITLE', icon: 'tune'};
export const MANAGE_LINK:NavLink = {path: 'manage', label: 'MANAGE.TITLE', icon: 'assignment'};
export const PROCESS_DATA_LINK:NavLink = {path: 'processData', label: 'PROCESS.TITLE', icon: 'bar_chart'};
export const SETTINGS_LINK:NavLink = {path: 'appSettings', label: 'SETTINGS.TITLE', icon: 'settings'};
