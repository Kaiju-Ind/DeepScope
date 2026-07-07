import type { TechnologyDefinition } from '../../types';

export const fancyboxTechnologyDefinition = {
	id: "fancybox",
	name: "FancyBox",
	website: "https://fancyapps.com/fancybox",
	description: "FancyBox is a tool for displaying images, html content and multi-media in a Mac-style 'lightbox' that floats overtop of web page.",
	icon: "FancyBox.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "fancybox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jquery\\.fancybox(?:\\.pack|\\.min)?\\.js(?:\\?v=([\\d.]+))?$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fancybox:jsGlobal:1",
			kind: "jsGlobal",
			property: "$.fancybox.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fancybox:jsGlobal:2",
			kind: "jsGlobal",
			property: "Fancybox.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fancybox:jsGlobal:3",
			kind: "jsGlobal",
			property: "jQuery.fancybox.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
