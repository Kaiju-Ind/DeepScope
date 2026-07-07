import type { TechnologyDefinition } from '../../types';

export const ezlynxTechnologyDefinition = {
	id: "ezlynx",
	name: "EZLynx",
	website: "https://www.ezlynx.com",
	description: "EZLynx is a cloud-based software offering real-time comparative insurance rating, integrating with over 330 carriers for automated quoting and policy management​.",
	icon: "EZLynx.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "ezlynx:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ezlynx\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ezlynx:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^EZLynx$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "ezlynx:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^ezlynx$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
