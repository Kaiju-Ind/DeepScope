import type { TechnologyDefinition } from '../../types';

export const easysizeTechnologyDefinition = {
	id: "easysize",
	name: "Easysize",
	website: "https://www.easysize.me",
	description: "Easysize is a system that provides clothing size recommendations to enhance fit and reduce sizing errors.",
	icon: "Easysize.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "easysize:jsGlobal:0",
			kind: "jsGlobal",
			property: "EasySize",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "easysize:jsGlobal:1",
			kind: "jsGlobal",
			property: "EasySizeDebugEnable",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "easysize:jsGlobal:2",
			kind: "jsGlobal",
			property: "EasySizeParametersDebug",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
