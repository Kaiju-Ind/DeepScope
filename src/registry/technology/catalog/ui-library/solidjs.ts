import type { TechnologyDefinition } from '@/lib/detection/types';

/**
 * SolidJS, the UI library (`solid-js`, `solid-js/web` in 1.x, `@solidjs/web` in 2.x).
 *
 * Server rendering is a library feature, not a SolidStart feature: any Solid SSR
 * host (SolidStart, Astro Solid islands, TanStack Start for Solid, Vike) emits
 * the `_$HY` hydration bootstrap and hydration-key attributes, so those prove
 * SolidJS only. SolidStart has its own markers in `framework/solidstart.ts`.
 *
 * Checked against solid-js 1.9.20, solid-js 2.0.3 and @solidjs/web 2.0.3.
 */
export const solidjsTechnologyDefinition: TechnologyDefinition = {
	id: 'solidjs',
	name: 'SolidJS',
	website: 'https://www.solidjs.com/',
	description:
		"SolidJS is a purely reactive library. It was designed from the ground up with a reactive core. It's influenced by reactive principles developed by previous libraries.",
	icon: 'SolidJS.svg',
	categories: [
		'ui-library',
	],
	rules: [
		{
			id: 'solidjs:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'Solid$$',
			description: 'Solid 1.x development builds set globalThis.Solid$$ to warn about duplicate Solid instances.',
		},
		{
			id: 'solidjs:scriptSrc:1',
			kind: 'scriptSrc',
			pattern: new RegExp('www\\.solidjs\\.com'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'solidjs:dom:2',
			kind: 'dom',
			selector: '[data-hk]',
			description: 'Solid 1.x server rendering writes data-hk hydration keys on rendered elements.',
		},
		{
			id: 'solidjs:jsGlobal:hydration',
			kind: 'jsGlobal',
			property: '_$HY',
			description: 'The Solid server-rendering hydration bootstrap defines window._$HY (Solid 1.x and 2.x).',
		},
		{
			id: 'solidjs:dom:hydration-key-2',
			kind: 'dom',
			selector: '[_hk]',
			description: 'Solid 2.x server rendering writes _hk hydration keys on rendered elements.',
		},
		{
			id: 'solidjs:html:hydration-script',
			kind: 'html',
			pattern: /window\._\$HY\|\|\(e=>\{let t=e=>e&&e\.hasAttribute&&\(e\.hasAttribute\("(?:data-hk|_hk)"\)/,
			description: 'Inline Solid hydration bootstrap emitted by generateHydrationScript.',
		},
		{
			id: 'solidjs:scriptContent:symbols-1',
			kind: 'scriptContent',
			pattern: /Symbol\("solid-(?:proxy|track)"\)/,
			confidence: 90,
			description: 'Solid 1.x runtime creates the solid-proxy and solid-track symbols; their descriptions survive minification.',
		},
		{
			id: 'solidjs:scriptContent:symbols-2',
			kind: 'scriptContent',
			pattern: /Symbol\.for\("solid\.(?:LiveSource|LiveResumeFrom|element-claims|component-binding)"\)/,
			confidence: 90,
			description: 'Solid 2.x runtime registers solid.* global symbols; their keys survive minification.',
		},
		{
			id: 'solidjs:scriptContent:compiled-template',
			kind: 'scriptContent',
			pattern: /\b_tmpl\$\d*\s*=\s*\/\*#__PURE__\*\/\s*_\$template\(/,
			confidence: 80,
			description: 'Unminified output of the Solid JSX compiler (dom-expressions) declares _tmpl$ templates.',
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
