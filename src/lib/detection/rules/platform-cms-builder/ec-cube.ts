import type { TechnologyDefinition } from '../../types';

export const ecCubeTechnologyDefinition = {
	id: "ec-cube",
	name: "EC-CUBE",
	website: "https://www.ec-cube.net",
	description: "EC-CUBE is an open source package used to build ecommerce sites.",
	icon: "EC-CUBE.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ec-cube:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("eccube\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ec-cube:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("win_op\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:lockon:ec-cube:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
