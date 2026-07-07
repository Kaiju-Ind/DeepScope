import type { TechnologyDefinition } from '../../types';

export const processwireTechnologyDefinition = {
	id: "processwire",
	name: "ProcessWire",
	website: "https://processwire.com/",
	description: "ProcessWire is an open source content management system (CMS) and framework (CMF).",
	icon: "ProcessWire.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "processwire:jsGlobal:0",
			kind: "jsGlobal",
			property: "ProcessWire",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "processwire:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("ProcessWire CMS", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "processwire:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("processwire cms", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:processwire:processwire:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
