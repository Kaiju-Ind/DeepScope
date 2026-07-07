import type { TechnologyDefinition } from '../../types';

export const gemiusTechnologyDefinition = {
	id: "gemius",
	name: "Gemius",
	website: "https://www.gemius.com",
	icon: "Gemius.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "gemius:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("hit\\.gemius\\.pl\\/xgemius\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gemius:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("hit\\.gemius\\.pl"),
			confidence: 80,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gemius:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("xgemius\\.js"),
			confidence: 30,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gemius:html:3",
			kind: "html",
			pattern: new RegExp("<a [^>]*onclick=\"gemius_hit"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gemius:jsGlobal:4",
			kind: "jsGlobal",
			property: "gemius_hit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gemius:jsGlobal:5",
			kind: "jsGlobal",
			property: "gemius_init",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gemius:jsGlobal:6",
			kind: "jsGlobal",
			property: "gemius_pending",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gemius:jsGlobal:7",
			kind: "jsGlobal",
			property: "pp_gemius_hit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
