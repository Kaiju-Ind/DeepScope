import type { TechnologyDefinition } from '../../types';

export const xeoraTechnologyDefinition = {
	id: "xeora",
	name: "Xeora",
	website: "https://www.xeora.org",
	icon: "xeora.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "xeora:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/_bi_sps_v.+\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "xeora:html:1",
			kind: "html",
			pattern: new RegExp("<input type=\"hidden\" name=\"_sys_bind_\\d+\" id=\"_sys_bind_\\d+\" \\/>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "xeora:header:2",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("XeoraEngine", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "xeora:header:3",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("XeoraCube", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "xeora:dom:4",
			kind: "dom",
			selector: "input[type='hidden'][name^='_sys_bind_'][id^='_sys_bind_']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "xeora:header:5",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("xeoraengine", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "xeora:header:6",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("xeoracube", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
