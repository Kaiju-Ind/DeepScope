import type { TechnologyDefinition } from '../../types';

export const analysysArkTechnologyDefinition = {
	id: "analysys-ark",
	name: "Analysys Ark",
	website: "https://ark.analysys.cn",
	icon: "Analysys Ark.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "analysys-ark:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("AnalysysFangzhou_JS_SDK\\.min\\.js\\?v=([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "analysys-ark:jsGlobal:1",
			kind: "jsGlobal",
			property: "AnalysysAgent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "analysys-ark:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^ARK_ID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "analysys-ark:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("analysysfangzhou_js_sdk\\.min\\.js\\?v=([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "analysys-ark:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^ark_id$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
