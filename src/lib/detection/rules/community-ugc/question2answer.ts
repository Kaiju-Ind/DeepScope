import type { TechnologyDefinition } from '../../types';

export const question2answerTechnologyDefinition = {
	id: "question2answer",
	name: "Question2Answer",
	website: "https://www.question2answer.org",
	description: "Question2Answer (Q2A) is a popular open-source Q&A platform for PHP/MySQL.",
	icon: "question2answer.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "question2answer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.\\/qa-content\\/qa-page\\.js\\?([0-9.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "question2answer:html:1",
			kind: "html",
			pattern: new RegExp("<!-- Powered by Question2Answer"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "question2answer:html:2",
			kind: "html",
			pattern: new RegExp("<!-- powered by question2answer"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:question2answer:question2answer:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
