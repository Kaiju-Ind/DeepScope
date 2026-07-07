import type { TechnologyDefinition } from '../../types';

export const cosmedcloudTechnologyDefinition = {
	id: "cosmedcloud",
	name: "Cosmedcloud",
	website: "https://www.cosmedcloud.com",
	description: "Cosmedcloud is cloud-based practice management software tailored for cosmetic and aesthetic medicine clinics.",
	icon: "CosmedCloud.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "cosmedcloud:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.cosmedcloud\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
