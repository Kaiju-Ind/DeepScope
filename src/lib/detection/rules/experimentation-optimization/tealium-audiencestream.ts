import type { TechnologyDefinition } from '../../types';

export const tealiumAudiencestreamTechnologyDefinition = {
	id: "tealium-audiencestream",
	name: "Tealium AudienceStream",
	website: "https://tealium.com/products/audiencestream",
	description: "Tealium AudienceStream is an omnichannel customer segmentation and real-time action engine.",
	icon: "Tealium.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "tealium-audiencestream:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tealiumiq\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tealium-audiencestream:dom:1",
			kind: "dom",
			selector: "link[href*='.tealiumiq.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
