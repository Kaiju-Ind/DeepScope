import type { TechnologyDefinition } from '../../types';

export const strolidTechnologyDefinition = {
	id: "strolid",
	name: "Strolid",
	website: "https://strolid.com",
	description: "Strolid is an automotive BDC that integrates with various industry CRMs, enabling dealerships to automate workflows.",
	icon: "Strolid.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "strolid:jsGlobal:0",
			kind: "jsGlobal",
			property: "STROLID.strolid_chat_widget_url",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
