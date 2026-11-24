import type { TechnologyDefinition } from '@/lib/detection/types';

export const appwriteTechnologyDefinition: TechnologyDefinition = {
	id: 'appwrite',
	name: 'Appwrite',
	website: 'https://appwrite.io',
	description:
		'Appwrite is an open-source cloud development platform for web, mobile, and AI applications with authentication, databases, storage, functions, messaging, hosting, and realtime services.',
	icon: 'Appwrite.svg',
	categories: [
		'developer-tooling',
	],
	rules: [
		{
			id: 'appwrite:scriptContent:0',
			kind: 'scriptContent',
			pattern: new RegExp('appwrite\\.io'),
			description: 'Script content contains a bounded technology signature.',
		},
		{
			id: 'appwrite:requestUrl:1',
			kind: 'requestUrl',
			pattern: new RegExp('cloud\\.appwrite\\.io'),
			description: 'Observed request URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			'freemium',
			'low',
			'recurring',
		],
		cpe: 'cpe:2.3:a:appwrite:appwrite:*:*:*:*:*:*:*:*',
	},
} as const satisfies TechnologyDefinition;
