import type { TechnologyDefinition } from '../../types';

export const dataliticsTechnologyDefinition = {
	id: "datalitics",
	name: "Datalitics",
	website: "https://datalitics.com.br",
	description: "Datalitics is a platform designed for advanced lead tracking, offering tools to monitor, analyze, and optimize customer acquisition efforts.",
	icon: "Datalitics.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "datalitics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.datalitics\\.com\\.br\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "datalitics:jsGlobal:1",
			kind: "jsGlobal",
			property: "createWPDatalitics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "datalitics:jsGlobal:2",
			kind: "jsGlobal",
			property: "createWPRedirectDatalitics",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
