import type { TechnologyDefinition } from '../../types';

export const libphonenumberTechnologyDefinition = {
	id: "libphonenumber",
	name: "libphonenumber",
	website: "https://github.com/google/libphonenumber",
	description: "libphonenumber is a JavaScript library for parsing, formatting, and validating international phone numbers.",
	icon: "default.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "libphonenumber:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\/([\\d\\.]+))?\\/libphonenumber(?:-js\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "libphonenumber:jsGlobal:1",
			kind: "jsGlobal",
			property: "libphonenumber.AsYouType",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "libphonenumber:jsGlobal:2",
			kind: "jsGlobal",
			property: "libphonenumber.DIGITS",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
