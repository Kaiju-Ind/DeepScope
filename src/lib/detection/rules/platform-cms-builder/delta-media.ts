import type { TechnologyDefinition } from '../../types';

export const deltaMediaTechnologyDefinition = {
	id: "delta-media",
	name: "Delta Media",
	website: "https://www.deltamediagroup.com",
	description: "Delta Media is a provider of websites designed for real estate agents and brokers.",
	icon: "DeltaMedia.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "delta-media:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("online\\.deltaagentsites\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
