import type { TechnologyDefinition } from '../../types';

export const abpFrameworkTechnologyDefinition = {
	id: "abp-framework",
	name: "ABP Framework",
	website: "https://abp.io/",
	description: "ABP Framework is a complete infrastructure to create modern web applications by following the best practices and conventions of software development.",
	icon: "abp.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "abp-framework:jsGlobal:0",
			kind: "jsGlobal",
			property: "abp.timing.timeZone",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "abp-framework:jsGlobal:1",
			kind: "jsGlobal",
			property: "abp.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:volosoft:abp:*:*:*:*:*:*:*:*",
	},
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
