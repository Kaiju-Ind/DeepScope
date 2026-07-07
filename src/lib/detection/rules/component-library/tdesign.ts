import type { TechnologyDefinition } from '../../types';

export const tdesignTechnologyDefinition = {
	id: "tdesign",
	name: "TDesign",
	website: "https://tdesign.tencent.com",
	description: "TDesign launched by Tencent contains rich and reusable design component resources, such as color system, text system, motion design, etc.",
	icon: "TDesign.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "tdesign:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tdesign\\.gtimg\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tdesign:dom:1",
			kind: "dom",
			selector: ".t-button__text, .t-layout",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
