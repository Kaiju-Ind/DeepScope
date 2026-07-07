import type { TechnologyDefinition } from '../../types';

export const frontCommerceTechnologyDefinition = {
	id: "front-commerce",
	name: "Front-Commerce",
	website: "https://front-commerce.com",
	description: "Front-Commerce is a React-based ecommerce framework that provides a development environment and tools for building online stores, offering seamless integration with backend systems through GraphQL and supporting popular platforms like Adobe Commerce, BigCommerce, OpenMage, Contentful or Prismic.",
	icon: "front-commerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "front-commerce:dom:0",
			kind: "dom",
			selector: "link[data-chunk*='front-commerce-src-web-theme-routes'], script[data-chunk*='front-commerce-src-web-theme-routes']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "front-commerce:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^Front-Commerce$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"graphql",
		"node-js",
		"pwa",
		"react",
		"remix",
		"vite",
		"webpack",
	],
} as const satisfies TechnologyDefinition;
