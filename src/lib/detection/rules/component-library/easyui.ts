import type { TechnologyDefinition } from '../../types';

export const easyuiTechnologyDefinition = {
	id: "easyui",
	name: "EasyUI",
	website: "https://jeasyui.com",
	description: "EasyUI is an UI framework that provides a set of customizable components and widgets for building interactive web applications.",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "easyui:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/jquery\\.easyui\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
