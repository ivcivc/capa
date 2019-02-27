import store from './store'
window.store = store

export function getRole(role) {
    const roles = store.state.user.roles
    if (!roles) {
        return false
    }
    if (roles.includes('administrator')) {
        return true
    }

    return roles.includes(role)
}

export function getPermition(permition) {
    if (getRole('administrator')) {
        return true
    }
    const permissions = store.state.user.permissions
    if (!permissions) {
        return false
    }

    return permissions.includes(permition)
}

export default { getRole, getPermition }
