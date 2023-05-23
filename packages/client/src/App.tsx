import { useMUD } from "./MUDContext";
import { CommitmentBuilder } from "./components/CommitmentBuilder";

import { AccountStatus } from "./components/AccountStatus";
import { ActionButton } from "./components/Util";

import { useState } from "react";

import { ProgressBoard } from "./components/ProgressBoard";
import { Dialog } from "@headlessui/react";
import { Leaderboard } from "./components/Leaderboard";
import { WelcomeMessage } from "./components/WelcomeMessage";
import { GithubLogo, TwitterLogo } from "./components/SvgLogos";

const DialogStyle =
  "absolute shadow-xl left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-zinc-900 p-5 bg-opacity-90 backdrop-blur-sm";

export const App = () => {
  const {
    components: { Commitment },
  } = useMUD();

  const [showBuilder, setShowBuilder] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <>
      <Dialog
        className={DialogStyle}
        open={showWelcome}
        onClose={() => setShowWelcome(false)}
      >
        <Dialog.Panel>
          <WelcomeMessage />
        </Dialog.Panel>
      </Dialog>

      <Dialog
        open={showBuilder}
        onClose={() => setShowBuilder(false)}
        className={DialogStyle}
      >
        <Dialog.Panel>
          <Dialog.Title className="px-2 py-1 text-center text-xl font-bold text-zinc-200">
            Create a Commitment
          </Dialog.Title>
          <div className="px-2">
            <CommitmentBuilder onCreated={() => setShowBuilder(false)} />
          </div>
        </Dialog.Panel>
      </Dialog>

      <div className="flex h-full flex-col justify-center">
        <div className=" grid grid-cols-[1fr] grid-rows-3 items-center justify-between px-2 md:h-14 md:grid-cols-[1fr,auto,1fr] md:grid-rows-1">
          <div className="justify-self-center md:justify-self-start">
            <AccountStatus />
          </div>

          <h1 className="row-start-1 justify-self-center text-lg font-bold text-zinc-100 md:col-start-2">
            Pledger - Board
          </h1>

          <div className=" flex justify-center gap-2 md:justify-end">
            <ActionButton
              klass="p-1 text-sm justify-self-end"
              onClick={() => setShowBuilder(!showBuilder)}
            >
              {showBuilder ? "Close Builder" : "Build Commitment"}
            </ActionButton>
            <ActionButton
              klass="p-1 text-sm justify-self-end border-none"
              onClick={() => setShowWelcome(!showWelcome)}
            >
              ?
            </ActionButton>
          </div>
        </div>

        <ProgressBoard klass="flex-grow overflow-auto rounded-2xl" />

        <div>
          <Leaderboard />
          <div className="flex w-full justify-center gap-3 pb-2 text-xs text-zinc-300">
            <p>Created By Jackson Ernst</p>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/jaxernst"
              className="text-violet-600 underline"
            >
              <GithubLogo />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/yachtyyachty"
              className="text-violet-600 underline"
            >
              <TwitterLogo />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
