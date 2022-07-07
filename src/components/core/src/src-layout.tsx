import type { MenuOption } from 'naive-ui'
import { onMounted, computed } from 'vue'
import { useState } from '@/hooks/hook-state'
import { useProvider } from '@/hooks/hook-provider'
import { useAppStore } from '@/store/modules/app-store'
import { useDvcStore } from '@/store/modules/dvc-store'
import { router } from '@/router'
import { useClient } from '@/utils/utils-instance'
import { createComponent } from '@/utils/utils-app'

export function fetchSider() {
    const { el, mounte, unmount } = createComponent({
        name: 'FetchSider',
        setup() {
            const { state, setState } = useState({
                visible: false
            })
            const { client } = useClient()
            const { vars, inverted } = useProvider()
            const app = useAppStore()
            const dvc = useDvcStore()
            const color = computed(() => {
                if (dvc.theme === 'dark' || dvc.inverted === 'dark' || dvc.inverted === 'nav-dark') {
                    return 'rgb(24, 24, 28)'
                }
                return vars.value.cardColor
            })
            const done = client.observer.on('resize', e => {
                if (e?.device !== 'MOBILE') {
                    setState({ visible: false })
                }
            })
            const onSelecter = (path: string) => {
                setState({ visible: false }).then(() => {
                    if (app.current !== path) {
                        router.push(path)
                    }
                })
            }

            onMounted(() => setState({ visible: true }))

            return () => (
                <n-drawer to={el} v-model:show={state.visible} width={220} placement="left" onAfterLeave={unmount}>
                    <n-drawer-content
                        body-content-style={{ padding: 0, backgroundColor: color.value }}
                        header-style={{ display: 'none' }}
                    >
                        <n-menu
                            accordion
                            inverted={inverted.value.aside}
                            root-indent={18}
                            value={app.current}
                            expanded-keys={app.expanded}
                            collapsed={false}
                            collapsed-width={64}
                            options={app.router as Array<MenuOption>}
                            on-update-value={onSelecter}
                            onUpdateExpanded-keys={(keys: string[]) => app.setExpanded(keys)}
                        ></n-menu>
                    </n-drawer-content>
                </n-drawer>
            )
        }
    })

    mounte().catch(e => {
        console.log(e)
    })
}
