import type { TechnologyDefinition } from '../../types';

export const marketoFormsTechnologyDefinition = {
	id: "marketo-forms",
	name: "Marketo Forms",
	website: "https://www.marketo.com",
	description: "Marketo Forms help create web forms without programming knowledge. Forms can reside on Marketo landing pages and also be embedded on any page of website.",
	icon: "Marketo.svg",
	categories: [
		"widgets-misc",
		"surveys-feedback",
	],
	rules: [
		{
			id: "marketo-forms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("marketo\\.\\w+\\/js\\/forms(?:[\\d.]+)\\/js\\/forms([\\d.]+)\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "marketo-forms:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("v([\\d.]+)\\/js\\/marketo-alt-form\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "marketo-forms:jsGlobal:2",
			kind: "jsGlobal",
			property: "formatMarketoForm",
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
