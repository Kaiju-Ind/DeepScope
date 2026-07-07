import type { TechnologyDefinition } from '../../types';

export const doxoTechnologyDefinition = {
	id: "doxo",
	name: "doxo",
	website: "https://www.doxo.com",
	description: "doxo is a bill payment service that enables users to manage and pay multiple bills in one place through a single account and login.",
	icon: "doxo.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "doxo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.doxo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "doxo:jsGlobal:1",
			kind: "jsGlobal",
			property: "doxoConnectWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
