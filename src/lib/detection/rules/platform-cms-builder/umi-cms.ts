import type { TechnologyDefinition } from '../../types';

export const umiCmsTechnologyDefinition = {
	id: "umi-cms",
	name: "UMI.CMS",
	website: "https://www.umi-cms.ru",
	description: "UMI. CMS is a content management system (CMS) that provides tools for creating and managing websites, including features for design customization, content management, and site optimization.",
	icon: "UMI.CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "umi-cms:header:0",
			kind: "header",
			key: "X-Generated-By",
			valuePattern: new RegExp("UMI\\.CMS", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "umi-cms:header:1",
			kind: "header",
			key: "x-generated-by",
			valuePattern: new RegExp("umi\\.cms", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"onetime",
		],
		cpe: "cpe:2.3:a:umi-cms:umi.cms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
