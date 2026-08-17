import type { TechnologyDefinition } from '@/lib/detection/types';

export const vimeoTechnologyDefinition: TechnologyDefinition = {
	id: 'vimeo',
	name: 'Vimeo',
	website: 'https://vimeo.com',
	description:
		'Vimeo is a video hosting, sharing and services platform. Vimeo operation an ad-free basis by providing subscription plans.',
	icon: 'Vimeo.svg',
	categories: [
		'media-video',
	],
	rules: [
		{
			id: 'vimeo:scriptSrc:gap0',
			kind: 'scriptSrc',
			pattern: new RegExp('player\\.vimeo\\.com\\/api\\/player\\.js'),
			description: 'Capture Vimeo player script source URL.',
		},
		{
			id: 'vimeo:dom:0',
			kind: 'dom',
			selector: "iframe[src*='vimeo.com'],embed[src*='vimeo.com']",
			description: 'DOM selector matches a known technology marker.',
		},
		{
			id: 'vimeo:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'Vimeo.Player',
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'vimeo:jsGlobal:2',
			kind: 'jsGlobal',
			property: 'VimeoPlayer',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
