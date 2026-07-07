import type { TechnologyDefinition } from '../../types';

export const accessiblyTechnologyDefinition = {
	id: "accessibly",
	name: "Accessibly",
	website: "https://www.onthemapmarketing.com/accessibly/",
	description: "Accessibly is an app which is designed to assist with meeting certain requirements of WCAG 2.1 using an overlay solution.",
	icon: "Accessibly.svg",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "accessibly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("accessibly\\.onthemapmarketing\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "accessibly:jsGlobal:1",
			kind: "jsGlobal",
			property: "accessibilityWidget.name",
			valuePattern: new RegExp("bound"),
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
