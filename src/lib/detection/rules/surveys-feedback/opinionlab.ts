import type { TechnologyDefinition } from '../../types';

export const opinionlabTechnologyDefinition = {
	id: "opinionlab",
	name: "OpinionLab",
	website: "https://www.opinionlab.com",
	description: "OpinionLab is an omnichannel customer feedback solution provider.",
	icon: "OpinionLab.png",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "opinionlab:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.foresee\\.com\\/code\\/([\\d.]+)-oo\\/oo_engine\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "opinionlab:jsGlobal:1",
			kind: "jsGlobal",
			property: "OOo.Browser",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "opinionlab:jsGlobal:2",
			kind: "jsGlobal",
			property: "OOo.version",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
