import type { TechnologyDefinition } from '@/lib/detection/types';

export const acquiaCloudIdeTechnologyDefinition: TechnologyDefinition = {
	id: 'acquia-cloud-ide',
	name: 'Acquia Cloud IDE',
	website: 'https://www.acquia.com/products/acquia-cloud-platform/cloud-ide',
	description:
		'Acquia Cloud IDE is a browser-based, Drupal-optimized development environment integrated with Acquia Cloud Platform and preconfigured with common Drupal development and debugging tools.',
	icon: 'acquia-cloud-ide.png',
	categories: [
		'developer-tooling',
	],
	rules: [
		{
			id: 'acquia-cloud-ide:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('https?:\\/\\/.+\\.web\\.ahdev\\.cloud'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'acquia-cloud-ide:url:1',
			kind: 'url',
			pattern: new RegExp('https:?\\/\\/.+\\.web\\.ahdev\\.cloud'),
			description: 'Page URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
	implies: [
		'acquia-cloud-platform',
	],
} as const satisfies TechnologyDefinition;
