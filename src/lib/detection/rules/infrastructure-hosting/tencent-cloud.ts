import type { TechnologyDefinition } from '../../types';

export const tencentCloudTechnologyDefinition = {
	id: "tencent-cloud",
	name: "Tencent Cloud",
	website: "https://intl.cloud.tencent.com",
	description: "Tencent Cloud is China's leading public cloud service provider.",
	icon: "Tencent Cloud.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "tencent-cloud:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tencent-cloud\\.(?:cn|com)\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tencent-cloud:meta:1",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("^.+Tencent\\sCloud\\.$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "tencent-cloud:meta:2",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("^.+tencent\\scloud\\.$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
