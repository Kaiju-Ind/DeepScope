import type { TechnologyDefinition } from '../../types';

export const yclasTechnologyDefinition = {
	id: "yclas",
	name: "Yclas",
	website: "https://yclas.com",
	description: "Yclas is a platform that allows users to create and manage customizable online classified ads websites, available as both a hosted service and an open-source self-hosted solution​ .",
	icon: "Yclas.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "yclas:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("open-classifieds\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "yclas:meta:1",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("(?:Open Classifieds|Yclas)\\s([0-9.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "yclas:meta:2",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("(?:open classifieds|yclas)\\s([0-9.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
		cpe: "cpe:2.3:a:open-classifieds:open_classifieds:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
