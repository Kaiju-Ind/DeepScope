import type { TechnologyDefinition } from '../../types';

export const totalcodeTechnologyDefinition = {
	id: "totalcode",
	name: "TotalCode",
	website: "https://www.totalcode.com",
	description: "TotalCode is an omnichannel and ecommerce platform designed to streamline sales and inventory management across various sales channels.",
	icon: "TotalCode.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "totalcode:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^TotalCode$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "totalcode:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^totalcode$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
