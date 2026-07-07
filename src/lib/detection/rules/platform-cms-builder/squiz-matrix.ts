import type { TechnologyDefinition } from '../../types';

export const squizMatrixTechnologyDefinition = {
	id: "squiz-matrix",
	name: "Squiz Matrix",
	website: "https://www.squiz.net/matrix",
	description: "A flexible, low-code enterprise content management system designed to manage multiple sites with many editors.",
	icon: "Squiz Matrix.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "squiz-matrix:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/__data\\/assets\\/(js_file_folder|git_bridge|js_file)\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "squiz-matrix:html:1",
			kind: "html",
			pattern: new RegExp("<!--\\s+Running (?:MySource|Squiz) Matrix"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "squiz-matrix:dom:2",
			kind: "dom",
			selector: "link[href*='/__data/assets/css_file/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "squiz-matrix:header:3",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Squiz Matrix", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "squiz-matrix:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Squiz Matrix", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "squiz-matrix:html:5",
			kind: "html",
			pattern: new RegExp("<!--\\s+running (?:mysource|squiz) matrix"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "squiz-matrix:header:6",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("squiz matrix", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "squiz-matrix:meta:7",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("squiz matrix", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"mid",
			"recurring",
		],
		cpe: "cpe:2.3:a:squiz:matrix:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
