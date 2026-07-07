import type { TechnologyDefinition } from '../../types';

export const baiduSearchBoxTechnologyDefinition = {
	id: "baidu-search-box",
	name: "Baidu Search Box",
	website: "https://www.baidu.com/search/sug/sugcode.html",
	description: "Baidu Search Box is a feature integrated within web pages enabling users to conduct searches directly on the site.",
	icon: "BaiduSearchBox.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "baidu-search-box:dom:0",
			kind: "dom",
			selector: "input[value='baidu'][name='tn']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
