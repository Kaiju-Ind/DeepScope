import type { TechnologyDefinition } from '../../types';

export const openrestyTechnologyDefinition = {
	id: "openresty",
	name: "OpenResty",
	website: "https://openresty.org",
	description: "OpenResty is a web platform based on nginx which can run Lua scripts using its LuaJIT engine.",
	icon: "OpenResty.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "openresty:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("openresty(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "openresty:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("openresty(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:openresty:openresty:*:*:*:*:*:*:*:*",
	},
	implies: [
		"nginx",
	],
} as const satisfies TechnologyDefinition;
