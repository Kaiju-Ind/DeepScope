import type { TechnologyDefinition } from '../../types';

export const tencentAnalyticsTechnologyDefinition = {
	id: "tencent-analytics",
	name: "Tencent Analytics (腾讯分析)",
	website: "https://ta.qq.com/",
	icon: "tajs.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "tencent-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tajs\\.qq\\.com\\/stats"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
