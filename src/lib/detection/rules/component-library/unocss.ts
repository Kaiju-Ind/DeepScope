import type { TechnologyDefinition } from '../../types';

export const unocssTechnologyDefinition = {
	id: "unocss",
	name: "UnoCSS",
	website: "https://uno.antfu.me/",
	description: "UnoCSS is instant on-demand Atomic CSS engine.",
	icon: "UnoCSS.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "unocss:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: new RegExp("--un-(?:rotate|translate|space-x|text-opacity|border-opacity)"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "unocss:dom:1",
			kind: "dom",
			selector: "style[data-unocss]",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
