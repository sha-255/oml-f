export default defineNuxtPlugin(() => {
    onNuxtReady(async () => {
        await useSoftwareStore().getData();
        await useDevicesStore().getData();
        await useLicensesStore().getData();
    })
})