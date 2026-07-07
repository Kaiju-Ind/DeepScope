import type { TechnologyDefinition } from '../../types';

export const baiduAnalyticsTechnologyDefinition = {
	id: "baidu-analytics",
	name: "Baidu Analytics (百度统计)",
	website: "https://tongji.baidu.com/",
	description: "Baidu Analytics (百度统计) is a free tool for tracking and reporting traffic data of users visiting your site.",
	icon: "Baidu Tongji.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "baidu-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("hm\\.baidu\\.com\\/hm?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
