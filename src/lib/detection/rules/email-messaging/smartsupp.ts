import type { TechnologyDefinition } from '../../types';

export const smartsuppTechnologyDefinition = {
	id: "smartsupp",
	name: "Smartsupp",
	website: "https://www.smartsupp.com",
	description: "Smartsupp is a live chat tool that offers visitor recording feature.",
	icon: "Smartsupp.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "smartsupp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.smartsuppchat\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "smartsupp:jsGlobal:1",
			kind: "jsGlobal",
			property: "$smartsupp.options.widgetVersion",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "smartsupp:jsGlobal:2",
			kind: "jsGlobal",
			property: "smartsupp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
