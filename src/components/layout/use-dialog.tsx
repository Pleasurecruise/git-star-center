import { useState, useRef } from "react";

interface Form {
    reset: () => void;
}

export function useDialog(form: Form | null) {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);

    function trigger() {
        setIsOpen(true);
    }

    function dismiss() {
        setIsOpen(false);
        triggerRef.current?.focus();
        form?.reset();
    }

    return {
        triggerProps: {
            ref: triggerRef,
            onClick: trigger,
        },
        dialogProps: {
            open: isOpen,
            onOpenChange: (open: boolean) => {
                if (open) trigger();
                else dismiss();
            },
        },
        trigger,
        dismiss,
    };
}
