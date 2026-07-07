import type { TechnologyDefinition } from '../../types';

export const adenzoTechnologyDefinition = {
	id: "adenzo",
	name: "Adenzo",
	website: "https://www.adenzo.com",
	description: "Adenzo is a B2B sales and marketing platform for managing customer relationships, automating outreach, and analyzing performance to support lead generation and sales operations.",
	icon: "Adenzo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "adenzo:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("live\\.adenzo\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "adenzo:jsGlobal:1",
			kind: "jsGlobal",
			property: "AdenzoTrack",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adenzo:jsGlobal:2",
			kind: "jsGlobal",
			property: "adenzo_contact_id",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
