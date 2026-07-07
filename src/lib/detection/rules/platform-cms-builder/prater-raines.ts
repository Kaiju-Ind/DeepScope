import type { TechnologyDefinition } from '../../types';

export const praterRainesTechnologyDefinition = {
	id: "prater-raines",
	name: "Prater Raines",
	website: "https://praterraines.co.uk",
	description: "Prater Raines is a platform for website and systems development.",
	icon: "PraterRaines.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "prater-raines:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("statistics\\.praterraines\\.co\\.uk"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
