import type { TechnologyDefinition } from '../../types';

export const webcoolCmsTechnologyDefinition = {
	id: "webcool-cms",
	name: "Webcool CMS",
	website: "https://webcool.vn",
	description: "Webcool CMS is a content management platform that automates workflows and enhances operational efficiency for organizations in the digital media and journalism industry.",
	icon: "WebcoolCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webcool-cms:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^Webcool CMS$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "webcool-cms:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^webcool cms$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
