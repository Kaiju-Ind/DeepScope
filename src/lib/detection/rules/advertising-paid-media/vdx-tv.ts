import type { TechnologyDefinition } from '../../types';

export const vdxTvTechnologyDefinition = {
	id: "vdx-tv",
	name: "VDX.tv",
	website: "https://vdx.tv",
	description: "VDX.tv (formerly Exponential) is a global advertising technology company that is transforming the way brands connect with relevant audiences in today's converging video landscape.",
	icon: "VDX.tv.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "vdx-tv:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tribalfusion\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vdx-tv:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.exponential\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vdx-tv:dom:2",
			kind: "dom",
			selector: "link[href*='.tribalfusion.com'], link[href*='.exponential.com']",
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
