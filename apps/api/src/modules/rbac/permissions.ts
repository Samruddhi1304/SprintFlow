import { Role } from "../../generated/prisma/client.js";
import {
    RESOURCES,
    ACTIONS,
} from "../../constants/permissions.js";

export type Permission = `${string}:${string}`;

const permission = (
    resource: string,
    action: string
): Permission => `${resource}:${action}`;

export const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
    [Role.ADMIN]: [
        permission(RESOURCES.USER, ACTIONS.MANAGE),
        permission(RESOURCES.PROJECT, ACTIONS.MANAGE),
        permission(RESOURCES.SPRINT, ACTIONS.MANAGE),
        permission(RESOURCES.TASK, ACTIONS.MANAGE),
        permission(RESOURCES.BUG, ACTIONS.MANAGE),
    ],

    [Role.PROJECT_MANAGER]: [
        permission(RESOURCES.USER, ACTIONS.READ),
        permission(RESOURCES.PROJECT, ACTIONS.MANAGE),
        permission(RESOURCES.SPRINT, ACTIONS.MANAGE),
        permission(RESOURCES.TASK, ACTIONS.MANAGE),
        permission(RESOURCES.BUG, ACTIONS.READ),
    ],

    [Role.QA]: [
        permission(RESOURCES.PROJECT, ACTIONS.READ),
        permission(RESOURCES.SPRINT, ACTIONS.READ),
        permission(RESOURCES.TASK, ACTIONS.READ),
        permission(RESOURCES.BUG, ACTIONS.MANAGE),
    ],

    [Role.DEVELOPER]: [
        permission(RESOURCES.PROJECT, ACTIONS.READ),
        permission(RESOURCES.SPRINT, ACTIONS.READ),
        permission(RESOURCES.TASK, ACTIONS.READ),
        permission(RESOURCES.TASK, ACTIONS.UPDATE),
        permission(RESOURCES.BUG, ACTIONS.READ),
        permission(RESOURCES.BUG, ACTIONS.UPDATE),
    ],
};