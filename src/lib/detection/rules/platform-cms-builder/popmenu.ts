import type { TechnologyDefinition } from '../../types';

export const popmenuTechnologyDefinition = {
	id: "popmenu",
	name: "Popmenu",
	website: "https://get.popmenu.com",
	description: "Popmenu is a restaurant platform which offers CMS, online menus, ordering and delivery and marketing automation solutions.",
	icon: "Popmenu.svg",
	categories: [
		"platform-cms-builder",
		"booking-scheduling",
	],
	rules: [
		{
			id: "popmenu:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("popmenu\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "popmenu:jsGlobal:1",
			kind: "jsGlobal",
			property: "POPMENU_CLIENT",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "popmenu:jsGlobal:2",
			kind: "jsGlobal",
			property: "popmenuHydrated",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "popmenu:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^Popmenu\\-Token$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "popmenu:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^popmenu\\-token$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"mid",
			"recurring",
		],
	},
	implies: [
		"apollo",
		"react",
	],
} as const satisfies TechnologyDefinition;
