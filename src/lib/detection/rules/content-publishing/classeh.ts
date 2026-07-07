import type { TechnologyDefinition } from '../../types';

export const classehTechnologyDefinition = {
	id: "classeh",
	name: "Classeh",
	website: "https://fanavar.org",
	description: "Classeh is a LMS that allows user to participate in webinars and also use LMS options like messanger,finances,homework,quiz and some extra options like sending messages and more.",
	icon: "Classeh.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "classeh:dom:0",
			kind: "dom",
			selector: "a[href*='apps.classeh.ir'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "classeh:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^fanavar\\.org$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"recurring",
		],
	},
	implies: [
		"php",
		"python",
		"react",
	],
} as const satisfies TechnologyDefinition;
