import React, { ReactNode } from 'react';

type CenteredInPageProps = {
  children: ReactNode;
};

export function CenteredInPage({ children }: CenteredInPageProps) {
  return (
    <div className="box-border flex min-h-screen items-center justify-center">
      <div className="flex flex-col rounded-2xl w-[600px] h-[600px] gap-5">
        {children}
      </div>
    </div>
  );
}

export function WelcomeMessage() {
  return (
    <h1 className="text-zinc-700 text-xl text-center font-bold p-2">
      welcome to soco
    </h1>
  );
}

export function DescriptionInput({ onInput }: { onInput: (v: string) => void}) {
  return (
    <div className="flex gap-2 items-center">
      <input
        className="w-full p-3 text-zinc-700 bg-cyan-200 border-2 border-stone-600 rounded-2xl"
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
  label: string
};

export function AutoRow({ children, label }: AutoRowProps) {
  return  (<>
    {label ? <div>{label}</div> : null}
    <div className="flex gap-2">{children}</div>
  </>)
}

type AutoRowItemProps = {
  children: ReactNode;
};

AutoRow.Item = function AutoRowItem({ children }: AutoRowItemProps) {
  return (
    <div className="text-center border-2 border-neutral-700 rounded-xl p-2 min-h-[50px]">
      {children}
    </div>
  );
};

type SubmitButtonProps = {
  children: ReactNode;
  onSubmit: () => void;
};

export function SubmitButton({ children, onSubmit }: SubmitButtonProps) {
  return (
    <button onClick={onSubmit} className="rounded-xl p-2 border-2 border-cyan-200  shadow-lg w-full text-center text-white bg-violet-700">
      {children}
    </button>
  );
}