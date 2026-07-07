import type { TechnologyDefinition } from '../../types';

export const ioniconsTechnologyDefinition = {
	id: "ionicons",
	name: "Ionicons",
	website: "https://ionicons.com",
	description: "Ionicons is an open-source icon set crafted for web, iOS, Android, and desktop apps.",
	icon: "Ionicons.png",
	categories: [
		"styling-library",
	],
	rules: [
		{
			id: "ionicons:html:0",
			kind: "html",
			pattern: new RegExp("<link[^>]* href=[^>]+ionicons(?:\\.min)?\\.css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "ionicons:dom:1",
			kind: "dom",
			selector: "link[href*='/ionicons.min.css'], link[href*='/ionicons.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
