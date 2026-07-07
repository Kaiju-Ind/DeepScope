import type { TechnologyDefinition } from '../../types';

export const filloutTechnologyDefinition = {
	id: "fillout",
	name: "Fillout",
	website: "https://www.fillout.com/",
	description: "Fillout is a form builder for creating forms, surveys, quizzes, and workflows.",
	icon: "Fillout.svg",
	categories: [
		"widgets-misc",
		"surveys-feedback",
	],
	rules: [
		{
			id: "fillout:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https:\\/\\/server\\.fillout\\.com\\/embed\\/v(\\d)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fillout:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("server\\.fillout\\.com\\/embed\\/v1\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fillout:dom:2",
			kind: "dom",
			selector: "[data-fillout-id]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "fillout:jsGlobal:3",
			kind: "jsGlobal",
			property: "__filloutStandardInitialized",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: false,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
