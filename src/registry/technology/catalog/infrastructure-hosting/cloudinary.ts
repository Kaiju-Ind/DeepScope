import type { TechnologyDefinition } from '@/lib/detection/types';

export const cloudinaryTechnologyDefinition: TechnologyDefinition = {
	id: 'cloudinary',
	name: 'Cloudinary',
	website: 'https://cloudinary.com',
	description:
		'Cloudinary is an end-to-end image- and video-management solution for websites and mobile apps, covering everything from image and video uploads, storage, manipulations, optimisations to delivery.',
	icon: 'Cloudinary.svg',
	categories: [
		'infrastructure-hosting',
		'media-video',
	],
	rules: [
		{
			id: 'cloudinary:imageSrc:0',
			kind: 'imageSrc',
			pattern: /\.cloudinary\.com\//i,
			confidence: 90,
			description: 'Rendered image URL is served by Cloudinary.',
		},
		{
			id: 'cloudinary:jsGlobal:1',
			kind: 'jsGlobal',
			property: '_cloudinary',
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'cloudinary:dom:3',
			kind: 'dom',
			selector: "link[href*='.cloudinary.com/']",
			confidence: 45,
			description: 'DOM selector matches a known technology marker.',
		},
		{
			id: 'cloudinary:header:4',
			kind: 'header',
			key: 'content-security-policy',
			valuePattern: new RegExp('player\\.cloudinary\\.com', 'i'),
			description: 'Response header matches a known technology marker.',
		},
		{
			id: 'cloudinary:resourceUrl:asset-host',
			kind: 'resourceUrl',
			pattern: new RegExp('https?://[^/]+\\.cloudinary\\.com/(?:[^\\s"\'<>?#]+/)*(?:image|video|raw)/upload/', 'i'),
			confidence: 85,
			description: 'Loaded resource URL uses Cloudinary asset-delivery path conventions.',
		},
		{
			id: 'cloudinary:responseHeader:server',
			kind: 'responseHeader',
			key: 'server',
			valuePattern: new RegExp('\\bCloudinary\\b', 'i'),
			confidence: 95,
			description: 'Captured response server header identifies Cloudinary.',
		},
	],
	metadata: {
		pricing: [
			'freemium',
			'mid',
			'poa',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
