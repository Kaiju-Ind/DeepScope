import type { TechnologyDefinition } from '../../types';

export const liferayTechnologyDefinition = {
	id: "liferay",
	name: "Liferay",
	website: "https://www.liferay.com/",
	description: "Liferay is an open-source company that provides free documentation and paid professional service to users of its software.",
	icon: "Liferay.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "liferay:jsGlobal:0",
			kind: "jsGlobal",
			property: "Liferay",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "liferay:header:1",
			kind: "header",
			key: "Liferay-Portal",
			valuePattern: new RegExp("[a-z\\s]+([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "liferay:header:2",
			kind: "header",
			key: "liferay-portal",
			valuePattern: new RegExp("[a-z\\s]+([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"poa",
		],
		cpe: "cpe:2.3:a:liferay:liferay_portal:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
