import type { TechnologyDefinition } from '../../types';

export const brightinfoTechnologyDefinition = {
	id: "brightinfo",
	name: "BrightInfo",
	website: "https://www.brightinfo.com",
	description: "BrightInfo is an automated content personalisation solution.",
	icon: "BrightInfo.png",
	categories: [
		"marketing-automation",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "brightinfo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.brightinfo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "brightinfo:jsGlobal:1",
			kind: "jsGlobal",
			property: "_BI_",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "brightinfo:jsGlobal:2",
			kind: "jsGlobal",
			property: "_biq",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "brightinfo:jsGlobal:3",
			kind: "jsGlobal",
			property: "biJsUrl",
			valuePattern: new RegExp("\\/\\/app\\.brightinfo\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
