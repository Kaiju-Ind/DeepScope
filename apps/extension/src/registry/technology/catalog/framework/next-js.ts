import type { TechnologyDefinition } from '@/lib/detection/types';

export const nextJsTechnologyDefinition: TechnologyDefinition = {
	id: 'next-js',
	name: 'Next.js',
	website: 'https://nextjs.org/',
	description:
		'Next.js is an open-source React framework from Vercel for full-stack web applications with server and client rendering, file-system routing, and server-side application features.',
	icon: 'Next.js.svg',
	categories: [
		'framework',
	],
	rules: [
		{
			id: 'next-js:scriptContent:modern:0',
			kind: 'scriptContent',
			pattern: new RegExp('window\\.__NEXT_P\\s*='),
			confidence: 75,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'next-js:scriptContent:modern:1',
			kind: 'scriptContent',
			pattern: new RegExp('__NEXT_CROSS_ORIGIN'),
			confidence: 75,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'next-js:scriptContent:modern:2',
			kind: 'scriptContent',
			pattern: new RegExp('data-nextjs-page'),
			confidence: 45,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'next-js:scriptContent:modern:3',
			kind: 'scriptContent',
			pattern: new RegExp('__NEXT_HYDRATED_STATE__'),
			confidence: 45,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'next-js:scriptContent:modern:4',
			kind: 'scriptContent',
			pattern: new RegExp('__NEXT_HYDRATE_MARKER__'),
			confidence: 45,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'next-js:scriptContent:modern:5',
			kind: 'scriptContent',
			pattern: new RegExp('__NEXT_DROP_CLIENT_FILE__'),
			confidence: 45,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'next-js:scriptContent:modern:6',
			kind: 'scriptContent',
			pattern: new RegExp('getServerSideProps'),
			confidence: 85,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'next-js:scriptContent:modern:7',
			kind: 'scriptContent',
			pattern: new RegExp('getInitialProps'),
			confidence: 85,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		// Vercel hosting, cache and request headers support Vercel presence only.
		// They cannot identify the site's framework or authorize React derivation.
		{
			id: 'next-js:header:modern:11',
			kind: 'header',
			key: 'x-powered-by',
			valuePattern: new RegExp('nextjs'),
			confidence: 75,
			description: 'HTTP response header matches a modern tooling marker.',
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
