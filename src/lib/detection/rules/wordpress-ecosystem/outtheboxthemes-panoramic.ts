import type { TechnologyDefinition } from '../../types';

export const outtheboxthemesPanoramicTechnologyDefinition = {
	id: "outtheboxthemes-panoramic",
	name: "OutTheBoxThemes Panoramic",
	website: "https://www.outtheboxthemes.com/wordpress-themes/panoramic",
	description: "Panoramic is a fully responsive WordPress theme with a homepage slider by OutTheBoxThemes.",
	icon: "OutTheBoxThemes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "outtheboxthemes-panoramic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/panoramic\\/.+custom\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "outtheboxthemes-panoramic:dom:1",
			kind: "dom",
			selector: "link#panoramic_customizer_theme_fonts-css",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
