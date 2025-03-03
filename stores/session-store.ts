import { defineStore } from 'pinia';

export const ENDPOINT = '88.151.117.181:30001';
export const PREFIX = 'api';

export const useSessionStore = defineStore('session', () => {
    const accessToken = useCookie('access-token', {
        default: () => ''
    });

    const logIn = async (email: string, password: string) => {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            email,
            password
        });

        try {
            return await $fetch(`${ENDPOINT}/${PREFIX}/login`, {
                method: 'POST',
                headers: myHeaders,
                body: raw
            });
        } catch (error) {
            console.error(error);
        };
    }

    const register = async (name: string, surname: string, email: string, password: string) => {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            name,
            surname,
            email,
            password
        });

        try {
            return await $fetch(`${ENDPOINT}/${PREFIX}/register`, {
                method: 'POST',
                headers: myHeaders,
                body: raw
            });
        } catch (error) {
            console.error(error);
        };
    }

    return {
        accessToken,
        logIn,
        register
    }
});
