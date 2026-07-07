import type { TechnologyDefinition } from '../../types';

export const expertrecTechnologyDefinition = {
	id: "expertrec",
	name: "ExpertRec",
	website: "https://www.expertrec.com/",
	description: "ExpertRec is a collaborative Web search engine, which allows users share search histories through a web browser.",
	icon: "ExpertRec.png",
	categories: [
		"search",
	],
	rules: [
		{
			id: "expertrec:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("expertrec\\.com\\/api\\/js\\/ci_common\\.js\\?id=.*"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "expertrec:jsGlobal:1",
			kind: "jsGlobal",
			property: "_er_config",
			description: "Page-owned global matches a known technology marker.",
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
