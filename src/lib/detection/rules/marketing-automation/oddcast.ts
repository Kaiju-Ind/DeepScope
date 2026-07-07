import type { TechnologyDefinition } from '../../types';

export const oddcastTechnologyDefinition = {
	id: "oddcast",
	name: "Oddcast",
	website: "https://oddcast.com",
	description: "Oddcast is a platform that develops customized video and avatar-based marketing products tailored for small and medium-sized businesses and consumers.",
	icon: "Oddcast.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "oddcast:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.oddcast\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "oddcast:jsGlobal:1",
			kind: "jsGlobal",
			property: "ODDCAST_HTTP_SERVER",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "oddcast:jsGlobal:2",
			kind: "jsGlobal",
			property: "OddcastDomain",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
