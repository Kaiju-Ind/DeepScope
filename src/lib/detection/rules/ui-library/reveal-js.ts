import type { TechnologyDefinition } from '../../types';

export const revealJsTechnologyDefinition = {
	id: "reveal-js",
	name: "Reveal.js",
	website: "https://revealjs.com",
	description: "Reveal.js is a JavaScript framework for building dynamic and interactive presentations using web technologies like HTML, CSS, and JavaScript.",
	icon: "Reveal.js.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "reveal-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:^|\\/)reveal(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "reveal-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "Reveal.VERSION",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"highlight-js",
	],
} as const satisfies TechnologyDefinition;
