<script lang="tsx">
import { defineComponent, ref, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { router } from '@/router'
import { MaskCover } from '@/layout/common'

export default defineComponent({
    name: 'Compute',
    setup() {
        const route = useRoute()
        const cover = ref()
        const current = ref<boolean>(route.path === '/login')
        const overlay = computed(() => {
            if (cover.value) {
                return {
                    background: `url('${cover.value}') center center / cover no-repeat`
                }
            }
        })

        const onChange = (path: string) => {
            current.value = !current.value
            router.replace(path)
        }

        return () => (
            <div class="container">
                <MaskCover onChange={e => (cover.value = e?.cover)}></MaskCover>
                <n-el class={{ 'app-compute': true, 'is-active': current.value }}>
                    <div class="app-compute__form is-login">
                        <RouterView name="register"></RouterView>
                    </div>
                    <div class="app-compute__form is-register">
                        <RouterView name="login"></RouterView>
                    </div>
                    <div class="overlay-container">
                        <div class="app-overlay" style={overlay.value}>
                            <div class="app-overlay__panel is-left">
                                <n-space>
                                    <n-button type="info" onClick={() => onChange('/register')}>
                                        注 册
                                    </n-button>
                                    <n-button type="success" onClick={() => router.push('/')}>
                                        返回首页
                                    </n-button>
                                </n-space>
                            </div>
                            <div class="app-overlay__panel is-right">
                                <n-space>
                                    <n-button type="info" onClick={() => onChange('/login')}>
                                        登 录
                                    </n-button>
                                    <n-button type="success" onClick={() => router.push('/')}>
                                        返回首页
                                    </n-button>
                                </n-space>
                            </div>
                        </div>
                    </div>
                </n-el>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.container {
    background: url('@/assets/resource/login-background.jpg') center center / cover no-repeat;
    position: relative;
    min-width: 680px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .app-compute {
        background-color: var(--body-color);
        border-radius: 8px;
        box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25), 0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
        width: 90%;
        max-width: 758px;
        min-width: 640px;
        height: 380px;
        position: relative;
        overflow: hidden;
        z-index: 3;
        :deep(h2) {
            font-size: 22px;
            color: var(--text-color-2);
            text-align: center;
            line-height: 1.5;
            margin: 16px 0;
        }
        &__form {
            height: 100%;
            position: absolute;
            top: 0;
            transition: all 0.6s ease-in-out;
            padding: 0 32px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            &.is-login {
                left: 0;
                width: 50%;
                z-index: 2;
            }
            &.is-register {
                left: 0;
                opacity: 0;
                width: 50%;
            }
            :deep(.antd-submit) {
                height: 40px;
                width: 70%;
                margin: 0 15%;
            }
            :deep(.vc-code) {
                width: 100px;
                height: 34px;
                display: block;
                cursor: pointer;
                object-fit: cover;
                margin-left: 10px;
            }
        }

        .overlay-container {
            height: 100%;
            left: 50%;
            overflow: hidden;
            position: absolute;
            top: 0;
            transition: transform 0.6s ease-in-out;
            width: 50%;
            z-index: 100;
            .app-overlay {
                background: url('@/assets/resource/login-background.jpg') center center / cover no-repeat;
                background-attachment: fixed;
                height: 100%;
                left: -100%;
                position: relative;
                transform: translateX(0);
                transition: transform 0.6s ease-in-out, background 0.3s;
                width: 200%;
                &__panel {
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    justify-content: center;
                    position: absolute;
                    text-align: center;
                    top: 0;
                    transform: translateX(0);
                    transition: transform 0.6s ease-in-out;
                    width: 50%;
                    padding: 0 32px;
                    box-sizing: border-box;
                    &.is-left {
                        transform: translateX(0);
                    }
                    &.is-right {
                        right: 0;
                        transform: translateX(0);
                    }
                }
                :deep(.n-space) {
                    width: 100%;
                    > div {
                        flex: 1;
                    }
                }
                :deep(.n-button) {
                    width: 100%;
                    height: 40px;
                    font-size: 16px;
                }
            }
        }

        &.is-active {
            .is-login {
                opacity: 0;
                transform: translateX(100%);
            }
            .is-register {
                opacity: 1;
                transform: translateX(100%);
                z-index: 5;
            }
            .overlay-container {
                transform: translateX(-100%);
                .app-overlay {
                    transform: translateX(50%);
                    .is-left {
                        transform: translateX(0);
                    }
                    .is-right {
                        transform: translateX(0);
                    }
                }
            }
        }
    }
}
</style>
