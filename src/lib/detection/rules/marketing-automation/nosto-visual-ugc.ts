import type { TechnologyDefinition } from '../../types';

export const nostoVisualUgcTechnologyDefinition = {
	id: "nosto-visual-ugc",
	name: "Nosto Visual UGC",
	website: "https://www.nosto.com/products/visual-ugc/",
	description: "Nosto Visual UGC (Earlier known as Stackla) is a cloud-based content marketing platform that helps discover, curate, display and engage with user-generated content across all digital marketing platforms.",
	icon: "Nosto.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "nosto-visual-ugc:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.stackla\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nosto-visual-ugc:jsGlobal:1",
			kind: "jsGlobal",
			property: "Stackla",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nosto-visual-ugc:jsGlobal:2",
			kind: "jsGlobal",
			property: "stacklaWidgetJsonp",
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
