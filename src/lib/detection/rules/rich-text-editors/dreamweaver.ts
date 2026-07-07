import type { TechnologyDefinition } from '../../types';

export const dreamweaverTechnologyDefinition = {
	id: "dreamweaver",
	name: "DreamWeaver",
	website: "https://www.adobe.com/products/dreamweaver.html",
	description: "Dreamweaver is a development tool for creating, publishing, and managing websites and mobile content.",
	icon: "DreamWeaver.png",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "dreamweaver:html:0",
			kind: "html",
			pattern: new RegExp("<!--[^>]*(?:InstanceBeginEditable|Dreamweaver([^>]+)target|DWLayoutDefaultTable)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "dreamweaver:html:1",
			kind: "html",
			pattern: new RegExp("<!-- #BeginTemplate\\s\"[\\d_\\w/]+\\.dwt"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "dreamweaver:jsGlobal:2",
			kind: "jsGlobal",
			property: "MM_preloadImages",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dreamweaver:jsGlobal:3",
			kind: "jsGlobal",
			property: "MM_showHideLayers",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dreamweaver:jsGlobal:4",
			kind: "jsGlobal",
			property: "MM_showMenu",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dreamweaver:meta:5",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Adobe dreamweaver$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "dreamweaver:html:6",
			kind: "html",
			pattern: new RegExp("<!-- #begintemplate\\s\"[\\d_\\w/]+\\.dwt"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "dreamweaver:html:7",
			kind: "html",
			pattern: new RegExp("<!--[^>]*(?:instancebegineditable|dreamweaver([^>]+)target|dwlayoutdefaulttable)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:adobe:dreamweaver:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
