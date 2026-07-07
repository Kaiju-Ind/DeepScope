import type { TechnologyDefinition } from '../../types';

export const sharpayTechnologyDefinition = {
	id: "sharpay",
	name: "Sharpay",
	website: "https://sharpay.io",
	description: "Sharpay is a share button that integrates with blockchain technology, enabling decentralized sharing and tracking of content across multiple platforms.",
	icon: "Sharpay.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "sharpay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.sharpay\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sharpay:jsGlobal:1",
			kind: "jsGlobal",
			property: "gaSharpay",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sharpay:jsGlobal:2",
			kind: "jsGlobal",
			property: "sharpayAPI.append",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
