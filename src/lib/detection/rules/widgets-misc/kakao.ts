import type { TechnologyDefinition } from '../../types';

export const kakaoTechnologyDefinition = {
	id: "kakao",
	name: "Kakao",
	website: "https://developers.kakao.com/product",
	description: "Kakao platform provides various services such as Kakao Talk, Kakao Talk Channel, Kakao Story as well as Kakao Pay, Kakao Commerce, Kakao Page provided by the subsidiaries. Users can use all Kakao platform services with a united account called Kakao Account.",
	icon: "Kakao.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "kakao:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.kakao\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kakao:dom:1",
			kind: "dom",
			selector: "a[href*='.kakao.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kakao:jsGlobal:2",
			kind: "jsGlobal",
			property: "Kakao.VERSION",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
