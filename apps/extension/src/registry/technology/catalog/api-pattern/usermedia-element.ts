import type { TechnologyDefinition } from '@/lib/detection/types';

/** Detects author use of the UserMedia capability element shipped in Chromium 151. */
export const usermediaElementTechnologyDefinition: TechnologyDefinition = {
	id: 'usermedia-element',
	name: 'UserMedia element',
	website: 'https://developer.chrome.com/blog/new-in-chrome-151#capability_element_usermedia_mvp',
	description:
		'The UserMedia element is a browser-owned control that requests camera or microphone access after explicit user activation and returns a MediaStream.',
	categories: ['api-pattern'],
	rules: [
		{
			id: 'usermedia-element:dom:element',
			kind: 'dom',
			selector: 'usermedia',
			confidence: 100,
			description: 'Rendered DOM contains the UserMedia capability element.',
		},
		{
			id: 'usermedia-element:html:element',
			kind: 'html',
			pattern: /<usermedia(?=[\s/>])/i,
			confidence: 100,
			description: 'Captured HTML contains the UserMedia capability element.',
		},
	],
} as const satisfies TechnologyDefinition;
