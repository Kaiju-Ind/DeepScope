import type { TechnologyDefinition } from '../../types';

export const yolaTechnologyDefinition = {
	id: "yola",
	name: "Yola",
	website: "https://www.yola.com",
	description: "Yola is a website builder and website hosting company headquartered in San Francisco.",
	icon: "Yola.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "yola:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.yola(?:cdn)?\\.(?:net|com)\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yola:dom:1",
			kind: "dom",
			selector: "script[data-url*='.yolacdn.net/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
