import type { TechnologyDefinition } from '../../types';

export const irislmsTechnologyDefinition = {
	id: "irislms",
	name: "IrisLMS",
	website: "https://irislms.ir",
	description: "IrisLMS comprehensive education management system, in order to support e-learning and provide suitable conditions for holding online and offline classes with all facilities.",
	icon: "IrisLMS.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "irislms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.irislms\\.ir\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
