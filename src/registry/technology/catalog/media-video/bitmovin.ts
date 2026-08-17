import type { TechnologyDefinition } from '@/lib/detection/types';

export const bitmovinTechnologyDefinition: TechnologyDefinition = {
	id: 'bitmovin',
	name: 'Bitmovin',
	website: 'https://bitmovin.com',
	description:
		'Bitmovin is a platform that enables live and on-demand video workflows, supporting video processing, delivery, and playback across different streaming environments.',
	icon: 'Bitmovin.svg',
	categories: [
		'media-video',
	],
	rules: [
		{
			id: 'bitmovin:scriptContent:0',
			kind: 'scriptContent',
			pattern: new RegExp('bitmovin\\.com'),
			description: 'Script content contains a bounded technology signature.',
		},
		{
			id: 'bitmovin:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'bitmovin.player',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'payg',
		],
	},
} as const satisfies TechnologyDefinition;
