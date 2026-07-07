import type { TechnologyDefinition } from '../../types';

export const veGlobalTechnologyDefinition = {
	id: "ve-global",
	name: "Ve Global",
	website: "https://ve.com",
	description: "Ve Global, formerly known as Ve Interactive, is a global technology company that provides ecommerce businesses with a managed-service of proprietary marketing software and digital advertising solutions.",
	icon: "Ve Global.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "ve-global:jsGlobal:0",
			kind: "jsGlobal",
			property: "veTagData.appsServicesUrl",
			valuePattern: new RegExp("\\.veinteractive\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
