import type { TechnologyDefinition } from '@/lib/detection/types';

export const modRackTechnologyDefinition: TechnologyDefinition = {
	id: 'mod-rack',
	name: 'mod_rack',
	website: 'https://phusionpassenger.com',
	description: 'Mod_rack is a free web server and application server with support for Ruby, Python and Node.js.',
	icon: 'Phusion Passenger.png',
	categories: [
		'server-runtime-infra',
	],
	rules: [
		{
			id: 'mod-rack:header:0',
			kind: 'header',
			key: 'Server',
			valuePattern: new RegExp('mod_rack(?:\\/([\\d.]+))?', 'i'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Response header matches a known technology marker.',
		},
		{
			id: 'mod-rack:header:1',
			kind: 'header',
			key: 'X-Powered-By',
			valuePattern: new RegExp('mod_rack(?:\\/([\\d.]+))?', 'i'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Response header matches a known technology marker.',
		},
		{
			id: 'mod-rack:header:2',
			kind: 'header',
			key: 'server',
			valuePattern: new RegExp('mod_rack(?:\\/([\\d.]+))?', 'i'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Response header matches a known technology marker.',
		},
		{
			id: 'mod-rack:header:3',
			kind: 'header',
			key: 'x-powered-by',
			valuePattern: new RegExp('mod_rack(?:\\/([\\d.]+))?', 'i'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Response header matches a known technology marker.',
		},
	],
	implies: [
		'apache-http-server',
		'ruby-on-rails',
	],
} as const satisfies TechnologyDefinition;
