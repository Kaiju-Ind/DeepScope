import type { TechnologyDefinition } from '../../types';

export const workstandTechnologyDefinition = {
	id: "workstand",
	name: "Workstand",
	website: "https://workstand.com",
	description: "Workstand is a marketing and ecommerce solution designed for bike shops.",
	icon: "Workstand.svg",
	categories: [
		"platform-cms-builder",
		"marketing-automation",
	],
	rules: [
		{
			id: "workstand:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("smartetailing\\.piwik\\.pro\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "workstand:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^SmartEtailing Inc$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "workstand:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^smartetailing inc$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
