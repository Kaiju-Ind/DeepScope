import type { TechnologyDefinition } from '../../types';

export const enviopackTechnologyDefinition = {
	id: "enviopack",
	name: "Enviopack",
	website: "https://enviopack.com",
	description: "Enviopack is a technological solution designed to optimize ecommerce logistics by improving efficiency and streamlining operational processes.",
	icon: "Enviopack.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "enviopack:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.enviopack\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
