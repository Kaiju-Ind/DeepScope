import type { TechnologyDefinition } from '../../types';

export const icordisCmsTechnologyDefinition = {
	id: "icordis-cms",
	name: "Icordis CMS",
	website: "https://www.lcp.be",
	description: "Icordis CMS is a proprietary content management system developed by LCP nv for managing custom business and institutional websites.",
	icon: "Icordis CMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "icordis-cms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Icordis CMS by LCP", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "icordis-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^icordis cms by lcp", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
