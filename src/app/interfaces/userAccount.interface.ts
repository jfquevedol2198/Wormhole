export interface IUserAccount {
    userAccountId: number;
    name: string;
    apiKey: string;
    lastAccess: string;
    disabled: boolean;
    locked: boolean;
    userAccountRoles: IUserAccountRole[];
}

export interface IUserAccountRole {
    userAccountRoleId: number;
    userAccountId: number;
    userRoleId: number;
    userRole: IUserRole;
}

export interface IUserRole {
    userRoleId: number;
    userRoleName: string;
    userAccountRoles: string[];
}
