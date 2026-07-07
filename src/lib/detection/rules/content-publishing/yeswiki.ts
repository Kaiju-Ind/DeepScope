import type { TechnologyDefinition } from '../../types';

export const yeswikiTechnologyDefinition = {
	id: "yeswiki",
	name: "YesWiki",
	website: "https://yeswiki.net",
	description: "YesWiki is a collaborative website creation and management Free Software under the AGPL license, enabling any web user to create, delete, edit, or comment on site pages with unlimited editors or pages.",
	icon: "YesWiki.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "yeswiki:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("javascripts\\/yeswiki-base\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yeswiki:dom:1",
			kind: "dom",
			selector: "#yw-container",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:yeswiki:yeswiki:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
