import { defineStore } from 'pinia';

export const useSoftwareStore = defineStore('software', () => {
    const session = useSessionStore();
    const config = useRuntimeConfig();
    const accessToken = computed(() => session.accessToken);

    const data = ref([]);

    const getData = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken.value}`);

        try {
            const result = await $fetch(`${config.public.endpoint}/api/software`, {
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
            console.error(error);
        };
    }

    const add = async (data: { name: string, description: string, vendor: string, daysBeforeWarning: number }) => {
        const { name, description, vendor, daysBeforeWarning } = data;
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken.value}`);

        const raw = JSON.stringify({
            name,
            description,
            vendor,
            "days_before_warning": daysBeforeWarning
        });

        try {
            const result = await $fetch(`${config.public.endpoint}/api/software`, {
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
            console.error(error);
        };
    }

    const update = async (id: number, data: { name: string, description: string, vendor: string, daysBeforeWarning: number }) => {
        const { name, description, vendor, daysBeforeWarning } = data;
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken.value}`);

        const raw = JSON.stringify({
            name,
            description,
            vendor,
            "days_before_warning": daysBeforeWarning
        });

        try {
            const result = await $fetch(`${config.public.endpoint}/api/software/${id}`, {
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
            console.error(error);
        };
    }

    const remove = async (id: number) => {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken.value}`);

        try {
            const result = await $fetch(`${config.public.endpoint}/api/software/${id}`, {
                method: "DELETE",
                headers: myHeaders
            });
            console.log(result);
            return result;
        } catch (error) {
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