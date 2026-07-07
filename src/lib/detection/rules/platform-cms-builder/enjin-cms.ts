import type { TechnologyDefinition } from '../../types';

export const enjinCmsTechnologyDefinition = {
	id: "enjin-cms",
	name: "Enjin CMS",
	website: "https://www.enjin.com",
	description: "Enjin CMS is a content management system which focused creation of websites for gaming guilds, clans, Minecraft servers, or fan communities.",
	icon: "Enjin.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "enjin-cms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.enjin\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "enjin-cms:jsGlobal:1",
			kind: "jsGlobal",
			property: "Enjin_Core_Storage_Cache",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "enjin-cms:jsGlobal:2",
			kind: "jsGlobal",
			property: "Enjin_UI",
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
