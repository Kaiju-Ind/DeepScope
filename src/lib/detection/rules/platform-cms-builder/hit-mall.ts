import type { TechnologyDefinition } from '../../types';

export const hitMallTechnologyDefinition = {
	id: "hit-mall",
	name: "Hit-Mall",
	website: "https://www.hit-mall.jp",
	description: "Hit-Mall is a Japanese ecommerce solution designed to support online retail operations for businesses across various industries.",
	icon: "HitMall.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "hit-mall:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/(?:[\\w\\-/]+)?hitmall\\.js(?:\\?.*)?"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
