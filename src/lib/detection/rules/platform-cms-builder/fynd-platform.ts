import type { TechnologyDefinition } from '../../types';

export const fyndPlatformTechnologyDefinition = {
	id: "fynd-platform",
	name: "Fynd Platform",
	website: "https://platform.fynd.com",
	description: "Fynd Platform is a subscription based software as a service where brands can mange their catalog, send marketing sms/emailers and sell their products.",
	icon: "Fynd Platform.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "fynd-platform:jsGlobal:0",
			kind: "jsGlobal",
			property: "__fyndAction",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fynd-platform:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.fynd\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"payg",
			"recurring",
		],
	},
	implies: [
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
