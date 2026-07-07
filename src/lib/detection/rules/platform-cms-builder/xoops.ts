import type { TechnologyDefinition } from '../../types';

export const xoopsTechnologyDefinition = {
	id: "xoops",
	name: "XOOPS",
	website: "https://xoops.org",
	icon: "XOOPS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "xoops:jsGlobal:0",
			kind: "jsGlobal",
			property: "xoops",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "xoops:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("XOOPS", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "xoops:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("xoops", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:xoops:xoops:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
