import type { TechnologyDefinition } from '../../types';

export const frizbitTechnologyDefinition = {
	id: "frizbit",
	name: "Frizbit",
	website: "https://frizbit.com",
	description: "Frizbit is a marketing tool that helps digital marketeers increase web traffic and revenue by combining web push notification.",
	icon: "Frizbit.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "frizbit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.frizbit\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "frizbit:dom:1",
			kind: "dom",
			selector: "link[href*='cdn.frizbit.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "frizbit:jsGlobal:2",
			kind: "jsGlobal",
			property: "frizbit.configurationManager",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "frizbit:jsGlobal:3",
			kind: "jsGlobal",
			property: "frizbit.remoteConfigs",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
