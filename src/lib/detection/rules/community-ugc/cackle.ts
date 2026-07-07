import type { TechnologyDefinition } from '../../types';

export const cackleTechnologyDefinition = {
	id: "cackle",
	name: "Cackle",
	website: "https://cackle.me",
	description: "Cackle is a cloud services platform for increasing conversion using comments, feedback collection, online consultant and surveys.",
	icon: "Cackle.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "cackle:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("k\\.cackle\\.me\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cackle:jsGlobal:1",
			kind: "jsGlobal",
			property: "Cackle.CommentCount",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cackle:jsGlobal:2",
			kind: "jsGlobal",
			property: "cackle_widget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
