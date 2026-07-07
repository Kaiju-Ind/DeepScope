import type { TechnologyDefinition } from '../../types';

export const machothemesNewsmagTechnologyDefinition = {
	id: "machothemes-newsmag",
	name: "MachoThemes NewsMag",
	website: "https://www.machothemes.com/item/newsmag-lite",
	description: "MachoThemes Newsmag is a clean and modern magazine, news or blog WordPress theme.",
	icon: "MachoThemes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "machothemes-newsmag:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/Newsmag(?:-child)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "machothemes-newsmag:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/Newsmag']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "machothemes-newsmag:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/newsmag(?:-child)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
