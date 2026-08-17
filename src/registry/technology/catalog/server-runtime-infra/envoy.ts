import type { TechnologyDefinition } from '@/lib/detection/types';

export const envoyTechnologyDefinition: TechnologyDefinition = {
	id: 'envoy',
	name: 'Envoy',
	website: 'https://www.envoyproxy.io/',
	description: 'Envoy is an open-source edge and service proxy, designed for cloud-native applications.',
	icon: 'Envoy.png',
	categories: [
		'server-runtime-infra',
	],
	rules: [
		{
			id: 'envoy:header:gap0',
			kind: 'header',
			key: 'x-envoy-upstream-service-time',
			description: 'Capture Envoy response header for upstream service time.',
		},
		{
			id: 'envoy:header:0',
			kind: 'header',
			key: 'Server',
			valuePattern: new RegExp('^envoy$', 'i'),
			description: 'Response header matches a known technology marker.',
		},
		{
			id: 'envoy:header:1',
			kind: 'header',
			key: 'server',
			valuePattern: new RegExp('^envoy$', 'i'),
			description: 'Response header matches a known technology marker.',
		},
	],
	metadata: {
		cpe: 'cpe:2.3:a:envoyproxy:envoy:*:*:*:*:*:*:*:*',
	},
} as const satisfies TechnologyDefinition;
