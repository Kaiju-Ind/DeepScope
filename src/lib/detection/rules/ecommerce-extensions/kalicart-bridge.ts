import type { TechnologyDefinition } from '../../types';

export const kaliCartBridgeTechnologyDefinition: TechnologyDefinition = {
	id: 'kalicart-bridge',
	name: 'KaliCart Bridge',
	website: 'https://bridge.kalicart.com',
	description:
		'KaliCart Bridge is a WooCommerce plugin that exposes a structured commerce API and MCP server for software agents.',
	categories: ['ecommerce-extensions'],
	component: {
		kind: 'plugin',
		parentTechnologyId: 'woocommerce',
		sourceIdentities: [{ kind: 'wordpress-plugin', value: 'kalicart-bridge' }],
	},
	rules: [
		{
			id: 'kalicart-bridge:url:well-known',
			kind: 'url',
			pattern: /\/\.well-known\/kalicart-bridge\.json(?:[?#]|$)/i,
			confidence: 35,
			description:
				'Captured route targets the KaliCart Bridge well-known descriptor. The route alone is supporting evidence because generic fallback pages can return HTTP 200.',
		},
		{
			id: 'kalicart-bridge:html:agent-link',
			kind: 'html',
			pattern: /<link[^>]+rel=["']kalicart-agent["'][^>]*>/i,
			confidence: 100,
			description: 'HTML declares the KaliCart agent discovery link relation.',
		},
		{
			id: 'kalicart-bridge:html:discovery-endpoint',
			kind: 'html',
			pattern: /wp-json\/kalicart\/v1\/discovery/i,
			confidence: 100,
			description: 'HTML references the KaliCart Bridge WordPress discovery endpoint.',
		},
		{
			id: 'kalicart-bridge:html:descriptor',
			kind: 'html',
			pattern: /(?:"name"\s*:\s*"KaliCart Bridge"|"kalicart_bridge"\s*:)/i,
			confidence: 100,
			description: 'Captured descriptor identifies KaliCart Bridge in its response body.',
		},
	],
	implies: ['woocommerce'],
} as const satisfies TechnologyDefinition;
