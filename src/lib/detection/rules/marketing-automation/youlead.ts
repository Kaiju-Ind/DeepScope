import type { TechnologyDefinition } from '../../types';

export const youleadTechnologyDefinition = {
	id: "youlead",
	name: "YouLead",
	website: "https://www.youlead.pl",
	description: "YouLead is a sales and marketing automation system from Poland that helps businesses manage leads, streamline customer engagement, and optimize marketing workflows through integrated digital tools.",
	icon: "YouLead.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "youlead:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.youlead\\.pl"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "youlead:jsGlobal:1",
			kind: "jsGlobal",
			property: "YouLeadDynamicContent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "youlead:jsGlobal:2",
			kind: "jsGlobal",
			property: "YouLeadHtmlBlocks",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
