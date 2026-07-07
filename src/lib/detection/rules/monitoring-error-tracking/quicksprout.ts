import type { TechnologyDefinition } from '../../types';

export const quicksproutTechnologyDefinition = {
	id: "quicksprout",
	name: "Quicksprout",
	website: "https://www.quicksprout.com",
	description: "Quicksprout is a website optimization service focused on improving site performance and user engagement.",
	icon: "Quicksprout.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "quicksprout:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.quicksprout\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "quicksprout:jsGlobal:1",
			kind: "jsGlobal",
			property: "_QS.CDN",
			valuePattern: new RegExp("cdn\\.quicksprout\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
