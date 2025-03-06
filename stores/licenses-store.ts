import { defineStore } from 'pinia';

export const useLicensesStore = defineStore('licenses', () => {
    const session = useSessionStore();
    const config = useRuntimeConfig();
    const accessToken = computed(() => session.accessToken);

    const data = ref([]);

    const getData = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken.value}`);

        try {
            const result = await $fetch(`${config.public.endpoint}/api/licenses`, {
                method: "GET",
                headers: myHeaders,
            });
            if (result?.data) {
                const normalize = result?.data?.map((value) => ({
                    id: value?.id,
                    software: {
                        id: value?.software?.id,
                        name: value?.software?.name,
                        description: value?.software?.description,
                        vendor: value?.software?.vendor,
                        daysBeforeWarning: value?.software['days_before_warning']
                    },
                    device: value?.device,
                    key: value?.key,
                    startDate: value['start_date'],
                    endDate: value['end_date'],
                    cost: value?.cost,
                    isActive: value['is_active']
                }));
                data.value = normalize as [];
            } else {
                session.logOut();
            }
            return result;
        } catch (error) {
            session.logOut();
            console.error(error);
        };
    }

    const add = async (data: { softwareId: number, deviceId: number, key: string, startDate: string, endDate: string, cost: string, isActive: boolean }) => {
        const { softwareId, deviceId, key, startDate, endDate, cost, isActive } = data;
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken.value}`);

        const raw = JSON.stringify({
            "software_id": softwareId,
            "device_id": deviceId,
            key,
            "start_date": startDate,
            "end_date": endDate,
            cost,
            "is_active": isActive
        });

        try {
            const result = await $fetch(`${config.public.endpoint}/api/licenses`, {
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

    const update = async (id: number, data: { softwareId: number, deviceId: number, key: string, startDate: string, endDate: string, cost: string, isActive: boolean }) => {
        const { softwareId, deviceId, key, startDate, endDate, cost, isActive } = data;
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken.value}`);

        const raw = JSON.stringify({
            'software_id': softwareId,
            "device_id": deviceId,
            key,
            "start_date": startDate,
            "end_date": endDate,
            cost,
            "is_active": isActive
        });

        try {
            const result = await $fetch(`${config.public.endpoint}/api/licenses/${id}`, {
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
            const result = await $fetch(`${config.public.endpoint}/api/licenses/${id}`, {
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
