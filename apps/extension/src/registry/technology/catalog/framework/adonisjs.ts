import type { TechnologyDefinition } from '@/lib/detection/types';

export const adonisjsTechnologyDefinition: TechnologyDefinition = {
	id: 'adonisjs',
	name: 'AdonisJS',
	website: 'https://adonisjs.com',
	description:
		'AdonisJS is a backend-first, type-safe web framework for Node.js and TypeScript applications with integrated routing, validation, ORM, and authentication.',
	icon: 'AdonisJS.svg',
	categories: [
		'framework',
	],
	rules: [
		{
			id: 'adonisjs:cookie:0',
			kind: 'cookie',
			keyPattern: new RegExp('^adonis\\-session$', 'i'),
			description: 'Cookie name matches a known technology marker.',
		},
		{
			id: 'adonisjs:cookie:1',
			kind: 'cookie',
			keyPattern: new RegExp('^adonis\\-session\\-values$', 'i'),
			description: 'Cookie name matches a known technology marker.',
		},
		{
			id: 'adonisjs:dom:2',
			kind: 'dom',
			selector: "link[href*='adonisjs.com/'][rel='canonical']",
			description: 'DOM selector matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		'node-js',
	],
} as const satisfies TechnologyDefinition;
