import type { TechnologyDefinition } from '@/lib/detection/types';

export const imagekitTechnologyDefinition: TechnologyDefinition = {
	id: 'imagekit',
	name: 'Imagekit',
	website: 'https://imagekit.io/',
	description:
		'ImageKit is a real-time image and video transformation, optimization, and delivery service with built-in digital asset management, powered by a global CDN.',
	icon: 'ImageKit.svg',
	categories: [
		'content-publishing',
		'infrastructure-hosting',
		'media-video',
	],
	rules: [
		{
			id: 'imagekit:dom:0',
			kind: 'dom',
			selector: "link[href*='ik.imagekit.io/']",
			description: 'DOM selector matches a known technology marker.',
		},
		{
			id: 'imagekit:header:1',
			kind: 'header',
			key: 'x-server',
			valuePattern: new RegExp('imagekit\\.io', 'i'),
			description: 'Response header matches a known technology marker.',
		},
		{
			id: 'imagekit:imageSrc:2',
			kind: 'imageSrc',
			pattern: /\.imagekit\.io\//i,
			confidence: 90,
			description: 'Rendered image URL is served by ImageKit.',
		},
		{
			id: 'imagekit:dns:4',
			kind: 'dns',
			valuePattern: new RegExp('\\.imgkit\\.net', 'i'),
			recordType: 'SOA',
			description: 'DNS record matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'freemium',
			'low',
			'payg',
			'poa',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
