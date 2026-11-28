import type { TechnologyDefinition } from "../../types.ts";

/**
 * SolidStart, the Solid app framework (`@solidjs/start`).
 *
 * `window._$HY` and hydration keys come from Solid's own server renderer, so
 * they belong to `ui-library/solidjs.ts`; they appear on every Solid SSR page,
 * not only SolidStart ones. These rules use markers SolidStart itself writes.
 *
 * Checked against @solidjs/start 1.5.1 (Vinxi) and 2.2.3 (Vite environments).
 * Both versions target solid-js 1.9.
 */
export const solidstartTechnologyDefinition: TechnologyDefinition = {
	id: 'solidstart',
	name: 'SolidStart',
	website: 'https://start.solidjs.com',
	description: 'SolidStart is the Solid app framework.',
	icon: 'SolidJS.svg',
	categories: [
		'framework',
		'server-runtime-infra',
	],
	rules: [
		{
			id: 'solidstart:dom:client-entry',
			kind: 'dom',
			selector: 'script[type="module"][data-start-url]',
			description: 'SolidStart 2 StartServer renders its client entry script with a data-start-url attribute.',
		},
		{
			id: 'solidstart:html:client-manifest',
			kind: 'html',
			pattern: /window\.manifest\s*=\s*\{[^<]{0,4000}?\/_build\//,
			confidence: 90,
			description: 'SolidStart 1 StartServer inlines the Vinxi client manifest (assets under /_build/) as window.manifest.',
		},
		{
			id: 'solidstart:scriptContent:client-mount',
			kind: 'scriptContent',
			pattern: /["']script\[data-start-url\]["']/,
			confidence: 90,
			description: 'SolidStart 2 client mount reads its entry script through the script[data-start-url] selector.',
		},
		{
			id: 'solidstart:scriptContent:server-function-client',
			kind: 'scriptContent',
			pattern: /["']X-Server-Instance["']/,
			confidence: 85,
			description: 'SolidStart server-function client code sets the X-Server-Instance request header.',
		},
		{
			id: 'solidstart:requestHeader:server-function',
			kind: 'requestHeader',
			key: 'x-server-instance',
			confidence: 90,
			description: 'SolidStart server-function calls send X-Server-Id and X-Server-Instance request headers.',
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		'solidjs',
	],
} as const satisfies TechnologyDefinition;
