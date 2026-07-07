import type { TechnologyDefinition } from '../../types';

export const gatsbyCloudImageCdnTechnologyDefinition = {
	id: "gatsby-cloud-image-cdn",
	name: "Gatsby Cloud Image CDN",
	website: "https://www.gatsbyjs.com/products/cloud/image-cdn",
	description: "Image CDN is a new feature of hosting on Gatsby Cloud. Instead of processing images at build time, Image CDN defers and offloads image processing to the edge.",
	icon: "Gatsby.svg",
	categories: [
		"framework",
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "gatsby-cloud-image-cdn:dom:0",
			kind: "dom",
			selector: "img[srcset*='/_gatsby/image/'], source[srcset*='/_gatsby/image/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
