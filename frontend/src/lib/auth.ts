export function getToken() {

    if (typeof window === "undefined") {

        return null;

    }

    return localStorage.getItem("token");

}

export function getRole() {

    if (typeof window === "undefined") {

        return null;

    }

    return localStorage.getItem("role");

}

export function isAdmin() {

    return getRole() === "admin";

}

export function isLoggedIn() {

    return !!getToken();

}