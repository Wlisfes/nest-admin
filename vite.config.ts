import { defineConfig, loadEnv, UserConfig, ConfigEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
import Vue from '@vitejs/plugin-vue'
import VueJSX from '@vitejs/plugin-vue-jsx'

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
	const root = process.cwd()
	const env = loadEnv(mode, root)

	return {
		plugins: [
			Vue(),
			VueJSX(),
			AutoImport({
				resolvers: [NaiveUiResolver()]
			}),
			Components({
				dts: true,
				dirs: ['src/components'],
				resolvers: [NaiveUiResolver()]
			})
		],
		resolve: {
			alias: {
				'@': resolve(process.cwd(), 'src')
			}
		},
		css: {
			modules: {
				generateScopedName: '[local]___[hash:5]',
				localsConvention: 'camelCase'
			}
		},
		server: {
			port: Number(env.VITE_PORT),
			open: true,
			proxy: {
				[env.VITE_API_BASE]: {
					target: env.VITE_API_TARGET,
					ws: true,
					changeOrigin: true,
					rewrite: path => path.replace(new RegExp(`^${env.VITE_API_BASE}`), '')
				}
			}
		}
	}
})
