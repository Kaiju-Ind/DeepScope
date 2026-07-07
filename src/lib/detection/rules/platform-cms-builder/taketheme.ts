import type { TechnologyDefinition } from '../../types';

export const takethemeTechnologyDefinition = {
	id: "taketheme",
	name: "TakeTheme",
	website: "https://taketheme.com",
	description: "TakeTheme is a platform that allows users to create online stores, add products, and manage sales.",
	icon: "TakeTheme.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "taketheme:dom:0",
			kind: "dom",
			selector: "link[href*='taketheme.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "taketheme:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^TakeTheme$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "taketheme:meta:2",
			kind: "meta",
			key: "publisher",
			valuePattern: new RegExp("^TakeTheme$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "taketheme:meta:3",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^taketheme$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "taketheme:meta:4",
			kind: "meta",
			key: "publisher",
			valuePattern: new RegExp("^taketheme$", "i"),
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
