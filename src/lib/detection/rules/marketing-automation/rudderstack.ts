import type { TechnologyDefinition } from '../../types';

export const rudderstackTechnologyDefinition = {
	id: "rudderstack",
	name: "Rudderstack",
	website: "https://rudderstack.com/",
	description: "Rudderstack is a customer data platform (CDP) that helps you collect, clean, and control your customer data.",
	icon: "Rudderstack.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "rudderstack:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.rudderlabs\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rudderstack:jsGlobal:1",
			kind: "jsGlobal",
			property: "rudderanalytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "rudderstack:scriptContent:global-queue",
			kind: "scriptContent",
			pattern: new RegExp("window\\.rudderanalytics|\\brudderanalytics\\.(?:load|track|identify|page|group|alias)\\b", "i"),
			confidence: 80,
			description: "Bundled script content initializes or calls the RudderStack analytics queue.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
