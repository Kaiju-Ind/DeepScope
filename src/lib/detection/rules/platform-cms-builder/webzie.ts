import type { TechnologyDefinition } from '../../types';

export const webzieTechnologyDefinition = {
	id: "webzie",
	name: "Webzie",
	website: "https://www.webzie.com/",
	description: "Webzie is a website builder optimised for performance.",
	icon: "Webzie.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webzie:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Webzie\\.com\\sWebsite\\sBuilder$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "webzie:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^webzie\\.com\\swebsite\\sbuilder$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
