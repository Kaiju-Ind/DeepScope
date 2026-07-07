import { describe, expect, it } from 'vitest';

import { normalizePageSignals } from '@/lib/observations';
import { runObservationBatchPipeline } from '@/lib/pipeline';
import { pusherTechnologyDefinition } from '@/lib/detection/rules/email-messaging/pusher';
import { opentelemetryTechnologyDefinition } from '@/lib/detection/rules/monitoring-error-tracking/opentelemetry';
import { amazonS3TechnologyDefinition } from '@/lib/detection/rules/infrastructure-hosting/amazon-s3';
import { amazonWebServicesTechnologyDefinition } from '@/lib/detection/rules/infrastructure-hosting/amazon-web-services';
import { fidesTechnologyDefinition } from '@/lib/detection/rules/privacy-compliance/fides';
import { contentfulTechnologyDefinition } from '@/lib/detection/rules/platform-cms-builder/contentful';
import { kasadaTechnologyDefinition } from '@/lib/detection/rules/security/kasada';
import { googleFontApiTechnologyDefinition } from '@/lib/detection/rules/styling-library/google-font-api';
import { nextJsTechnologyDefinition } from '@/lib/detection/rules/ui-library/next-js';
import { turbopackTechnologyDefinition } from '@/lib/detection/rules/bundler/turbopack';
import { webpackTechnologyDefinition } from '@/lib/detection/rules/bundler/webpack';
import { reactServerComponentsTechnologyDefinition } from '@/lib/detection/rules/framework/react-server-components';
import { nextJsPrerenderCacheTechnologyDefinition } from '@/lib/detection/rules/framework/next-js-prerender-cache';
import { vercelBlobStorageTechnologyDefinition } from '@/lib/detection/rules/infrastructure-hosting/vercel-blob-storage';
import { vercelMicrofrontendsTechnologyDefinition } from '@/lib/detection/rules/infrastructure-hosting/vercel-microfrontends';
import { cloudinaryTechnologyDefinition } from '@/lib/detection/rules/infrastructure-hosting/cloudinary';
import { rudderstackTechnologyDefinition } from '@/lib/detection/rules/marketing-automation/rudderstack';
import { featurePolicyTechnologyDefinition } from '@/lib/detection/rules/security/feature-policy';
import { crossOriginResourcePolicyTechnologyDefinition } from '@/lib/detection/rules/security/cross-origin-resource-policy';
import { referrerPolicyHeaderTechnologyDefinition } from '@/lib/detection/rules/security/referrer-policy-header';
import { xFrameOptionsTechnologyDefinition } from '@/lib/detection/rules/security/x-frame-options';
import { xContentTypeOptionsTechnologyDefinition } from '@/lib/detection/rules/security/x-content-type-options';
import { clientHintsTechnologyDefinition } from '@/lib/detection/rules/widgets-misc/client-hints';
import { criticalClientHintsTechnologyDefinition } from '@/lib/detection/rules/widgets-misc/critical-client-hints';
import { htmlInertAttributeTechnologyDefinition } from '@/lib/detection/rules/widgets-misc/html-inert-attribute';
import { beaconApiTechnologyDefinition } from '@/lib/detection/rules/widgets-misc/beacon-api';
import { performanceObserverApiTechnologyDefinition } from '@/lib/detection/rules/widgets-misc/performance-observer-api';
import { resizeObserverApiTechnologyDefinition } from '@/lib/detection/rules/widgets-misc/resize-observer-api';
import { streamsApiTechnologyDefinition } from '@/lib/detection/rules/widgets-misc/streams-api';
import { cssCascadeLayersTechnologyDefinition } from '@/lib/detection/rules/styling-processor/css-cascade-layers';
import { cssSubgridTechnologyDefinition } from '@/lib/detection/rules/styling-processor/css-subgrid';
import { cssPropertyRuleTechnologyDefinition } from '@/lib/detection/rules/styling-processor/css-property-rule';
import { cssHasSelectorTechnologyDefinition } from '@/lib/detection/rules/styling-processor/css-has-selector';
import { cssStartingStyleTechnologyDefinition } from '@/lib/detection/rules/styling-processor/css-starting-style';
import { cssContentVisibilityTechnologyDefinition } from '@/lib/detection/rules/styling-processor/css-content-visibility';
import { cssContainerQueryUnitsTechnologyDefinition } from '@/lib/detection/rules/styling-processor/css-container-query-units';
import { shikiTechnologyDefinition } from '@/lib/detection/rules/developer-tooling/shiki';
import { viewTransitionsApiTechnologyDefinition } from '@/lib/detection/rules/animation/view-transitions-api';
import { offscreenCanvasTechnologyDefinition } from '@/lib/detection/rules/graphics-visualization/offscreen-canvas';
import { webglApiTechnologyDefinition } from '@/lib/detection/rules/graphics-visualization/webgl-api';
import { makePageSignals, TEST_NOW } from '../support/factories';

const VERCEL_CSP = [
	"default-src 'self' vercel.com *.vercel.com assets.vercel.com *.vercel.sh vercel.live",
	"script-src 'self' https://snap.licdn.com cdn.vercel-insights.com va.vercel-scripts.com",
	"connect-src 'self' *.ingest.sentry.io wss://ws-us3.pusher.com sockjs-use3.pusher.com https://*.contentful.com",
	"img-src 'self' https://images.ctfassets.net https://s3.amazonaws.com",
	"font-src 'self' fonts.gstatic.com",
	"frame-ancestors 'self' https://app.contentful.com https://*.contentful.com",
	"script-src-elem 'self' *.stripe.com",
].join(';');

const KASADA_INLINE_SCRIPT = `
	document.addEventListener("kpsdk-load", () => window.KPSDK.configure([]));
	document.addEventListener("kpsdk-ready", () => {});
	fetch('/api/ai-chat', { headers: { 'x-is-human': 'challenge' } });
`;

const VERCEL_STANDARDS_SCRIPT = `
	window.rudderanalytics = window.rudderanalytics || [];
	rudderanalytics.track('Viewed Home');
	navigator.sendBeacon('/e62b3a9e28ed8bca/event', '{}');
	new PerformanceObserver(() => {}).observe({ entryTypes: ['navigation'] });
	new ResizeObserver(() => {}).observe(document.body);
	const stream = new ReadableStream();
	const offscreen = new OffscreenCanvas(32, 32);
	const canvas = document.createElement('canvas');
	canvas.getContext('webgl2');
`;

const VERCEL_STANDARDS_CSS = `
	@layer components { .card { content-visibility: auto; } }
	@property --hero-progress { syntax: '<number>'; inherits: false; initial-value: 0; }
	.grid { grid-template-columns: subgrid; width: 10cqw; }
	.card:has(img) { view-transition-name: hero-card; }
	@starting-style { .card { opacity: 0; } }
	.shiki { --shiki-token-keyword: #fff; }
`;

describe('vercel visible-tab evidence parity', () => {
	// Protects the visible-tab subset of competitor reports without pulling DNS,
	// WHOIS, or contact intelligence into page-local detections.
	it('detects technologies visible from active page HTML and HAR surfaces', () => {
		const registry = [
			kasadaTechnologyDefinition,
			opentelemetryTechnologyDefinition,
			contentfulTechnologyDefinition,
			pusherTechnologyDefinition,
			googleFontApiTechnologyDefinition,
			amazonS3TechnologyDefinition,
			amazonWebServicesTechnologyDefinition,
			fidesTechnologyDefinition,
			reactServerComponentsTechnologyDefinition,
			nextJsPrerenderCacheTechnologyDefinition,
			vercelBlobStorageTechnologyDefinition,
			vercelMicrofrontendsTechnologyDefinition,
			cloudinaryTechnologyDefinition,
			rudderstackTechnologyDefinition,
			featurePolicyTechnologyDefinition,
			crossOriginResourcePolicyTechnologyDefinition,
			referrerPolicyHeaderTechnologyDefinition,
			xFrameOptionsTechnologyDefinition,
			xContentTypeOptionsTechnologyDefinition,
			clientHintsTechnologyDefinition,
			criticalClientHintsTechnologyDefinition,
			htmlInertAttributeTechnologyDefinition,
			beaconApiTechnologyDefinition,
			performanceObserverApiTechnologyDefinition,
			resizeObserverApiTechnologyDefinition,
			streamsApiTechnologyDefinition,
			cssCascadeLayersTechnologyDefinition,
			cssSubgridTechnologyDefinition,
			cssPropertyRuleTechnologyDefinition,
			cssHasSelectorTechnologyDefinition,
			cssStartingStyleTechnologyDefinition,
			cssContentVisibilityTechnologyDefinition,
			cssContainerQueryUnitsTechnologyDefinition,
			shikiTechnologyDefinition,
			viewTransitionsApiTechnologyDefinition,
			offscreenCanvasTechnologyDefinition,
			webglApiTechnologyDefinition,
		];
		const batch = normalizePageSignals(makePageSignals({
			url: 'https://vercel.com/',
			hostname: 'vercel.com',
			headers: {
				'content-security-policy': VERCEL_CSP,
				'accept-ch': 'Sec-CH-Prefers-Color-Scheme',
				'critical-ch': 'Sec-CH-Prefers-Color-Scheme',
				'feature-policy': "fullscreen 'self'; camera 'none'",
				'referrer-policy': 'origin-when-cross-origin',
				'x-frame-options': 'DENY',
				'x-content-type-options': 'nosniff',
			},
			html: '<meta http-equiv="Accept-CH" content="ECT"><link rel="preload" as="script" fetchpriority="low" href="/_next/static/chunk.js"><button id="fides-modal-link">Cookie settings</button><div inert></div>',
			requests: [{
				url: 'https://vercel.com/.well-known/otel/metrics',
				method: 'POST',
				type: 'fetch',
			}, {
				url: 'https://vercel.com/.well-known/vercel/microfrontends/client-config',
				method: 'GET',
				type: 'fetch',
			}, {
				url: 'https://vercel.com/home?_rsc=RQpX-BaygXQ4z4Kt',
				method: 'GET',
				type: 'fetch',
				responseHeaders: {
					'content-type': 'text/x-component',
					'x-nextjs-prerender': '1',
					'x-nextjs-stale-time': '300',
					'x-matched-path': '/precomputed/home',
					'cross-origin-resource-policy': 'cross-origin',
					'server': 'Cloudinary',
				},
			}],
			resources: [{
				url: 'https://vercel.com/149e9513-01fa-4fb0-aad4-566afd725d1b/2d206a39-8ed7-437e-a3be-862e0f06eea3/p.js',
				initiatorType: 'script',
			}, {
				url: 'https://lishhsx6kmthaacj.public.blob.vercel-storage.com/mintlify-desktop-dark.webp',
				initiatorType: 'img',
			}],
			scriptContents: [KASADA_INLINE_SCRIPT, VERCEL_STANDARDS_SCRIPT],
			stylesheetContents: [VERCEL_STANDARDS_CSS],
		}), { observedAt: TEST_NOW });

		const result = runObservationBatchPipeline({
			batch,
			registry,
			source: 'fresh',
		});
		const detectedIds = result.analysis.results.map((detection) => detection.technologyId);

		expect(detectedIds).toEqual(expect.arrayContaining([
			'kasada',
			'opentelemetry',
			'contentful',
			'pusher',
			'google-font-api',
			'amazon-s3',
			'amazon-web-services',
			'fides',
			'react-server-components',
			'next-js-prerender-cache',
			'vercel-blob-storage',
			'vercel-microfrontends',
			'cloudinary',
			'rudderstack',
			'feature-policy',
			'cross-origin-resource-policy',
			'referrer-policy-header',
			'x-frame-options',
			'x-content-type-options',
			'client-hints',
			'critical-client-hints',
			'html-inert-attribute',
			'beacon-api',
			'performance-observer-api',
			'resize-observer-api',
			'streams-api',
			'css-cascade-layers',
			'css-subgrid',
			'css-property-rule',
			'css-has-selector',
			'css-starting-style',
			'css-content-visibility',
			'css-container-query-units',
			'shiki',
			'view-transitions-api',
			'offscreen-canvas',
			'webgl-api',
		]));
		expect(result.analysis.results.find((detection) => detection.technologyId === 'kasada')?.evidence)
			.toEqual(expect.arrayContaining([
				expect.objectContaining({ kind: 'scriptContent' }),
			]));
		expect(result.analysis.results.find((detection) => detection.technologyId === 'opentelemetry')?.evidence)
			.toEqual(expect.arrayContaining([
				expect.objectContaining({ kind: 'requestUrl' }),
			]));
	});

	// Next.js can be built with Turbopack or Webpack, but the framework alone
	// no longer proves Webpack now that Turbopack is production-visible.
	it('does not infer webpack from next-js when turbopack is directly detected', () => {
		const registry = [
			nextJsTechnologyDefinition,
			turbopackTechnologyDefinition,
			webpackTechnologyDefinition,
		];
		const batch = normalizePageSignals(makePageSignals({
			url: 'https://vercel.com/',
			hostname: 'vercel.com',
			scripts: ['/vc-ap-vercel-marketing/_next/static/immutable/chunks/turbopack-0593f40j2-_d6.js'],
			scriptContents: ['globalThis["TURBOPACK_remote_chunk_loading_global_vercel-marketing"] = [];'],
		}), { observedAt: TEST_NOW });

		const result = runObservationBatchPipeline({
			batch,
			registry,
			source: 'fresh',
		});
		const detectedIds = result.analysis.results.map((detection) => detection.technologyId);

		expect(detectedIds).toContain('next-js');
		expect(detectedIds).toContain('turbopack');
		expect(detectedIds).not.toContain('webpack');
	});

});
