import type { TechnologyDefinition } from '../../types';

export const etherpadTechnologyDefinition = {
	id: "etherpad",
	name: "Etherpad",
	website: "https://etherpad.org",
	description: "Etherpad is an open-source, web-based collaborative real-time editor, allowing authors to simultaneously edit a text document, and see all of the participants' edits in real-time, with the ability to display each author's text in their own colour.",
	icon: "etherpad.png",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "etherpad:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/ep_etherpad-lite\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "etherpad:jsGlobal:1",
			kind: "jsGlobal",
			property: "padeditbar",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "etherpad:jsGlobal:2",
			kind: "jsGlobal",
			property: "padimpexp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "etherpad:header:3",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Etherpad", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "etherpad:header:4",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^etherpad", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:etherpad:etherpad:*:*:*:*:*:*:*:*",
	},
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
