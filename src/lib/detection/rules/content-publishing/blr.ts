import type { TechnologyDefinition } from '../../types';

export const blrTechnologyDefinition = {
	id: "blr",
	name: "BLR",
	website: "https://blr.com",
	description: "BLR is a compliance and training partner that provides resources and support for HR and EHS teams.",
	icon: "BLR.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "blr:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.blr\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "blr:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.blr\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
