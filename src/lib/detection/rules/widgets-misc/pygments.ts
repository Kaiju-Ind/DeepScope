import type { TechnologyDefinition } from '../../types';

export const pygmentsTechnologyDefinition = {
	id: "pygments",
	name: "Pygments",
	website: "https://pygments.org",
	icon: "pygments.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "pygments:html:0",
			kind: "html",
			pattern: new RegExp("<link[^>]+pygments\\.css[\"']"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "pygments:dom:1",
			kind: "dom",
			selector: "link[href*='pygments.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:pygments:pygments:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
