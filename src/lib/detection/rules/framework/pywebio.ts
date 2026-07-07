import type { TechnologyDefinition } from '../../types';

export const pywebioTechnologyDefinition = {
	id: "pywebio",
	name: "PyWebIO",
	website: "https://pywebio.readthedocs.io/en/latest/",
	description: "PyWebIO is a browser-based framework that transforms the browser into a rich text terminal, allowing developers to create simple web or GUI applications using input and print functions without needing HTML or JavaScript knowledge.",
	icon: "PyWebIO.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "pywebio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/js\\/pywebio\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
