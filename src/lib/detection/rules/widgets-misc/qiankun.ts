import type { TechnologyDefinition } from '../../types';

export const qiankunTechnologyDefinition = {
	id: "qiankun",
	name: "qiankun",
	website: "https://qiankun.umijs.org",
	description: "qiankun is a JS library who helps developers to build a micro frontends system.",
	icon: "qiankun.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "qiankun:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("__POWERED_BY_QIANKUN__"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "qiankun:dom:1",
			kind: "dom",
			selector: "div[id^='__qiankun_']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "qiankun:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("__powered_by_qiankun__"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
