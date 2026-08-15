import type { TechnologyDefinition } from '../../types';

export const cartlineTechnologyDefinition: TechnologyDefinition = {
	id: 'cartline',
	name: 'Cartline',
	website: 'https://cartline.pk',
	description:
		'Cartline is a Pakistani ecommerce and WhatsApp-commerce platform for online stores, checkout, and order management.',
	icon: 'Cartline.svg',
	categories: ['platform-cms-builder'],
	rules: [
		{
			id: 'cartline:header:platform',
			kind: 'header',
			key: 'x-cartline-platform',
			valuePattern: /^(?:https?:\/\/)?cartline\.pk\/?$/i,
			confidence: 100,
			description: 'Response header identifies Cartline through its vendor domain.',
		},
		{
			id: 'cartline:jsGlobal:platform',
			kind: 'jsGlobal',
			property: 'Cartline.platform',
			valuePattern: /^Cartline$/,
			confidence: 100,
			description: 'Page-owned global identifies the Cartline platform.',
		},
		{
			id: 'cartline:meta:generator',
			kind: 'meta',
			key: 'generator',
			valuePattern: /^Cartline$/i,
			confidence: 100,
			description: 'Generator metadata identifies Cartline.',
		},
		{
			id: 'cartline:meta:application-name',
			kind: 'meta',
			key: 'application-name',
			valuePattern: /^Cartline$/i,
			confidence: 100,
			description: 'Application-name metadata identifies Cartline.',
		},
	],
	metadata: { saas: true },
} as const satisfies TechnologyDefinition;
