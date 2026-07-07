import type { TechnologyDefinition } from '../../types';

export const nucleusCmsTechnologyDefinition = {
	id: "nucleus-cms",
	name: "Nucleus CMS",
	website: "https://www.nucleus-cms.com",
	description: "Nucleus CMS is a free, open-source web application framework and content management system.",
	icon: "NucleusCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "nucleus-cms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("nucleuscms\\.er\\.cz\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nucleus-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Nucleus(?: CMS)?\\s+v?(\\d+\\.\\d+(?:\\.\\d+)?)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "nucleus-cms:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^nucleus(?: cms)?\\s+v?(\\d+\\.\\d+(?:\\.\\d+)?)", "i"),
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
			"freemium",
		],
		cpe: "cpe:2.3:a:nucleuscms:nucleus_cms:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
