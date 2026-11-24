import type { TechnologyDefinition } from '@/lib/detection/types';

export const gatsbyCloudImageCdnTechnologyDefinition: TechnologyDefinition = {
	id: 'gatsby-cloud-image-cdn',
	name: 'Gatsby Image CDN',
	website: 'https://www.gatsbyjs.com/',
	description:
		'Gatsby Image CDN serves gatsby-plugin-image URLs under /_gatsby/image/ from the host at request time. The path proves the Gatsby feature, not a specific host: Gatsby Cloud shut down in 2023 and Netlify serves the same paths.',
	icon: 'Gatsby.svg',
	categories: [
		'framework',
	],
	rules: [
		{
			id: 'gatsby-cloud-image-cdn:dom:0',
			kind: 'dom',
			selector: "img[srcset*='/_gatsby/image/'], source[srcset*='/_gatsby/image/']",
			description: 'DOM selector matches a known technology marker.',
		},
	],
	implies: [
		'gatsby',
	],
} as const satisfies TechnologyDefinition;
