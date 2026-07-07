import type { TechnologyDefinition } from '../../types';

export const zoeyTechnologyDefinition = {
	id: "zoey",
	name: "Zoey",
	website: "https://www.zoey.com/",
	description: "Zoey is a cloud-based ecommerce platform for B2B and wholesale businesses.",
	icon: "Zoey.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "zoey:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdna4\\.zoeysite\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zoey:jsGlobal:1",
			kind: "jsGlobal",
			property: "Zoey.module",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zoey:jsGlobal:2",
			kind: "jsGlobal",
			property: "zoey.developer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zoey:jsGlobal:3",
			kind: "jsGlobal",
			property: "zoeyDev",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"mysql",
		"php",
	],
	excludes: [
		"magento",
	],
} as const satisfies TechnologyDefinition;
