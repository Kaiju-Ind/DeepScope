import type { TechnologyDefinition } from '../../types';

export const yuiDocTechnologyDefinition = {
	id: "yui-doc",
	name: "YUI Doc",
	website: "https://developer.yahoo.com/yui/yuidoc",
	description: "YUI Doc is a Node.js application used at build time to generate API documentation.",
	icon: "Yahoo.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "yui-doc:html:0",
			kind: "html",
			pattern: new RegExp("(?:<html[^>]* yuilibrary\\.com\\/rdf\\/[\\d.]+\\/yui\\.rdf|<body[^>]+class=\"yui3-skin-sam)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "yui-doc:dom:1",
			kind: "dom",
			selector: "body[class*='yui3-skin-sam']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
