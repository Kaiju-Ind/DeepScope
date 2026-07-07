import type { TechnologyDefinition } from '../../types';

export const redaxoTechnologyDefinition = {
	id: "redaxo",
	name: "REDAXO",
	website: "https://redaxo.org",
	description: "REDAXO is a content management system that provides business optimisation through web projects and output codes.",
	icon: "REDAXO.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "redaxo:url:0",
			kind: "url",
			pattern: new RegExp("^https?:\\/\\/(?:www\\.)?[\\d\\w\\-]+\\.[\\w]+\\/redaxo\\/"),
			confidence: 50,
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "redaxo:jsGlobal:1",
			kind: "jsGlobal",
			property: "redaxo",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:redaxo:redaxo:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
