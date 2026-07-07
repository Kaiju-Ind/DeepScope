import type { TechnologyDefinition } from '../../types';

export const shionimporterTechnologyDefinition = {
	id: "shionimporter",
	name: "ShionImporter",
	website: "https://shionimporter.site",
	description: "ShionImporter is a platform that provides dropshipping services, product importing, and automated synchronization of prices and inventory for ecommerce businesses.",
	icon: "ShionImporter.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shionimporter:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.shionimporter\\.site"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shionimporter:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("app\\.shionimporter\\.site"),
			description: "Script content contains a bounded technology signature.",
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
