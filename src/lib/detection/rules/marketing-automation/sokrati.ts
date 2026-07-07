import type { TechnologyDefinition } from '../../types';

export const sokratiTechnologyDefinition = {
	id: "sokrati",
	name: "Sokrati",
	website: "https://sokrati.com",
	description: "Sokrati is a digital marketing platform designed to support ecommerce businesses.",
	icon: "Sokrati.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "sokrati:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("chuknu\\.sokrati\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
