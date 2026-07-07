import type { TechnologyDefinition } from '../../types';

export const webguiTechnologyDefinition = {
	id: "webgui",
	name: "WebGUI",
	website: "https://www.webgui.org",
	icon: "WebGUI.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webgui:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^wgSession$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "webgui:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^WebGUI ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "webgui:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^wgsession$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "webgui:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^webgui ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:plainblack:webgui:*:*:*:*:*:*:*:*",
	},
	implies: [
		"perl",
	],
} as const satisfies TechnologyDefinition;
