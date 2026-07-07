import type { TechnologyDefinition } from '../../types';

export const dokeosTechnologyDefinition = {
	id: "dokeos",
	name: "Dokeos",
	website: "https://dokeos.com",
	description: "Dokeos is an e-learning and course management web application.",
	icon: "Dokeos.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "dokeos:html:0",
			kind: "html",
			pattern: new RegExp("(?:Portal <a[^>]+>Dokeos|@import \"[^\"]+dokeos_blue)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "dokeos:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Dokeos", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "dokeos:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Dokeos", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "dokeos:html:3",
			kind: "html",
			pattern: new RegExp("(?:portal <a[^>]+>dokeos|@import \"[^\"]+dokeos_blue)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "dokeos:header:4",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("dokeos", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "dokeos:meta:5",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("dokeos", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:dokeos:dokeos:*:*:*:*:*:*:*:*",
	},
	implies: [
		"ckeditor",
		"jquery",
		"php",
		"xajax",
	],
} as const satisfies TechnologyDefinition;
