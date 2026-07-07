import type { TechnologyDefinition } from '../../types';

export const texthelpTechnologyDefinition = {
	id: "texthelp",
	name: "Texthelp",
	website: "https://www.texthelp.com/en-gb/products/browsealoud/",
	description: "TextHelp is a literacy, accessibility and dyslexia software developer for people with reading and writing difficulties.",
	icon: "Texthelp.svg",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "texthelp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("browsealoud\\.com\\/.*\\/browsealoud\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
