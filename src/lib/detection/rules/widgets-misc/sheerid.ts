import type { TechnologyDefinition } from '../../types';

export const sheeridTechnologyDefinition = {
	id: "sheerid",
	name: "SheerID",
	website: "https://www.sheerid.com/",
	description: "SheerID is a highly specialised solution offering online verification support for retailers, marketers and service providers.",
	icon: "SheerID.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "sheerid:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\"sheerIdEndpoint\":"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "sheerid:dom:1",
			kind: "dom",
			selector: "a[href*='.sheerid.com/'], img[src*='.sheerid.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sheerid:jsGlobal:2",
			kind: "jsGlobal",
			property: "SheerID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sheerid:jsGlobal:3",
			kind: "jsGlobal",
			property: "sheerid",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sheerid:header:4",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.sheerid\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "sheerid:header:5",
			kind: "header",
			key: "content-security-policy-report-only",
			valuePattern: new RegExp("\\.sheerid\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "sheerid:scriptContent:6",
			kind: "scriptContent",
			pattern: new RegExp("\"sheeridendpoint\":"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
