import type { TechnologyDefinition } from '../../types';

export const vitrinMeTechnologyDefinition = {
	id: "vitrin-me",
	name: "Vitrin.me",
	website: "https://vitrin.me",
	description: "Vitrin.me is a no-code platform that lets anyone build web apps without writing any code.",
	icon: "Vitrin.me.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vitrin-me:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.vitrin\\.me\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"django",
		"next-js",
		"python",
		"react",
	],
} as const satisfies TechnologyDefinition;
