import type { TechnologyDefinition } from '../../types';

export const xonicTechnologyDefinition = {
	id: "xonic",
	name: "Xonic",
	website: "https://www.xonic-solutions.de",
	icon: "xonic.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "xonic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("core\\/jslib\\/jquery\\.xonic\\.js\\.php"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "xonic:html:1",
			kind: "html",
			pattern: new RegExp("Powered by <a href=\"http:\\/\\/www\\.xonic-solutions\\.de\\/index\\.php\" target=\"_blank\">xonic-solutions Shopsoftware<\\/a>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "xonic:meta:2",
			kind: "meta",
			key: "keywords",
			valuePattern: new RegExp("xonic-solutions", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "xonic:html:3",
			kind: "html",
			pattern: new RegExp("powered by <a href=\"http:\\/\\/www\\.xonic-solutions\\.de\\/index\\.php\" target=\"_blank\">xonic-solutions shopsoftware<\\/a>"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
