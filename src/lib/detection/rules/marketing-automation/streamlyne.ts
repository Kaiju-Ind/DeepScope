import type { TechnologyDefinition } from '../../types';

export const streamlyneTechnologyDefinition = {
	id: "streamlyne",
	name: "Streamlyne",
	website: "https://streamlyne.io",
	description: "Streamlyne is a platform that provides tools and services for managing, optimizing, and automating online marketing activities across multiple digital channels.",
	icon: "Streamlyne.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "streamlyne:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.streamlyne\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
