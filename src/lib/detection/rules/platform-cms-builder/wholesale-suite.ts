import type { TechnologyDefinition } from '../../types';

export const wholesaleSuiteTechnologyDefinition = {
	id: "wholesale-suite",
	name: "Wholesale Suite",
	website: "https://wholesalesuiteplugin.com",
	description: "Wholesale Suite is a plugin that enables businesses to manage and streamline wholesale operations online, supporting pricing, ordering, and workflow efficiency.",
	icon: "WholesaleSuite.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wholesale-suite:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.wholesalesuiteplugin\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "wholesale-suite:meta:1",
			kind: "meta",
			key: "wwp",
			valuePattern: new RegExp("^yes$", "i"),
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
