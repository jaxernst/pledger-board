import React, { ReactNode, useState } from "react";
import { Transition } from "@tailwindui/react";

type AutoColumnProps = {
  children: ReactNode;
};

export function AutoColumn({ children }: AutoColumnProps) {
  return <div className="flex flex-col gap-3">{children}</div>;
}

type AutoRowProps = {
  children: ReactNode;
  label: string;
};

export function AutoRow({ children, label }: AutoRowProps) {
  return (
    <>
      {label ? <div>{label}</div> : null}
      <div className="flex gap-2">{children}</div>
    </>
  );
}

type AutoRowItemProps = {
  children: ReactNode;
};

AutoRow.Item = function AutoRowItem({ children }: AutoRowItemProps) {
  return (
    <div className="min-h-[50px] rounded-xl border-2 border-neutral-700 p-2 text-center">
      {children}
    </div>
  );
};

type SubmitButtonProps = {
  children: ReactNode;
  onSubmit: () => void;
  klass?: string;
  disabled?: boolean;
};

export function SubmitButton({
  children,
  onSubmit,
  klass,
  disabled,
}: SubmitButtonProps) {
  const classExtension = ` ${klass ? klass : ""} ${
    disabled ? "opacity-50" : ""
  } `;
  return (
    <button
      onClick={onSubmit}
      className={
        "rounded-xl border-2 border-zinc-700 bg-violet-500 text-center text-white shadow-lg " +
        classExtension
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}

type ActionButtonProps = {
  children: ReactNode;
  onClick: () => void;
  klass?: string;
};

export function ActionButton({ children, onClick, klass }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-xl border-2 border-violet-700 px-2 text-center font-bold text-zinc-200 shadow-lg " +
          klass ?? ""
      }
    >
      {children}
    </button>
  );
}

export function Collapsible({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
}) {
  const slideTransition = {
    enter: "transform transition ease-in-out duration-300",
    enterFrom: "-translate-x-full",
    enterTo: "translate-x-0",
    leave: "transform transition ease-in-out duration-300",
    leaveFrom: "translate-x-0",
    leaveTo: "-translate-x-full",
  };

  return (
    <Transition show={isOpen} {...slideTransition}>
      {children}
    </Transition>
  );
}
