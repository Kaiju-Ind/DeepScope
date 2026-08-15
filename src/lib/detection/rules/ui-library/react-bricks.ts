import type { TechnologyDefinition } from '../../types';

export const reactBricksTechnologyDefinition: TechnologyDefinition = {
	id: 'react-bricks',
	name: 'React Bricks',
	website: 'https://reactbricks.com',
	description: 'React Bricks is a visual editing CMS based on React components.',
	icon: 'React Bricks.svg',
	categories: [
		'ui-library',
		'platform-cms-builder',
	],
	rules: [
		// No public, product-specific browser signal is currently strong enough to enable detection.
	],
	metadata: {
		saas: true,
		pricing: [
			'mid',
			'recurring',
		],
	},
	implies: [
		'react',
	],
	requires: [
		'react',
	],
} as const satisfies TechnologyDefinition;
