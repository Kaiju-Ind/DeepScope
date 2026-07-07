import type { TechnologyDefinition } from '../../types';

export const metamapTechnologyDefinition = {
	id: "metamap",
	name: "MetaMap",
	website: "https://www.metamap.com",
	description: "MetaMap is an identity verification platform that provides customizable solutions for gaining customer insights and making informed decisions.",
	icon: "MetaMap.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "metamap:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.getmati\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
