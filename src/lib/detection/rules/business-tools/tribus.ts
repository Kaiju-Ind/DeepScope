import type { TechnologyDefinition } from '../../types';

export const tribusTechnologyDefinition = {
	id: "tribus",
	name: "TRIBUS",
	website: "https://tribus.com",
	description: "TRIBUS is a custom platform designed for real estate brokerages, offering tailored tools and features to support business operations and client management.",
	icon: "TRIBUS.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "tribus:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.mytribus\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tribus:jsGlobal:1",
			kind: "jsGlobal",
			property: "MyTribusEmbed",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tribus:jsGlobal:2",
			kind: "jsGlobal",
			property: "MyTribusEmbedInstance",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
