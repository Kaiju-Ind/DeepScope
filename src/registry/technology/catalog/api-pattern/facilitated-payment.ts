import type { TechnologyDefinition } from '@/lib/detection/types';

/** Detects author use of the facilitated-payment link relation, stable in Chrome 135. */
export const facilitatedPaymentTechnologyDefinition: TechnologyDefinition = {
	id: 'facilitated-payment',
	name: 'Facilitated Payment link relation',
	website: 'https://developer.chrome.com/release-notes/135#link_relfacilitated-payment_to_support_push_payments',
	description:
		'The facilitated-payment link relation lets a page advertise pending push-payment information to registered payment clients.',
	categories: ['api-pattern'],
	rules: [
		{
			id: 'facilitated-payment:link:relation',
			kind: 'link',
			rel: 'facilitated-payment',
			confidence: 100,
			description: 'A link element declares the facilitated-payment relation.',
		},
		{
			id: 'facilitated-payment:html:relation',
			kind: 'html',
			pattern: /<link(?=[\s>])(?=[^>]*\srel\s*=\s*["'](?:[^"'<>]*\s)?facilitated-payment(?:\s[^"'<>]*)?["'])[^>]*>/i,
			confidence: 100,
			description: 'Captured HTML declares a facilitated-payment token in the link relation attribute.',
		},
	],
} as const satisfies TechnologyDefinition;
