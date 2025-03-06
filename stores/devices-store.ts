import { defineStore } from 'pinia';

export const useDevicesStore = defineStore('devices', () => {
    const session = useSessionStore();
    const config = useRuntimeConfig();
    const accessToken = computed(() => session.accessToken);

    const data = ref([]);

    const getData = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken.value}`);

        try {
            const result = await $fetch(`${config.public.endpoint}/api/devices`, {
                method: "GET",
                headers: myHeaders,
            });
            if (result?.data) {
                data.value = result.data;
            } else {
                session.logOut();
            }
            return result;
        } catch (error) {
            session.logOut();
            console.error(error);
        };
    }

    const add = async (data: { name: string, location: string, type: string }) => {
        const { name, location, type } = data;
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken.value}`);

        const raw = JSON.stringify({
            name,
            location,
            type
        });

        try {
            const result = await $fetch(`${config.public.endpoint}/api/devices`, {
                method: "POST",
                headers: myHeaders,
                body: raw,
            });
            if (result?.data) {
                return result.data;
            } else {
                session.logOut();
            }
            return result;
        } catch (error) {
            session.logOut();
            console.error(error);
        };
    }

    const update = async (id: number, data: { name: string, location: string, type: string }) => {
        const { name, location, type } = data;
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken.value}`);

        const raw = JSON.stringify({
            name,
            location,
            type
        });

        try {
            const result = await $fetch(`${config.public.endpoint}/api/devices/${id}`, {
                method: "PATCH",
                headers: myHeaders,
                body: raw
            });
            if (result?.data) {
                return result.data;
            } else {
                session.logOut();
            }
            return result;
        } catch (error) {
            session.logOut();
            console.error(error);
        };
    }

    const remove = async (id: number) => {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken.value}`);

        try {
            const result = await $fetch(`${config.public.endpoint}/api/devices/${id}`, {
                method: "DELETE",
                headers: myHeaders
            });
            console.log(result);
            return result;
        } catch (error) {
            session.logOut();
            console.error(error);
        };
    }

    return {
        data,
        getData,
        add,
        update,
        remove
    }
});
