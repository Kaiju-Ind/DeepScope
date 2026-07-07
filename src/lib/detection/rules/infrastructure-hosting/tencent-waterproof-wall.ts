import type { TechnologyDefinition } from '../../types';

export const tencentWaterproofWallTechnologyDefinition = {
	id: "tencent-waterproof-wall",
	name: "Tencent Waterproof Wall",
	website: "https://007.qq.com/",
	icon: "TencentWaterproofWall.png",
	categories: [
		"infrastructure-hosting",
		"security",
	],
	rules: [
		{
			id: "tencent-waterproof-wall:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/TCaptcha\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tencent-waterproof-wall:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("captcha\\.qq\\.com\\/.*"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tencent-waterproof-wall:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/tcaptcha\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
