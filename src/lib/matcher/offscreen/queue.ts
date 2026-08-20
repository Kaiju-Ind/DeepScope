/** Error returned when queued matcher work reaches its retention safety limit. */
export class QueueFullError extends Error {
	constructor(limit: number) {
		super(`Matcher queue reached its ${limit}-job limit.`);
		this.name = 'QueueFullError';
	}
}

/** One queue entry claimed by the offscreen matcher host. */
export type QueueEntryType<Request, Result> = {
	/** Request retained while the job waits for matcher capacity. */
	readonly request: Request;
	/** Timestamp when this request entered the queue. */
	readonly queuedAt: number;
	/** Resolve the original runtime message when matcher work completes. */
	readonly resolve: (result: Result) => void;
	/** Reject the original runtime message on cancellation or failure. */
	readonly reject: (error: unknown) => void;
};

/** Queue position callback used to publish real waiting state to the background. */
export type QueuePositionType<Request> = (
	request: Request,
	position: number,
	depth: number,
	queuedAt: number,
) => void;

/** Construction options for the bounded priority matcher queue. */
export type QueueOptionsType<Request> = {
	/** Maximum jobs retained while another matcher job owns the worker pool. */
	readonly limit: number;
	/** Stable job identity used for cancellation and diagnostics. */
	readonly getId: (request: Request) => string;
	/** Lower numeric values are claimed first. */
	readonly getPriority: (request: Request) => number;
	/** Called whenever a queue mutation changes a waiting job's position. */
	readonly onPosition?: QueuePositionType<Request>;
};

/** Bounded matcher queue with explicit cancellation and stable priority order. */
export type QueueType<Request, Result> = {
	/** Number of jobs currently waiting for matcher capacity. */
	readonly size: number;
	/** Add one request or reject immediately when the queue is full. */
	add(request: Request): Promise<Result>;
	/** Remove every queued copy of a job and reject its waiting caller. */
	cancel(jobId: string): boolean;
	/** Claim the highest-priority queued job, preserving FIFO order within a priority. */
	take(): QueueEntryType<Request, Result> | undefined;
	/** Reject and release every queued request during host disposal. */
	clear(reason?: string): void;
};

/** Internal scheduling fields retained only while a request waits for capacity. */
type InternalEntryType<Request, Result> = QueueEntryType<Request, Result> & {
	/** Numeric mode priority captured when the request enters the queue. */
	readonly priority: number;
	/** Monotonic insertion order that preserves FIFO behavior inside one priority. */
	readonly sequence: number;
};

/**
 * Create a bounded in-memory queue for offscreen matcher jobs.
 *
 * Observation batches can retain large strings and evidence objects. The queue is
 * therefore a safety-limited ownership structure rather than an unbounded array.
 * Reaching the limit rejects new work instead of retaining another full batch and
 * silently increasing extension memory. The limit is a safety invariant, not a
 * throughput tuning value; benchmarks can justify a lower value later.
 */
export function create<Request, Result>(options: QueueOptionsType<Request>): QueueType<Request, Result> {
	const entries: InternalEntryType<Request, Result>[] = [];
	let sequence = 0;

	/** Order by semantic priority, then preserve stable FIFO insertion order. */
	function sort(): void {
		entries.sort((left, right) => left.priority - right.priority || left.sequence - right.sequence);
	}

	/** Publish positions after every queue mutation so UI state cannot drift. */
	function publish(): void {
		sort();
		const depth = entries.length;
		for (const [index, entry] of entries.entries()) {
			options.onPosition?.(entry.request, index + 1, depth, entry.queuedAt);
		}
	}

	return {
		get size() {
			return entries.length;
		},

		add(request) {
			if (entries.length >= options.limit) return Promise.reject(new QueueFullError(options.limit));
			return new Promise<Result>((resolve, reject) => {
				entries.push({
					request,
					queuedAt: Date.now(),
					priority: options.getPriority(request),
					sequence: sequence++,
					resolve,
					reject,
				});
				publish();
			});
		},

		cancel(jobId) {
			let canceled = false;
			for (let index = entries.length - 1; index >= 0; index -= 1) {
				if (options.getId(entries[index]!.request) !== jobId) continue;
				const [entry] = entries.splice(index, 1);
				entry?.reject(new Error('Matcher job was canceled before dispatch.'));
				canceled = true;
			}
			if (canceled) publish();
			return canceled;
		},

		take() {
			if (entries.length === 0) return undefined;
			sort();
			const entry = entries.shift();
			publish();
			return entry;
		},

		clear(reason = 'Matcher queue was disposed.') {
			for (const entry of entries.splice(0)) entry.reject(new Error(reason));
		},
	};
}
