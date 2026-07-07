import type { TechnologyDefinition } from '../../types';

export const invisionPowerBoardTechnologyDefinition = {
	id: "invision-power-board",
	name: "Invision Power Board",
	website: "https://invisioncommunity.com",
	description: "Invision Power Board is a commercial Internet forum software developed by Invision Community (formerly Invision Power Services).",
	icon: "Invision Power Board.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "invision-power-board:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jscripts\\/ips_"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "invision-power-board:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("ipb_url_filter_option"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "invision-power-board:html:2",
			kind: "html",
			pattern: new RegExp("<link[^>]+ipb_[^>]+\\.css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "invision-power-board:jsGlobal:3",
			kind: "jsGlobal",
			property: "IPBoard",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "invision-power-board:jsGlobal:4",
			kind: "jsGlobal",
			property: "ipb_var",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "invision-power-board:jsGlobal:5",
			kind: "jsGlobal",
			property: "ipsSettings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "invision-power-board:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^ipbWWLmodpids$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "invision-power-board:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^ipbWWLsession_id$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "invision-power-board:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^ipbwwlmodpids$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "invision-power-board:cookie:9",
			kind: "cookie",
			keyPattern: new RegExp("^ipbwwlsession_id$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:invisioncommunity:invision_power_board:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
