import type { TechnologyDefinition } from '../../types';

export const yextTechnologyDefinition = {
	id: "yext",
	name: "Yext",
	website: "https://www.yext.com",
	description: "Yext is a technology company that provides a cloud-based platform for managing digital knowledge and online reputation.",
	icon: "Yext.svg",
	categories: [
		"search",
		"widgets-misc",
	],
	rules: [
		{
			id: "yext:dom:0",
			kind: "dom",
			selector: "form.yxt-SearchBar-form",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "yext:jsGlobal:1",
			kind: "jsGlobal",
			property: "ANSWERS._analyticsReporterService._baseUrl",
			valuePattern: new RegExp("\\.yext-pixel\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yext:jsGlobal:2",
			kind: "jsGlobal",
			property: "Yext.BaseUrl",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yext:jsGlobal:3",
			kind: "jsGlobal",
			property: "YextAnalyticsObject",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yext:jsGlobal:4",
			kind: "jsGlobal",
			property: "yext.analytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yext:jsGlobal:5",
			kind: "jsGlobal",
			property: "yextAnalyticsEnabled",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yext:jsGlobal:6",
			kind: "jsGlobal",
			property: "yext_analytics",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
