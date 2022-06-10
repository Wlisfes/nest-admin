<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { onEnter } from '@/router'

export default defineComponent({
    name: 'Compute',
    setup() {
        const route = useRoute()
        const current = ref<boolean>(route.path === '/login')

        const onChange = (path: string) => {
            current.value = !current.value
            onEnter(path)
        }

        return () => (
            <div class="container">
                <n-el class={{ 'app-compute': true, 'is-active': current.value }}>
                    <div class="app-compute__form is-login">
                        <RouterView name="register"></RouterView>
                    </div>
                    <div class="app-compute__form is-register">
                        <RouterView name="login"></RouterView>
                    </div>
                    <div class="overlay-container">
                        <div class="app-overlay">
                            <div class="app-overlay__panel is-left">
                                <n-button type="info" round onClick={() => onChange('/register')}>
                                    注 册
                                </n-button>
                            </div>
                            <div class="app-overlay__panel is-right">
                                <n-button type="info" round onClick={() => onChange('/login')}>
                                    登 录
                                </n-button>
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
        &__form-title {
            font-size: 24px;
            color: #000000;
            text-align: center;
            margin: 20px 0;
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
                height: 40px;
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
                transition: transform 0.6s ease-in-out;
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
                        transform: translateX(-20%);
                    }
                    &.is-right {
                        right: 0;
                        transform: translateX(0);
                    }
                }
                :deep(.n-button) {
                    height: 40px;
                    width: 70%;
                    margin: 0 15%;
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
                        transform: translateX(20%);
                    }
                }
            }
        }
    }
}
</style>
