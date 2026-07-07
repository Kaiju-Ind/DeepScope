import type { TechnologyDefinition } from '../../types';

export const sleeknoteTechnologyDefinition = {
	id: "sleeknote",
	name: "Sleeknote",
	website: "https://sleeknote.com",
	description: "Sleeknote is a cloud-based software that helps online businesses reach conversion goals through website popups.",
	icon: "Sleeknote.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "sleeknote:jsGlobal:0",
			kind: "jsGlobal",
			property: "SleekNote.SleekNotes",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sleeknote:jsGlobal:1",
			kind: "jsGlobal",
			property: "sleeknoteMarketingConsent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sleeknote:jsGlobal:2",
			kind: "jsGlobal",
			property: "sleeknoteScriptTag",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sleeknote:jsGlobal:3",
			kind: "jsGlobal",
			property: "sleeknoteSiteData",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
