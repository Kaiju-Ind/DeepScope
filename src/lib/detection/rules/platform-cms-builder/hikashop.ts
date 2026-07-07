import type { TechnologyDefinition } from '../../types';

export const hikashopTechnologyDefinition = {
	id: "hikashop",
	name: "HikaShop",
	website: "https://www.hikashop.com",
	description: "HikaShop is a Joomla extension for managing shop content, handling price management, and customizing store views with an intuitive interface.",
	icon: "HikaShop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "hikashop:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("com_hikashop"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "hikashop:jsGlobal:1",
			kind: "jsGlobal",
			property: "hikashop",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hikashop:jsGlobal:2",
			kind: "jsGlobal",
			property: "hikashopCheckField",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		cpe: "cpe:2.3:a:hikashop:hikashop:*:*:*:*:*:joomla\\!:*:*",
	},
	requires: [
		"joomla",
	],
} as const satisfies TechnologyDefinition;
