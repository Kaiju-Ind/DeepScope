import type { Adapter, Message, MessageMeta, OnMessage, SendMessage } from 'comctx';
import { browser, type Browser } from 'wxt/browser';

export const CONTENT_RPC_NAMESPACE = 'kaiju-site-scope.content-rpc.v1';
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

export function createContentClientAdapter(
  tabId: number,
	frameId = 0,
	documentId?: string,
): Adapter<ContentRpcMeta> {
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

  const onMessage: OnMessage<ContentRpcMeta> = (callback) => {
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

export function createContentServerAdapter(): Adapter<ContentRpcMeta> {
  const sendMessage: SendMessage<ContentRpcMeta> = async (message) => {
    await browser.runtime.sendMessage({
      ...message,
      meta: {
        ...message.meta,
        channel: CONTENT_RPC_CHANNEL,
      },
    });
  };

  const onMessage: OnMessage<ContentRpcMeta> = (callback) => {
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

function isContentRpcMessage(message: ContentMessage): boolean {
	return (
		message.namespace === CONTENT_RPC_NAMESPACE &&
		message.meta?.channel === CONTENT_RPC_CHANNEL
	);
}

function getSenderDocumentMetadata(sender: Browser.runtime.MessageSender) {
	const extendedSender = sender as SenderWithDocumentMetadata;
	return {
		sender_origin: extendedSender.origin,
		document_id: extendedSender.documentId,
		document_lifecycle: extendedSender.documentLifecycle,
	};
}