import { Show } from 'solid-js';

import * as url from '@/utils/url';

/** URL presentation modes used by dense page and history surfaces. */
export type PageUrlModeType = 'compact' | 'detail';

/**
 * Display a page URL as host plus path.
 *
 * The host is the primary identity. The path is secondary so long application
 * routes do not take visual priority over the finding or run that owns them.
 */
export function PageUrl(props: { readonly value: string; readonly mode?: PageUrlModeType }) {
	const parts = () => url.parts(props.value);
	const compact = () => (props.mode ?? 'compact') === 'compact';

	return (
		<div class="min-w-0" title={props.value}>
			<p class="truncate text-sm font-medium text-white">{parts().host}</p>
			<Show when={parts().path}>
				<p class={compact() ? 'mt-0.5 truncate font-mono text-[0.625rem] text-white/38' : 'mt-1 break-all font-mono text-[0.6875rem] leading-5 text-white/48'}>{parts().path}</p>
			</Show>
		</div>
	);
}
