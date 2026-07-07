import type { TechnologyDefinition } from '../../types';

export const appianTechnologyDefinition = {
	id: "appian",
	name: "Appian",
	website: "https://www.appian.com",
	description: "Appian is an enterprise low-code application platform.",
	icon: "Appian.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "appian:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tempo\\/ui\\/sail-client\\/embeddedBootstrap\\.nocache\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "appian:jsGlobal:1",
			kind: "jsGlobal",
			property: "APPIAN",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "appian:jsGlobal:2",
			kind: "jsGlobal",
			property: "Appian",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "appian:jsGlobal:3",
			kind: "jsGlobal",
			property: "_APPIAN_PROXIES_INITIALIZED",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "appian:jsGlobal:4",
			kind: "jsGlobal",
			property: "webpackJsonpAppian",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "appian:scriptSrc:5",
			kind: "scriptSrc",
			pattern: new RegExp("tempo\\/ui\\/sail-client\\/embeddedbootstrap\\.nocache\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
