import type { TechnologyDefinition } from '../../types';

export const smartstoreBizTechnologyDefinition = {
	id: "smartstore-biz",
	name: "Smartstore biz",
	website: "https://smartstore.com",
	icon: "Smartstore.biz.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "smartstore-biz:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("smjslib\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
