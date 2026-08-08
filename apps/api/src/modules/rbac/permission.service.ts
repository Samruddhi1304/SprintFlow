import type { Role } from "../../generated/prisma/client.js";
import { ROLE_PERMISSIONS } from "./permissions.js";

export const hasPermission = (
    role: Role,
    resource: string,
    action: string
): boolean => {
    const permissions = ROLE_PERMISSIONS[role];

    if (!permissions) {
        return false;
    }

    return (
        permissions.includes(`${resource}:${action}`) ||
        permissions.includes(`${resource}:manage`)
    );
};