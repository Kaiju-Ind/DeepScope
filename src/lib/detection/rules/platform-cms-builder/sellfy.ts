import type { TechnologyDefinition } from '../../types';

export const sellfyTechnologyDefinition = {
	id: "sellfy",
	name: "Sellfy",
	website: "https://sellfy.com",
	description: "Sellfy is an ecommerce platform designed specifically for selling digital products, such as music, illustrations, photos, books or videos in digital files.",
	icon: "Sellfy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sellfy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sellfy\\.com\\/js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sellfy:jsGlobal:1",
			kind: "jsGlobal",
			property: "_sellfy.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sellfy:jsGlobal:2",
			kind: "jsGlobal",
			property: "sellfy._.VERSION",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
