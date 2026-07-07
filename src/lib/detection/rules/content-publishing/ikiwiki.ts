import type { TechnologyDefinition } from '../../types';

export const ikiwikiTechnologyDefinition = {
	id: "ikiwiki",
	name: "ikiwiki",
	website: "https://ikiwiki.info",
	description: "ikiwiki is a free and open-source wiki application.",
	icon: "ikiwiki.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "ikiwiki:html:0",
			kind: "html",
			pattern: new RegExp("<link rel=\"alternate\" type=\"application\\/x-wiki\" title=\"Edit this page\" href=\"[^\"]*\\/ikiwiki\\.cgi"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "ikiwiki:html:1",
			kind: "html",
			pattern: new RegExp("<a href=\"\\/(?:cgi-bin\\/)?ikiwiki\\.cgi\\?do="),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "ikiwiki:dom:2",
			kind: "dom",
			selector: "link[rel='alternate'][type='application/x-wiki'][title='Edit this page'][href*='/ikiwiki.cgi']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "ikiwiki:html:3",
			kind: "html",
			pattern: new RegExp("<link rel=\"alternate\" type=\"application\\/x-wiki\" title=\"edit this page\" href=\"[^\"]*\\/ikiwiki\\.cgi"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:ikiwiki:ikiwiki:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
