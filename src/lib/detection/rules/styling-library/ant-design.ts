import type { TechnologyDefinition } from '../../types';

export const antDesignTechnologyDefinition = {
	id: "ant-design",
	name: "Ant Design",
	website: "https://ant.design",
	description: "Ant Design is an UI library that can be used with data flow solutions and application frameworks in any React ecosystem.",
	icon: "Ant Design.svg",
	categories: [
		"styling-library",
		"component-library",
	],
	rules: [
		{
			id: "ant-design:html:0",
			kind: "html",
			pattern: new RegExp("<[^>]*class=\"ant-(?:btn|col|row|layout|breadcrumb|menu|pagination|steps|select|cascader|checkbox|calendar|form|input-number|input|mention|rate|radio|slider|switch|tree-select|time-picker|transfer|upload|avatar|badge|card|carousel|collapse|list|popover|tooltip|table|tabs|tag|timeline|tree|alert|modal|message|notification|progress|popconfirm|spin|anchor|back-top|divider|drawer)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "ant-design:html:1",
			kind: "html",
			pattern: new RegExp("<i class=\"anticon anticon-"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "ant-design:dom:2",
			kind: "dom",
			selector: "link[href*='antd']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "ant-design:jsGlobal:3",
			kind: "jsGlobal",
			property: "antd.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ant-design:dom:4",
			kind: "dom",
			selector: "div[class*='ant-collapse']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "ant-design:jsGlobal:5",
			kind: "jsGlobal",
			property: "__ANTD_STYLE_CACHE_MANAGER_FOR_SSR__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ant-design:dom:6",
			kind: "dom",
			selector: "div[class*='ant-collapse'], link[href*='antd'], div[class*='ant-spin-container']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
