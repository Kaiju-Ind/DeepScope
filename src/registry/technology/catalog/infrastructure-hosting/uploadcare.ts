import type { TechnologyDefinition } from '@/lib/detection/types';

export const uploadcareTechnologyDefinition: TechnologyDefinition = {
	id: 'uploadcare',
	name: 'Uploadcare',
	website: 'https://uploadcare.com',
	description:
		'Uploadcare is a complete file handling platform for online business. Receive files from you users via File Uploader or File Upload API, implement image optimization and transformations with Image CDN API, and get HIPAA-compliant storage.',
	icon: 'Uploadcare.svg',
	categories: [
		'infrastructure-hosting',
	],
	rules: [
		{
			id: 'uploadcare:imageSrc:0',
			kind: 'imageSrc',
			pattern: /\.ucarecdn\.com\//i,
			confidence: 90,
			description: 'Rendered image URL is served by Uploadcare.',
		},
		{
			id: 'uploadcare:dom:link',
			kind: 'dom',
			selector: "link[href*='ucarecdn.com']",
			confidence: 45,
			description: 'Document link references Uploadcare CDN.',
		},
		{
			id: 'uploadcare:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'uploadcare.version',
			valuePattern: new RegExp('^([\\d\\.]+)$'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		pricing: [
			'freemium',
			'payg',
		],
	},
} as const satisfies TechnologyDefinition;
