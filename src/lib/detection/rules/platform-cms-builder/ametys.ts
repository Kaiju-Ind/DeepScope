import type { TechnologyDefinition } from '../../types';

export const ametysTechnologyDefinition = {
	id: "ametys",
	name: "Ametys",
	website: "https://ametys.org",
	icon: "Ametys.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ametys:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ametys\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ametys:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("(?:Ametys|Anyware Technologies)", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "ametys:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("(?:ametys|anyware technologies)", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:ametys:ametys:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
