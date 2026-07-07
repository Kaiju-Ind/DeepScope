import type { TechnologyDefinition } from '../../types';

export const strikinglyTechnologyDefinition = {
	id: "strikingly",
	name: "Strikingly",
	website: "https://strikingly.com",
	icon: "Strikingly.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "strikingly:html:0",
			kind: "html",
			pattern: new RegExp("<!-- Powered by Strikingly\\.com"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "strikingly:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.strikinglycdn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "strikingly:jsGlobal:2",
			kind: "jsGlobal",
			property: "STRIKINGLY_RELEASE_TAG",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "strikingly:html:3",
			kind: "html",
			pattern: new RegExp("<!-- powered by strikingly\\.com"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:strikingly:strikingly:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
