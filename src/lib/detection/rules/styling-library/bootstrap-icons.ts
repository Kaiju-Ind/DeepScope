import type { TechnologyDefinition } from '../../types';

export const bootstrapIconsTechnologyDefinition = {
	id: "bootstrap-icons",
	name: "Bootstrap Icons",
	website: "https://icons.getbootstrap.com",
	description: "Bootstrap Icons is a growing library of SVG icons that are designed by @mdo and maintained by the Bootstrap Team.",
	icon: "Bootstrap Icons.svg",
	categories: [
		"styling-library",
	],
	rules: [
		{
			id: "bootstrap-icons:dom:0",
			kind: "dom",
			selector: "link[href*='bootstrap-icons']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
