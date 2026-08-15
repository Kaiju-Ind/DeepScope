import type { TechnologyDefinition } from '../../types';

export const verificadoTechnologyDefinition: TechnologyDefinition = {
	id: 'verificado',
	name: 'Verificado',
	website: 'https://verificado.ai',
	description:
		'Verificado is a SaaS platform for collecting, moderating, and publishing verified product and seller reviews on ecommerce sites.',
	icon: 'Verificado.svg',
	categories: [
		'community-ugc',
	],
	rules: [
		{
			id: 'verificado:scriptSrc:onsite-feedback',
			kind: 'scriptSrc',
			pattern: /(?:^|\/)app\.verificado\.ai\/js\/widget\/onsite-feedback-widget\.js(?:[?#]|$)/i,
			confidence: 100,
			description: 'Script source loads Verificado onsite feedback code from its vendor domain.',
		},
		{
			id: 'verificado:scriptSrc:widget-cdn',
			kind: 'scriptSrc',
			pattern: /(?:^|\/)cdn-mz-gj-vai\.verificado\.ai\/(?:js\/)?widget\//i,
			confidence: 100,
			description: 'Script source loads a Verificado widget from its dedicated CDN.',
		},
		{
			id: 'verificado:jsGlobal:version',
			kind: 'jsGlobal',
			property: 'VerificadoAI.version',
			valuePattern: /^(.+)$/,
			confidence: 100,
			version: { source: 'match', group: 1 },
			description: 'Verificado exposes its widget version through a page-owned global.',
		},
		{
			id: 'verificado:jsGlobal:key',
			kind: 'jsGlobal',
			property: 'verificadoAIKeyId',
			confidence: 90,
			description: 'Page exposes a Verificado tenant key global.',
		},
		{
			id: 'verificado:jsGlobal:cdn',
			kind: 'jsGlobal',
			property: 'verificadoAIUriBaseCdn',
			valuePattern: /^https:\/\/cdn-mz-gj-vai\.verificado\.ai\/?$/i,
			confidence: 100,
			description: 'Page exposes the dedicated Verificado CDN through a global.',
		},
		{
			id: 'verificado:dom:widget',
			kind: 'dom',
			selector: '#verificadoAIwidget',
			confidence: 80,
			description: 'DOM contains the Verificado review widget container.',
		},
		{
			id: 'verificado:dom:listing-rating',
			kind: 'dom',
			selector: '.verificadoai-plp-rating',
			confidence: 75,
			description: 'DOM contains a Verificado product-list rating element.',
		},
	],
	metadata: { saas: true, pricing: ['poa', 'recurring'] },
} as const satisfies TechnologyDefinition;
