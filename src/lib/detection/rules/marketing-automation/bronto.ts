import type { TechnologyDefinition } from '../../types';

export const brontoTechnologyDefinition = {
	id: "bronto",
	name: "Bronto",
	website: "https://bronto.com",
	description: "Bronto is a cloud-based email marketing automation software.",
	icon: "Bronto.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "bronto:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:snip|cdn)\\.bronto\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bronto:jsGlobal:1",
			kind: "jsGlobal",
			property: "BrontoShopify",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bronto:jsGlobal:2",
			kind: "jsGlobal",
			property: "bronto.versions.sca",
			valuePattern: new RegExp("(.+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bronto:jsGlobal:3",
			kind: "jsGlobal",
			property: "brontoCookieConsent",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
