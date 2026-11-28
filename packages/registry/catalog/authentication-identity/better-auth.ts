import type { TechnologyDefinition } from "../../types.ts";

/** Detects Better Auth from its default session cookies and package identity. */
export const betterAuthTechnologyDefinition: TechnologyDefinition = {
	id: 'better-auth',
	name: 'Better Auth',
	website: 'https://better-auth.com',
	description: 'Better Auth is an open-source, framework-agnostic authentication framework for TypeScript.',
	categories: ['authentication-identity'],
	rules: [
		{
			id: 'better-auth:cookie:session-token',
			kind: 'cookie',
			keyPattern: /^(?:__Secure-)?better-auth\.session_token$/,
			confidence: 100,
			description: 'Cookie name matches Better Auth default session-token naming, including its secure production prefix.',
		},
		{
			id: 'better-auth:cookie:session-data',
			kind: 'cookie',
			keyPattern: /^(?:__Secure-)?better-auth\.session_data$/,
			confidence: 100,
			description: 'Cookie name matches Better Auth default cached-session naming, including its secure production prefix.',
		},
		{
			id: 'better-auth:cookie:dont-remember',
			kind: 'cookie',
			keyPattern: /^(?:__Secure-)?better-auth\.dont_remember$/,
			confidence: 100,
			description: 'Cookie name matches the Better Auth default remember-me control cookie.',
		},
		{
			id: 'better-auth:scriptContent:package',
			kind: 'scriptContent',
			pattern: /["']better-auth(?:\/[a-z0-9._/-]+)?["']/i,
			confidence: 95,
			description: 'Bundled script references the Better Auth package or one of its public subpaths.',
		},
	],
	metadata: { oss: true },
} as const satisfies TechnologyDefinition;
