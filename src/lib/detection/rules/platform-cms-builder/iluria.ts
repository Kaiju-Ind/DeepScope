import type { TechnologyDefinition } from '../../types';

export const iluriaTechnologyDefinition = {
	id: "iluria",
	name: "Iluria",
	website: "https://www.iluria.com.br",
	description: "Iluria is a hosted ecommerce platform from Brazil.",
	icon: "Iluria.png",
	categories: [
		"platform-cms-builder",
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "iluria:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("template-assets\\.iluria\\.com\\/commons\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "iluria:jsGlobal:1",
			kind: "jsGlobal",
			property: "Iluria",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "iluria:jsGlobal:2",
			kind: "jsGlobal",
			property: "iluriaShowPagination",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
