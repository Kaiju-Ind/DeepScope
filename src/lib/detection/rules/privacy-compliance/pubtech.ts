import type { TechnologyDefinition } from '../../types';

export const pubtechTechnologyDefinition = {
	id: "pubtech",
	name: "PubTech",
	website: "https://www.pubtech.ai/",
	description: "PubTech is a consent management platform helping brands and businesses collect, store and leverage their customer consents.",
	icon: "PubTech.png",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "pubtech:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pubtech-cmp-v(.+?)(?:-esm)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pubtech:jsGlobal:1",
			kind: "jsGlobal",
			property: "__pub_tech_cmp_config",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
