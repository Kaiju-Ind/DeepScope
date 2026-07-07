import type { TechnologyDefinition } from '../../types';

export const yaplaTechnologyDefinition = {
	id: "yapla",
	name: "Yapla",
	website: "https://www.yapla.com",
	description: "Yapla is a web-based software platform that provides event management and fundraising solutions for non-profit organisations, associations, and event planners.",
	icon: "Yapla.png",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "yapla:dom:0",
			kind: "dom",
			selector: "a[href*='\\.yapla\\.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "yapla:jsGlobal:1",
			kind: "jsGlobal",
			property: "yaplaConsent.cookieName",
			valuePattern: new RegExp("yapla-consent"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yapla:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Yapla\\sv([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "yapla:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^yapla\\sv([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
