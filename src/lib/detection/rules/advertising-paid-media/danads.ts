import type { TechnologyDefinition } from '../../types';

export const danadsTechnologyDefinition = {
	id: "danads",
	name: "DanAds",
	website: "https://danads.com",
	description: "DanAds is an infrastructure platform that enables customization and automation of ad sales, operations, and creative management.",
	icon: "DanAds.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "danads:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("danads-event"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
