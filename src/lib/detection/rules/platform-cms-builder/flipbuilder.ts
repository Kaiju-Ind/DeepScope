import type { TechnologyDefinition } from '../../types';

export const flipbuilderTechnologyDefinition = {
	id: "flipbuilder",
	name: "FlipBuilder",
	website: "https://www.flipbuilder.com",
	description: "FlipBuilder is a tool that enables the batch conversion of standard PDF files into interactive booklets, featuring page flip animations and sound effects.",
	icon: "FlipBuilder.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "flipbuilder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.flipbuilder\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "flipbuilder:meta:1",
			kind: "meta",
			key: "Generator",
			valuePattern: new RegExp("Flip PDF Professional ([\\d\\.]+) at https?:\\/\\/www\\.flipbuilder\\.com", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "flipbuilder:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("flip pdf professional ([\\d\\.]+) at https?:\\/\\/www\\.flipbuilder\\.com", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"onetime",
		],
		cpe: "cpe:2.3:a:flipbuilder:flip_pdf:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
