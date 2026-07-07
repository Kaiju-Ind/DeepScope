import type { TechnologyDefinition } from '../../types';

export const gomageTechnologyDefinition = {
	id: "gomage",
	name: "GoMage",
	website: "https://www.gomage.com/magento-2-pwa",
	description: "GoMage is a Magento development company with 10 years of experience.",
	icon: "GoMage.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "gomage:jsGlobal:0",
			kind: "jsGlobal",
			property: "GomageNavigation",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gomage:jsGlobal:1",
			kind: "jsGlobal",
			property: "GomageNavigationClass",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gomage:jsGlobal:2",
			kind: "jsGlobal",
			property: "gomageSpinnerModal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gomage:jsGlobal:3",
			kind: "jsGlobal",
			property: "gomage_navigation_loadinfo_text",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gomage:jsGlobal:4",
			kind: "jsGlobal",
			property: "gomage_navigation_urlhash",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"magento-version-2",
		"pwa",
	],
} as const satisfies TechnologyDefinition;
