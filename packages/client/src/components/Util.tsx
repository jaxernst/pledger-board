import React, { ReactNode } from "react";

type CenteredInPageProps = {
  children: ReactNode;
  klass?: string;
};

export function CenteredInPage({ children, klass }: CenteredInPageProps) {
  return (
    <div className={"flex h-screen items-center justify-center " + klass}>
      <div className="flex h-[600px] w-[600px] flex-col gap-5 rounded-2xl">
        {children}
      </div>
    </div>
  );
}

export function WelcomeMessage() {
  return (
    <h1 className="p-2 text-center text-xl font-bold text-zinc-700">
      welcome to soco
    </h1>
  );
}

export function DescriptionInput({
  onInput,
}: {
  onInput: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        className="w-full rounded-2xl border-2 border-stone-600 bg-cyan-200 p-3 text-zinc-700"
        type="text"
        placeholder="I commit to..."
        onInput={(e) => onInput(e.currentTarget.value)}
      />
      <div></div>
    </div>
  );
}

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
};

export function SubmitButton({ children, onSubmit, klass }: SubmitButtonProps) {
  return (
    <button
      onClick={onSubmit}
      className={
        "rounded-xl border-2 border-zinc-700 bg-violet-700 text-center text-white shadow-lg " +
          klass ?? ""
      }
    >
      {children}
    </button>
  );
}
