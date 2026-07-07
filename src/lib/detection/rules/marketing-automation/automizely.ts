import type { TechnologyDefinition } from '../../types';

export const automizelyTechnologyDefinition = {
	id: "automizely",
	name: "Automizely",
	website: "https://www.automizely.com/marketing",
	description: "Automizely creates and manages enterprise-level marketing automation systems including contact and CRM mappings, lead funnels, email nurture, lead-generating pages, and blog posts, and website integrations.",
	icon: "Automizely.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "automizely:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.automizely\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "automizely:jsGlobal:1",
			kind: "jsGlobal",
			property: "AM_CONSENT_SDK.product",
			valuePattern: new RegExp("automizely"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "automizely:jsGlobal:2",
			kind: "jsGlobal",
			property: "amStorefrontKit.hRequestEventTarget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "automizely:jsGlobal:3",
			kind: "jsGlobal",
			property: "automizelyConversions",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
