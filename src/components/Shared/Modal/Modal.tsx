"use client";

import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { type ReactNode, useEffect, useState } from "react";

interface ModalProps {
  open: boolean;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode | false;
  onCancel: () => void;
  onOk?: () => void;
  okText?: string;
  cancelText?: string;
  confirmLoading?: boolean;
  width?: number;
}

const Modal = ({
  open,
  title,
  children,
  footer,
  onCancel,
  onOk,
  okText = "OK",
  cancelText = "Cancel",
  confirmLoading,
  width = 640,
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="relative w-full max-w-[calc(100%-2rem)] rounded-3xl bg-white shadow-2xl ring-1 ring-black/5"
        style={{ width }}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="text-lg font-semibold text-slate-950">{title}</div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <IoClose size={20} />
          </button>
        </div>

        <div className="space-y-4 px-6 py-6">{children}</div>

        {footer !== false ? (
          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
            {footer ? (
              footer
            ) : (
              <>
                <button
                  type="button"
                  onClick={onCancel}
                  className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  {cancelText}
                </button>
                {onOk ? (
                  <button
                    type="button"
                    onClick={onOk}
                    disabled={confirmLoading}
                    className="rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
                  >
                    {confirmLoading ? "Saving..." : okText}
                  </button>
                ) : null}
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
