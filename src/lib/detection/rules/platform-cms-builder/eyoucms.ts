import type { TechnologyDefinition } from '../../types';

export const eyoucmsTechnologyDefinition = {
	id: "eyoucms",
	name: "EyouCMS",
	website: "https://www.eyoucms.com",
	description: "Eyou CMS is a stable, open-source enterprise content management system built on the TP5.0 framework.",
	icon: "EyouCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "eyoucms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^eyoucms$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
		],
		cpe: "cpe:2.3:a:eyoucms:eyoucms:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
