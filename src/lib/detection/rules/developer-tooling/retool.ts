import type { TechnologyDefinition } from '../../types';

export const retoolTechnologyDefinition = {
	id: "retool",
	name: "Retool",
	website: "https://retool.com",
	description: "Retool is a development platform that enables the rapid creation and customisation of internal tools, including admin dashboards and database interfaces, through a combination of drag-and-drop components and code.",
	icon: "Retool.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "retool:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("retool(?:-edge)?(?:\\.com)?(?:\\/embed)?\\/?(?:runtime)?~?(?:app)?(?:custom-components)?(?:\\.\\w{0,20})?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "retool:url:1",
			kind: "url",
			pattern: new RegExp("^https:\\/\\/retool\\.[\\d\\w\\-]+\\.(?:com|io)\\/"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "retool:jsGlobal:2",
			kind: "jsGlobal",
			property: "RETOOL_PAGE_SUSPEND_DETECTED",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:retool:retool:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
