import type { TechnologyDefinition } from '../../types';

export const layuiTechnologyDefinition = {
	id: "layui",
	name: "Layui",
	website: "https://layui.gitee.io",
	description: "Layui is an open-source modular front-end UI component library.",
	icon: "Layui.png",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "layui:jsGlobal:0",
			kind: "jsGlobal",
			property: "layui.v",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:layui:layui:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
