import type { TechnologyDefinition } from '../../types';

export const pspadTechnologyDefinition = {
	id: "pspad",
	name: "PSPad",
	website: "https://www.pspad.com",
	description: "PSPad is a feature-rich text editor designed for developers and professionals working with text, offering tools for coding, syntax highlighting, and project management.",
	icon: "PSPad.svg",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "pspad:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^PSPad editor, www.pspad.com$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "pspad:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^pspad editor, www.pspad.com$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
