import type { TechnologyDefinition } from '../../types';

export const mantineTechnologyDefinition = {
	id: "mantine",
	name: "Mantine",
	website: "https://mantine.dev",
	description: "Mantine is an open-source UI framework and component library for React.",
	icon: "Mantine.svg",
	categories: [
		"styling-library",
		"widgets-misc",
		"component-library",
	],
	rules: [
		{
			id: "mantine:dom:0",
			kind: "dom",
			selector: "style[data-emotion='mantine-global'], style[data-emotion='mantine']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mantine:dom:1",
			kind: "dom",
			selector: "style[data-emotion='mantine-global'], style[data-emotion='mantine'], html[data-mantine-color-scheme]",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"typescript",
	],
	requires: [
		"react",
	],
} as const satisfies TechnologyDefinition;
