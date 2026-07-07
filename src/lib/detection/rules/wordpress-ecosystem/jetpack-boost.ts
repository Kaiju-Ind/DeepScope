import type { TechnologyDefinition } from '../../types';

export const jetpackBoostTechnologyDefinition = {
	id: "jetpack-boost",
	name: "Jetpack Boost",
	website: "https://jetpack.com",
	description: "Jetpack Boost – Website Speed, Performance and Critical CSS.",
	icon: "Jetpack.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "jetpack-boost:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/jetpack-boost\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jetpack-boost:dom:1",
			kind: "dom",
			selector: "style[id='jetpack-boost-critical-css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:automattic:jetpack_boost:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
