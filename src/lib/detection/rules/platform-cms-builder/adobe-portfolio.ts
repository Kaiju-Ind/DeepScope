import type { TechnologyDefinition } from '../../types';

export const adobePortfolioTechnologyDefinition = {
	id: "adobe-portfolio",
	name: "Adobe Portfolio",
	website: "https://portfolio.adobe.com",
	description: "Adobe Portfolio is an Adobe platform that allows you to create a web page where you can show your projects, creations, and the services you offer.",
	icon: "Adobe Portfolio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "adobe-portfolio:meta:0",
			kind: "meta",
			key: "twitter:site",
			valuePattern: new RegExp("@AdobePortfolio", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "adobe-portfolio:meta:1",
			kind: "meta",
			key: "twitter:site",
			valuePattern: new RegExp("@adobeportfolio", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
