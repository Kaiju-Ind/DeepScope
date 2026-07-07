import type { TechnologyDefinition } from '../../types';

export const greenValleyCmsTechnologyDefinition = {
	id: "green-valley-cms",
	name: "Green Valley CMS",
	website: "https://www.greenvalley.nl/Public/Producten/Content_Management/CMS",
	icon: "Green Valley CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "green-valley-cms:html:0",
			kind: "html",
			pattern: new RegExp("<img[^>]+\\/dsresource\\?objectid="),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "green-valley-cms:meta:1",
			kind: "meta",
			key: "DC.identifier",
			valuePattern: new RegExp("\\/content\\.jsp\\?objectid=", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "green-valley-cms:meta:2",
			kind: "meta",
			key: "dc.identifier",
			valuePattern: new RegExp("\\/content\\.jsp\\?objectid=", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"apache-tomcat",
	],
} as const satisfies TechnologyDefinition;
