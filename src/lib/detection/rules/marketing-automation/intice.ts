import type { TechnologyDefinition } from '../../types';

export const inticeTechnologyDefinition = {
	id: "intice",
	name: "Intice",
	website: "https://intice.com",
	description: "Intice is a lead conversion tool designed for the automotive industry, streamlining customer engagement and improving the conversion process from inquiries to sales.",
	icon: "Intice.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "intice:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tools\\.inticeinc\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "intice:jsGlobal:1",
			kind: "jsGlobal",
			property: "intice",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "intice:jsGlobal:2",
			kind: "jsGlobal",
			property: "inticeAllEvents",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "intice:jsGlobal:3",
			kind: "jsGlobal",
			property: "inticeIMP",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "intice:jsGlobal:4",
			kind: "jsGlobal",
			property: "inticeLeadmakerAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
