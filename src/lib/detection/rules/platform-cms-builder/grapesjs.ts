import type { TechnologyDefinition } from '../../types';

export const grapesjsTechnologyDefinition = {
	id: "grapesjs",
	name: "GrapesJS",
	website: "https://grapesjs.com",
	description: "GrapesJS is an open-source, multi-purpose page builder which combines different plugins and intuitive drag and drop interface.",
	icon: "GrapesJS.png",
	categories: [
		"platform-cms-builder",
		"framework",
	],
	rules: [
		{
			id: "grapesjs:jsGlobal:0",
			kind: "jsGlobal",
			property: "grapesjs.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:grapesjs:grapesjs:*:*:*:*:*:node.js:*:*",
	},
} as const satisfies TechnologyDefinition;
