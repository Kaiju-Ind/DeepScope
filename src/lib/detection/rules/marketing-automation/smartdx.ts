import type { TechnologyDefinition } from '../../types';

export const smartdxTechnologyDefinition = {
	id: "smartdx",
	name: "SmartDX",
	website: "https://smartdx.co",
	description: "SmartDX is a nimble alternative to cookies that revolutionizes the tracking and identification of individual audience members, maps cross-device journeys, delivers contextual omnichannel interactions, and attributes conversions at the segment-of-one level.",
	icon: "SmartDX.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "smartdx:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.smartdx\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
