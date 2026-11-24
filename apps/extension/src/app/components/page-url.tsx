import { Show } from 'solid-js';

import * as url from '@/utils/url';

/** URL presentation modes used by dense page and history surfaces. */
export type PageUrlModeType = 'compact' | 'detail';

/** Which URL part should receive first visual focus. */
export type PageUrlFocusType = 'host' | 'path';

export interface PageUrlPropsType {
	readonly value: string;
	readonly mode?: PageUrlModeType;
	readonly focus?: PageUrlFocusType;
}

/**
 * Present route identity without making a long absolute URL own the layout.
 *
 * Dense origin-scoped lists lead with the pathname because the host is already
 * established by the page chrome. Query values stay out of compact rows; they
 * remain available in the detail view when a diagnostic investigation needs them.
 */
export function PageUrl(props: PageUrlPropsType) {
	const parts = () => url.getParts(props.value);
	const compact = () => (props.mode ?? 'compact') === 'compact';
	const pathFirst = () => (props.focus ?? 'host') === 'path';

	return (
		<div class="min-w-0 flex-1" title={props.value} dir="ltr">
			<Show
				when={pathFirst()}
				fallback={(
					<>
						<p class="truncate text-sm font-medium text-white">{parts().host}</p>
						<PathLine path={parts().pathname} compact={compact()} />
						<UrlMeta parts={parts()} />
					</>
				)}
			>
				<p class={compact()
					? 'line-clamp-2 font-mono text-xs font-medium leading-5 text-white [overflow-wrap:anywhere]'
					: 'font-mono text-sm font-medium leading-6 text-white [overflow-wrap:anywhere]'}>{parts().pathname || '/'}</p>
				<div class="mt-1 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[0.6875rem] text-white/38">
					<span class="truncate">{parts().host}</span>
					<QueryCount count={parts().parameterCount} />
					<Show when={parts().hash}><span class="max-w-28 truncate font-mono">{parts().hash}</span></Show>
				</div>
			</Show>

			<Show when={!compact() && parts().search}>
				<p class="mt-2 font-mono text-[0.625rem] leading-4 text-white/32 [overflow-wrap:anywhere]">{parts().search}</p>
			</Show>
		</div>
	);
}

/** Path line with useful wrapping instead of destructive full-URL truncation. */
function PathLine(props: { readonly path: string; readonly compact: boolean }) {
	return <p class={props.compact
		? 'mt-0.5 line-clamp-2 font-mono text-[0.625rem] leading-4 text-white/38 [overflow-wrap:anywhere]'
		: 'mt-1 font-mono text-[0.6875rem] leading-5 text-white/48 [overflow-wrap:anywhere]'}>{props.path || '/'}</p>;
}

/** Query and fragment metadata stay subordinate to host and pathname. */
function UrlMeta(props: { readonly parts: url.UrlPartsType }) {
	return (
		<div class="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.625rem] text-white/30">
			<QueryCount count={props.parts.parameterCount} />
			<Show when={props.parts.hash}><span class="max-w-28 truncate font-mono">{props.parts.hash}</span></Show>
		</div>
	);
}

/** Compact query count avoids letting opaque parameter values dominate rows. */
function QueryCount(props: { readonly count: number }) {
	return <Show when={props.count > 0}><span class="shrink-0 font-mono tabular-nums">{props.count} param{props.count === 1 ? '' : 's'}</span></Show>;
}
