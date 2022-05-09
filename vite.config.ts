import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
import Vue from '@vitejs/plugin-vue'
import VueJSX from '@vitejs/plugin-vue-jsx'

export default defineConfig({
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
			'@': resolve(__dirname, 'src')
		}
	},
	css: {
		modules: {
			generateScopedName: '[local]___[hash:5]',
			localsConvention: 'camelCase'
		}
	},
	server: {
		port: 3100,
		open: true,
		proxy: {
			['/api']: {
				target: 'https://lisfes.cn',
				ws: true,
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, '')
			}
		}
	}
})
