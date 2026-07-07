import type { TechnologyDefinition } from '../../types';

export const swiftypeTechnologyDefinition = {
	id: "swiftype",
	name: "Swiftype",
	website: "https://swiftype.com",
	description: "Swiftype provides search software for organisations, websites, and computer programs.",
	icon: "Swiftype.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "swiftype:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("swiftype\\.com\\/embed\\.js$"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "swiftype:jsGlobal:1",
			kind: "jsGlobal",
			property: "Swiftype",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
