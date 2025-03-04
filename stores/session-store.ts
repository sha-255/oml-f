import { defineStore } from 'pinia';

export const useSessionStore = defineStore('session', () => {
    const config = useRuntimeConfig();
    const ENDPOINT = config.public.endpoint;
    const PREFIX = 'api';
    const accessToken = useCookie('access-token', {
        default: () => ''
    });

    const logIn = async (data: { email: string, password: string }) => {
        const { email, password, } = data;
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            email,
            password
        });

        try {
            const result = await $fetch(`${ENDPOINT}/${PREFIX}/login`, {
                method: 'POST',
                headers: myHeaders,
                body: raw
            });
            if (result) {
                if ('token' in result) {
                    const dto = result as {
                        token: string,
                        "token_type": string
                    }
                    accessToken.value = dto.token;
                    return dto;
                }
            }
        } catch (error) {
            console.error(error);
        };
    }

    const register = async (data: { name: string, surname: string, email: string, password: string }) => {
        const { name, surname, email, password } = data;
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
            const result = await $fetch(`${ENDPOINT}/${PREFIX}/register`, {
                method: 'POST',
                headers: myHeaders,
                body: raw
            });
            if (result) {
                if ('token' in result) {
                    const dto = result as {
                        token: string,
                        "token_type": string
                    }
                    accessToken.value = dto.token;
                    return dto;
                }
            }
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
