import type { TechnologyDefinition } from '../../types';

export const innoshopTechnologyDefinition = {
	id: "innoshop",
	name: "InnoShop",
	website: "https://www.innoshop.com",
	description: "InnoShop is an open-source ecommerce platform providing flexible tools for building and managing online stores.",
	icon: "InnoShop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "innoshop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.innoshop\\.cn"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "innoshop:jsGlobal:1",
			kind: "jsGlobal",
			property: "inno.addCart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "innoshop:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^innoshop_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
