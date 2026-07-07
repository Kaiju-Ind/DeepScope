import type { TechnologyDefinition } from '../../types';

export const pwaStudioTechnologyDefinition = {
	id: "pwa-studio",
	name: "PWA Studio",
	website: "https://developer.adobe.com/commerce/pwa-studio/",
	description: "PWA Studio is a collection of tools that lets developers build complex Progressive Web Applications on top of Magento 2 or Adobe Commerce stores.",
	icon: "PWA Studio.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pwa-studio:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("RootCmp_CMS_PAGE"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "pwa-studio:jsGlobal:1",
			kind: "jsGlobal",
			property: "__fetchLocaleData__",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pwa-studio:jsGlobal:2",
			kind: "jsGlobal",
			property: "fetchRootComponent",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pwa-studio:scriptContent:3",
			kind: "scriptContent",
			pattern: new RegExp("rootcmp_cms_page"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
