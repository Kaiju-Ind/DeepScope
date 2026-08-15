import type { TechnologyDefinition } from '../../types';

export const signalrTechnologyDefinition: TechnologyDefinition = {
	id: 'signalr',
	name: 'SignalR',
	website: 'https://dotnet.microsoft.com/es-es/apps/aspnet/signalr',
	description: 'Realtime web communication framework from Microsoft for ASP.NET.',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'signalr:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('(?:jquery\\.)?signal[rR](?:-((?:\\d+\\.)+\\d+))?(?:\\.min)?\\.js'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'signalr:scriptSrc:1',
			kind: 'scriptSrc',
			pattern: new RegExp('(?:((?:\\d{1,9}\\.){1,12}\\d+)\\/jquery\\.)?signal[rR](?:-)?(?:\\.min)?\\.js'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'signalr:scriptSrc:2',
			kind: 'scriptSrc',
			pattern: new RegExp('(?:((?:\\d{1,9}\\.){1,12}\\d+)\\/jquery\\.)?signal[rr](?:-)?(?:\\.min)?\\.js'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'signalr:scriptSrc:3',
			kind: 'scriptSrc',
			pattern: new RegExp('(?:jquery\\.)?signal[rr](?:-((?:\\d+\\.)+\\d+))?(?:\\.min)?\\.js'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Script source URL matches a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
