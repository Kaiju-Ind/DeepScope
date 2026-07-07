import type { TechnologyDefinition } from '../../types';

export const recurlyTechnologyDefinition = {
	id: "recurly",
	name: "Recurly",
	website: "https://recurly.com",
	description: "Recurly provides enterprise-class subscription billing and recurring payment management for thousands of businesses worldwide.",
	icon: "Recurly.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "recurly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.recurly\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "recurly:html:1",
			kind: "html",
			pattern: new RegExp("<input[^>]+data-recurly"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "recurly:jsGlobal:2",
			kind: "jsGlobal",
			property: "recurly.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "recurly:dom:3",
			kind: "dom",
			selector: "input[data-recurly]",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
