import type { TechnologyDefinition } from '../../types';

export const delightXrTechnologyDefinition = {
	id: "delight-xr",
	name: "Delight XR",
	website: "https://delight-vr.com",
	description: "Delight XR is a video platform catering to regular, AR, and VR content with high-quality delivery.",
	icon: "DelightXR.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "delight-xr:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.delight-vr\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "delight-xr:jsGlobal:1",
			kind: "jsGlobal",
			property: "DelightVR",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
