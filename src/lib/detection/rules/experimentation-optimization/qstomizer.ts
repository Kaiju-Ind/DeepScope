import type { TechnologyDefinition } from '../../types';

export const qstomizerTechnologyDefinition = {
	id: "qstomizer",
	name: "Qstomizer",
	website: "https://www.qstomizer.com",
	description: "Qstomizer app is the app for Shopify and Woocomerce that allows you to add a visual custom product designer to your shop.",
	icon: "Qstomizer.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "qstomizer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/qsmz-scripttag\\/qstomizer_st(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "qstomizer:jsGlobal:1",
			kind: "jsGlobal",
			property: "jQueryQSMZ",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "qstomizer:jsGlobal:2",
			kind: "jsGlobal",
			property: "loadScript_qsmz",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "qstomizer:jsGlobal:3",
			kind: "jsGlobal",
			property: "qstomizer_script",
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
