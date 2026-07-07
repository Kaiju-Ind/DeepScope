import type { TechnologyDefinition } from '../../types';

export const aryaCmsTechnologyDefinition = {
	id: "arya-cms",
	name: "Arya CMS",
	website: "https://sndigitalhub.com",
	description: "Arya CMS is a lesser-known content management system that may not have a significant user base or active development community.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "arya-cms:jsGlobal:0",
			kind: "jsGlobal",
			property: "AryaCMS",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
