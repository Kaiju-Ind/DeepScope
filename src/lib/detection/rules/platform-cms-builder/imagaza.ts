import type { TechnologyDefinition } from '../../types';

export const imagazaTechnologyDefinition = {
	id: "imagaza",
	name: "iMagaza",
	website: "https://imagaza.net",
	description: "iMagaza is an ecommerce website system from Turkey.",
	icon: "iMagaza.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "imagaza:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("connect\\.imagaza\\.net\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
