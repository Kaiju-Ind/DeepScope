import type { TechnologyDefinition } from '../../types';

export const xsltTechnologyDefinition = {
	id: "xslt",
	name: "XSLT",
	website: "https://www.w3.org/TR/xslt-10",
	description: "XSLT is designed for use as part of XSL, which is a stylesheet language for XML.",
	icon: "W3C.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "xslt:html:0",
			kind: "html",
			pattern: new RegExp("<xsl[^>]* version=\"(.+)\""),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
