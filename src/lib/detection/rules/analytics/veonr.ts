import type { TechnologyDefinition } from '../../types';

export const veonrTechnologyDefinition = {
	id: "veonr",
	name: "Veonr",
	website: "https://veonr.com",
	description: "Veonr is an analytics and tracking suite designed for business websites, offering tools to monitor site activities and optimize conversions.",
	icon: "Veonr.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "veonr:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.fsb\\.veonr\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
