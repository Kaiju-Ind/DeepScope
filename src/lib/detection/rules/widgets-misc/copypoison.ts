import type { TechnologyDefinition } from '../../types';

export const copypoisonTechnologyDefinition = {
	id: "copypoison",
	name: "CopyPoison",
	website: "https://copypoison.com/",
	description: "Copypoison is a plagarism protection tool that protects content by replacing text with symbols that are visually similar.",
	icon: "Copypoison.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "copypoison:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("copypoison\\.com\\/cp\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
