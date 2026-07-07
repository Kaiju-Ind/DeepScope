import type { TechnologyDefinition } from '../../types';

export const dedecmsTechnologyDefinition = {
	id: "dedecms",
	name: "DedeCMS",
	website: "https://dedecms.com",
	description: "DedeCMS is an open-source content management system developed by Shanghai Zhi Zhuo Network Technology, known for its customizable templates and strong SEO capabilities.",
	icon: "DedeCMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "dedecms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("dedeajax"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dedecms:jsGlobal:1",
			kind: "jsGlobal",
			property: "DedeContainer",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:dedecms:dedecms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
