import type { TechnologyDefinition } from '../../types';

export const beamImpactTechnologyDefinition = {
	id: "beam-impact",
	name: "Beam Impact",
	website: "https://www.beamimpact.com",
	description: "Beam Impact is a marketing platform that provides end-to-end solutions designed to support consumer-focused campaigns.",
	icon: "BeamImpact.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "beam-impact:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.beamimpact\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "beam-impact:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("sdk\\.beamimpact\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
