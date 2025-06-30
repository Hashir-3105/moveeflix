"use client";
import * as React from "react";
import {
  Dialog as DialogPrimitive,
  DialogBackdrop as DialogBackdropPrimitive,
  DialogPanel as DialogPanelPrimitive,
  DialogTitle as DialogTitlePrimitive,
  Description as DialogDescriptionPrimitive,
  CloseButton,
} from "@headlessui/react";
import { motion, AnimatePresence } from "motion/react";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";

function Dialog({ className, ...props }) {
  return (
    <AnimatePresence>
      {props?.open && (
        <DialogPrimitive
          data-slot="dialog"
          className={cn("relative z-50", className)}
          {...props}
          static
        />
      )}
    </AnimatePresence>
  );
}

function DialogBackdrop(props) {
  const { className, as = motion.div, ...rest } = props;

  return (
    <DialogBackdropPrimitive
      key="dialog-backdrop"
      data-slot="dialog-backdrop"
      className={cn("fixed inset-0 z-50 bg-black/80", className)}
      as={as}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      {...rest}
    />
  );
}

function DialogPanel(props) {
  const {
    children,
    className,
    as = motion.div,
    from = "right",
    transition = { type: "spring", stiffness: 150, damping: 25 },
    ...rest
  } = props;

  const initialRotation =
    from === "right" || from === "left" ? "20deg" : "-20deg";
  const isVertical = from === "right" || from === "bottom";
  const rotateAxis = isVertical ? "rotateX" : "rotateY";

  return (
    <DialogPanelPrimitive
      key="dialog-panel"
      data-slot="dialog-panel"
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg rounded-xl",
        className
      )}
      as={as}
      initial={{
        opacity: 0,
        filter: "blur(4px)",
        transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
        transition,
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        transform: `perspective(500px) ${rotateAxis}(0deg) scale(1)`,
        transition,
      }}
      exit={{
        opacity: 0,
        filter: "blur(4px)",
        transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
        transition,
      }}
      {...rest}
    >
      {(bag) => (
        <>
          {typeof children === "function" ? children(bag) : children}

          <CloseButton
            data-slot="dialog-panel-close"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </CloseButton>
        </>
      )}
    </DialogPanelPrimitive>
  );
}

function DialogHeader({ className, as: Component = "div", ...props }) {
  return (
    <Component
      data-slot="dialog-header"
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className
      )}
      {...props}
    />
  );
}

function DialogFooter({ className, as: Component = "div", ...props }) {
  return (
    <Component
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end gap-2",
        className
      )}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }) {
  return (
    <DialogTitlePrimitive
      data-slot="dialog-title"
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }) {
  return (
    <DialogDescriptionPrimitive
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
};
