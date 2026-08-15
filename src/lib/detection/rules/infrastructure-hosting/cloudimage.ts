import type { TechnologyDefinition } from '../../types';

export const cloudimageTechnologyDefinition: TechnologyDefinition = {
	id: 'cloudimage',
	name: 'Cloudimage',
	website: 'https://www.cloudimage.io',
	description:
		'Cloudimage automates the transformation and optimisation of images on the fly and accelerates their distribution via the Content Delivery Network (CDN).',
	icon: 'Cloudimage.svg',
	categories: [
		'infrastructure-hosting',
		'media-video',
	],
	rules: [
		{
			id: 'cloudimage:imageSrc:0',
			kind: 'imageSrc',
			pattern: /\.cloudimg\.io\//i,
			confidence: 90,
			description: 'Rendered image URL is served by Cloudimage.',
		},
		{
			id: 'cloudimage:dom:link',
			kind: 'dom',
			selector: "link[href*='.cloudimg.io/']",
			confidence: 45,
			description: 'Document link references Cloudimage.',
		},
		{
			id: 'cloudimage:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'ciResponsive.config.domain',
			valuePattern: new RegExp('cloudimg\\.io'),
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'freemium',
			'payg',
			'poa',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
