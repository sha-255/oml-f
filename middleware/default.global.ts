export default defineNuxtRouteMiddleware(async (to, from) => {
    const session = useSessionStore();
    const router = useRouter();

    const accessToken = computed(() => session.accessToken);

    if (accessToken.value === '' && to.path !== '/start') {
        router.push('/start');
        return;
    }

    const validate = async () => { }
    await validate();
})
