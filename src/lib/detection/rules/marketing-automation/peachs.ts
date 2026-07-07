import type { TechnologyDefinition } from '../../types';

export const peachsTechnologyDefinition = {
	id: "peachs",
	name: "Peachs",
	website: "https://peachs.co",
	description: "Peachs is a Squarespace ecommerce word-of-mouth marketing system designed to promote products through customer referrals and social sharing.",
	icon: "Peachs.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "peachs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/peachs\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "peachs:jsGlobal:1",
			kind: "jsGlobal",
			property: "PEACHS_AFFILIATE_STARTED_PROGRAMS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "peachs:jsGlobal:2",
			kind: "jsGlobal",
			property: "PEACHS_SQUARESPACE_STARTED",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
