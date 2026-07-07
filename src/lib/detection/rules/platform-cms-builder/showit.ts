import type { TechnologyDefinition } from '../../types';

export const showitTechnologyDefinition = {
	id: "showit",
	name: "Showit",
	website: "https://showit.co",
	description: "Showit is a drag-and-drop, no-code website builder for photographers and creative professionals.",
	icon: "Showit.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "showit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("lib\\.showit\\.co\\/engine\\/([\\d\\.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "showit:jsGlobal:1",
			kind: "jsGlobal",
			property: "showit.default.siteId",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
