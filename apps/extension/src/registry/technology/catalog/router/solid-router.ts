import type { TechnologyDefinition } from '@/lib/detection/types';

/**
 * Solid Router (`@solidjs/router`).
 *
 * The earlier rules matched words such as `DEVCOMP`, `DEV_EXPRESSION`,
 * `handleRouterError(` and `createMemo({equals:!1}` that appear in Solid core
 * and unrelated bundles. These use invariant and error strings that minifiers
 * keep. Checked against @solidjs/router 0.15.4 (Solid 1) and 2.0.1 (Solid 2).
 */
export const solidRouterTechnologyDefinition: TechnologyDefinition = {
	id: 'solid-router',
	name: 'Solid Router',
	website: 'https://docs.solidjs.com/solid-router',
	description: 'Solid Router is the universal router for SolidJS, with nested routes, data loading and actions.',
	categories: [
		'router',
	],
	rules: [
		{
			id: 'solid-router:scriptContent:route-invariant',
			kind: 'scriptContent',
			pattern: /<A> and 'use' router primitives can be only used inside a Route\./,
			confidence: 95,
			description: 'Bundled Solid Router invariant message for primitives used outside a Route.',
		},
		{
			id: 'solid-router:scriptContent:actions',
			kind: 'scriptContent',
			pattern: /Only POST forms are supported for Actions|Client Actions need explicit names if server rendered/,
			confidence: 80,
			description: 'Bundled Solid Router action error messages.',
		},
		{
			id: 'solid-router:scriptContent:package',
			kind: 'scriptContent',
			pattern: /\[@solidjs\/router\] |["']solid-router:scroll(?:-auto)?["']|Symbol\("solid-router\.serverRoute"\)/,
			confidence: 90,
			description: 'Bundled Solid Router 2 warning prefix, scroll state keys, or server-route symbol.',
		},
		{
			id: 'solid-router:resourceUrl:package-dist',
			kind: 'resourceUrl',
			pattern: new RegExp('@solidjs[\\\\/]router(?:@[^/]+)?[\\\\/]dist[\\\\/][^/]+\\.(?:cjs|mjs|js|jsx)(?:[?#].*)?$'),
			description: 'Resource URL loads a file from the @solidjs/router package distribution.',
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		'solidjs',
	],
} as const satisfies TechnologyDefinition;
