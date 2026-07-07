import type { TechnologyDefinition } from '../../types';

export const influensterTechnologyDefinition = {
	id: "influenster",
	name: "Influenster",
	website: "https://www.influenster.com",
	description: "Influenster is a product reviews widget that displays feedback and ratings from shoppers on websites.",
	icon: "Influenster.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "influenster:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.influenster\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "influenster:jsGlobal:1",
			kind: "jsGlobal",
			property: "showInfluensterWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
