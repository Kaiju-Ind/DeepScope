import type { TechnologyDefinition } from '../../types';

export const coveTechnologyDefinition = {
	id: "cove",
	name: "Cove",
	website: "https://www.coveo.com",
	description: "Cove is a commenting and community platform that integrates with Ghost sites to enable reader discussions and user engagement.",
	icon: "Cove.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "cove:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.cove\\.chat"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cove:jsGlobal:1",
			kind: "jsGlobal",
			property: "coveAction",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cove:jsGlobal:2",
			kind: "jsGlobal",
			property: "coveCommentCount",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
