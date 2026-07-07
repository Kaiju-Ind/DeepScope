import type { TechnologyDefinition } from '../../types';

export const textpatternCmsTechnologyDefinition = {
	id: "textpattern-cms",
	name: "Textpattern CMS",
	website: "https://textpattern.com",
	description: "Textpattern CMS is an open-source content management system (CMS) that uses a tag-based template language and supports multiple languages.",
	icon: "Textpattern CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "textpattern-cms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Textpattern", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "textpattern-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("textpattern", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:textpattern:textpattern:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
