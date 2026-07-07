import type { TechnologyDefinition } from '../../types';

export const gsapTechnologyDefinition = {
	id: 'gsap',
	name: 'GSAP',
	website: 'https://greensock.com/gsap',
	description: 'GSAP is an animation library that allows you to create animations with JavaScript.',
	icon: 'TweenMax.png',
	categories: [
		'animation',
		'ui-library',
	],
	rules: [
		{
			id: 'gsap:scriptSrc:tweenmax:0',
			kind: 'scriptSrc',
			pattern: /(?:^|[/@.-])TweenMax(?:\.min)?\.js(?:[?#]|$)/,
			description: 'Script source URL loads the TweenMax GSAP bundle.',
		},
		{
			id: 'gsap:jsGlobal:tweenlite-version:1',
			kind: 'jsGlobal',
			property: 'TweenLite.version',
			valuePattern: /([\d.]+)/,
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Page global exposes the TweenLite GSAP version.',
		},
		{
			id: 'gsap:jsGlobal:tweenmax-version:2',
			kind: 'jsGlobal',
			property: 'TweenMax.version',
			valuePattern: /([\d.]+)/,
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Page global exposes the TweenMax GSAP version.',
		},
		{
			id: 'gsap:jsGlobal:gsap-version:3',
			kind: 'jsGlobal',
			property: 'gsap.version',
			valuePattern: /([\d.]+)/,
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Page global exposes the GSAP version.',
		},
		{
			id: 'gsap:jsGlobal:gsap-versions:4',
			kind: 'jsGlobal',
			property: 'gsapVersions',
			description: 'Page global exposes GSAP version metadata.',
		},
		{
			id: 'gsap:scriptSrc:tweenmax-lowercase:5',
			kind: 'scriptSrc',
			pattern: /(?:^|[/@.-])tweenmax(?:\.min)?\.js(?:[?#]|$)/,
			description: 'Script source URL loads the TweenMax GSAP bundle.',
		},
		{
			id: 'gsap:resourceUrl:package-path:6',
			kind: 'resourceUrl',
			pattern: /(?:\/node_modules\/gsap\/|\/gsap@\d|[/@.-]gsap(?:\.min)?\.js(?:[?#]|$))/,
			confidence: 75,
			description: 'Resource URL points to a GSAP package or bundle path.',
		},
		{
			id: 'gsap:resourceUrl:greensock-host-or-path:7',
			kind: 'resourceUrl',
			pattern: /(?:greensock\.com|[/.-]greensock[/.-])/,
			confidence: 75,
			description: 'Resource URL points to a GreenSock host or package path.',
		},
		{
			id: 'gsap:scriptContent:greensock-globals:8',
			kind: 'scriptContent',
			pattern: /\bGreenSockGlobals\b/,
			confidence: 65,
			description: 'Script content references the GSAP GreenSockGlobals runtime object.',
		},
		{
			id: 'gsap:scriptContent:gsap-register-plugin:9',
			kind: 'scriptContent',
			pattern: /\bgsap\s*\.\s*registerPlugin\s*\(/,
			confidence: 65,
			description: 'Script content calls the GSAP registerPlugin API.',
		},
		{
			id: 'gsap:scriptContent:scrolltrigger-create:10',
			kind: 'scriptContent',
			pattern: /\bScrollTrigger\s*\.\s*create\s*\(/,
			confidence: 60,
			description: 'Script content calls the GSAP ScrollTrigger create API.',
		},
	],
	metadata: {
		pricing: [
			'freemium',
			'low',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
