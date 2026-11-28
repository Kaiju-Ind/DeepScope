import type { Adapter, Message, MessageMeta, OnMessage, SendMessage } from 'comctx';
import { browser, type Browser } from 'wxt/browser';

export const CONTENT_RPC_NAMESPACE = 'kaiju-deepscope.content-rpc.v1';
export const CONTENT_RPC_CHANNEL = 'content-rpc';

export type ContentRpcMeta = MessageMeta & {
	channel: typeof CONTENT_RPC_CHANNEL;
	tab_id: number;
	frame_id: number;
	sender_url?: string;
	sender_origin?: string;
	document_id?: string;
	document_lifecycle?: string;
};

type SenderWithDocumentMetadata = Browser.runtime.MessageSender & {
	documentId?: string;
	documentLifecycle?: string;
	origin?: string;
};

type ContentMessage = Partial<Message<ContentRpcMeta>>;

/** Bind content RPC to one tab, frame and optional document identity so navigation cannot silently redirect a reply. */
export function createContentClientAdapter(
  tabId: number,
	frameId = 0,
	documentId?: string,
): Adapter<ContentRpcMeta> {
	/** Address the selected frame and document explicitly while carrying the same identity in the RPC envelope. */
	const sendMessage: SendMessage<ContentRpcMeta> = async (message) => {
		const options = {
			frameId,
			...(documentId ? { documentId } : {}),
		} as Parameters<typeof browser.tabs.sendMessage>[2];

		await browser.tabs.sendMessage(
			tabId,
			{
				...message,
				meta: {
					...message.meta,
					channel: CONTENT_RPC_CHANNEL,
					tab_id: tabId,
					frame_id: frameId,
					...(documentId ? { document_id: documentId } : {}),
				},
			},
			options,
		);
	};

  /** Subscribe to responses for this content target and give listener cleanup back to the RPC owner. */
  const onMessage: OnMessage<ContentRpcMeta> = (callback) => {
	/** Reject responses from another tab, frame or pinned document and attach browser-supplied document metadata. */
	const listener = (rawMessage: unknown, sender: Browser.runtime.MessageSender) => {
		const message = rawMessage as ContentMessage;

		if (!isContentRpcMessage(message)) {
			return;
		}

		if (sender.tab?.id !== tabId) {
			return;
		}

		if (sender.frameId !== frameId) {
			return;
		}

		const senderDocument = getSenderDocumentMetadata(sender);
		if (documentId && senderDocument.document_id !== documentId) {
			return;
		}

		callback({
			...message,
			meta: {
				...message.meta,
				channel: CONTENT_RPC_CHANNEL,
				tab_id: tabId,
				frame_id: frameId,
				sender_url: sender.url,
				...senderDocument,
			},
		});
	};

	browser.runtime.onMessage.addListener(listener);
	return () => browser.runtime.onMessage.removeListener(listener);
};

  return { sendMessage, onMessage };
}

/** Expose the current content document as an RPC server without owning its observation runtime or invalidation lifetime. */
export function createContentServerAdapter(): Adapter<ContentRpcMeta> {
  /** Send a content reply through extension messaging with the required content channel marker. */
  const sendMessage: SendMessage<ContentRpcMeta> = async (message) => {
    await browser.runtime.sendMessage({
      ...message,
      meta: {
        ...message.meta,
        channel: CONTENT_RPC_CHANNEL,
      },
    });
  };

  /** Register one content request listener and return its removal function to the caller. */
  const onMessage: OnMessage<ContentRpcMeta> = (callback) => {
    /** Accept content-channel requests and prevent a child frame from answering a request addressed to the top document. */
    const listener = (rawMessage: unknown) => {
      const message = rawMessage as ContentMessage;

      if (!isContentRpcMessage(message)) {
        return;
      }

      // This RPC currently collects the top document only. If this content script
      // ever starts running in all frames, ignore top-frame requests in children.
      if (message.meta?.frame_id === 0 && globalThis.window?.top !== globalThis.window) {
        return;
      }

      callback(message);
    };

    browser.runtime.onMessage.addListener(listener);
    return () => browser.runtime.onMessage.removeListener(listener);
  };

  return { sendMessage, onMessage };
}

/** Require both namespace and channel markers before interpreting a message as content RPC. */
function isContentRpcMessage(message: ContentMessage): boolean {
	return (
		message.namespace === CONTENT_RPC_NAMESPACE &&
		message.meta?.channel === CONTENT_RPC_CHANNEL
	);
}

/** Copy optional browser document metadata without inventing an identity on runtimes that omit it. */
function getSenderDocumentMetadata(sender: Browser.runtime.MessageSender) {
	const extendedSender = sender as SenderWithDocumentMetadata;
	return {
		sender_origin: extendedSender.origin,
		document_id: extendedSender.documentId,
		document_lifecycle: extendedSender.documentLifecycle,
	};
}