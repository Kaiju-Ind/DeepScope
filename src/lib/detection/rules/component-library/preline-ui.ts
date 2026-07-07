import type { TechnologyDefinition } from '../../types';

export const prelineUiTechnologyDefinition = {
	id: "preline-ui",
	name: "Preline UI",
	website: "https://preline.co",
	description: "Preline UI is an open-source set of prebuilt UI components based on the utility-first Tailwind CSS framework.",
	icon: "Preline UI.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "preline-ui:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/preline\\.js"),
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
