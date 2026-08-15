import type { TechnologyDefinition } from '../../types';

export const imageengineTechnologyDefinition: TechnologyDefinition = {
	id: 'imageengine',
	name: 'ImageEngine',
	website: 'https://imageengine.io',
	description:
		'ImageEngine is an intelligent image content delivery network. ImageEngine will resize your image content tailored to the end users device.',
	icon: 'ImageEngine.svg',
	categories: [
		'infrastructure-hosting',
		'monitoring-error-tracking',
	],
	rules: [
		{
			id: 'imageengine:imageSrc:0',
			kind: 'imageSrc',
			pattern: /\.imgeng\.in\//i,
			confidence: 90,
			description: 'Rendered image URL is served by ImageEngine.',
		},
		{
			id: 'imageengine:dom:link',
			kind: 'dom',
			selector: "link[href*='.imgeng.in/']",
			confidence: 45,
			description: 'Document link references ImageEngine.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'low',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
