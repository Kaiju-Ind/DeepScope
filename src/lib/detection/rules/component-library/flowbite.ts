import type { TechnologyDefinition } from '../../types';

export const flowbiteTechnologyDefinition = {
	id: "flowbite",
	name: "Flowbite",
	website: "https://github.com/themesberg/flowbite",
	description: "Flowbite is an open-source library of UI components based on the utility-first Tailwind CSS framework featuring dark mode support, a Figma design system, and more.",
	icon: "Flowbite.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "flowbite:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/flowbite(?:@([\\d\\.]+)\\/|\\.bundle\\.js)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"tailwind-css",
	],
} as const satisfies TechnologyDefinition;
