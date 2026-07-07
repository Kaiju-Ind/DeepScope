import type { TechnologyDefinition } from '../../types';

export const speedsizeTechnologyDefinition = {
	id: "speedsize",
	name: "SpeedSize",
	website: "https://speedsize.com",
	description: "SpeedSize is an AI-based media-compression technology that can auto-detect and compress all of a website's images and videos down to 99% of their original size without lowering the image quality.",
	icon: "SpeedSize.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "speedsize:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/speedsize(?:-sw)?\\.js"),
			confidence: 90,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "speedsize:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.speedsize\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "speedsize:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("data-speedsize-(?:srcset|src|params)?"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
