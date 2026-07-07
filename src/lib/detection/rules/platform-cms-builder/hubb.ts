import type { TechnologyDefinition } from '../../types';

export const hubbTechnologyDefinition = {
	id: "hubb",
	name: "Hubb",
	website: "https://www.hubb.church",
	description: "Hubb is an all-in-one integrated system designed for churches, enabling website content management without the need for technical expertise.",
	icon: "Hubb.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "hubb:dom:0",
			kind: "dom",
			selector: "div.endis-jquery-ui",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "hubb:jsGlobal:1",
			kind: "jsGlobal",
			property: "EndisDialog",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hubb:jsGlobal:2",
			kind: "jsGlobal",
			property: "EndisForm",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hubb:jsGlobal:3",
			kind: "jsGlobal",
			property: "IsHubbPage",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hubb:jsGlobal:4",
			kind: "jsGlobal",
			property: "SubmitEndisForm",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
