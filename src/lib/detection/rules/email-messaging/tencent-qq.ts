import type { TechnologyDefinition } from '../../types';

export const tencentQqTechnologyDefinition = {
	id: "tencent-qq",
	name: "Tencent QQ",
	website: "https://im.qq.com",
	description: "Tencent QQ also known as QQ, is an instant messaging software service and web portal developed by the Chinese tech giant Tencent.",
	icon: "Tencent QQ.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "tencent-qq:dom:0",
			kind: "dom",
			selector: "a[href*='tencent://message/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
