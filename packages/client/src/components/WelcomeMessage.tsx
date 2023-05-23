export const WelcomeMessage = () => {
  return (
    <div className="flex max-h-[600px] flex-col gap-1 overflow-y-auto text-left text-zinc-200">
      <h1 className="whitespace-nowrap p-2 px-10 text-center text-xl font-bold">
        Welcome to Pledger - Board
      </h1>
      <i className="text-center">
        A fully onchain social game built to make high achievement fun.
      </i>
      <p className="py-4">
        <span className="text-lg font-bold text-violet-500">Goal:</span> Make
        public, proveable commitments to global commitment board. Submit photo
        proof of yourself completing commitments and earn reputation for your
        high achievement{" "}
      </p>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-violet-500">How it works</h2>
        <p>
          The core component of Pledger - Board is the commitment. A commitment
          represents an agreement to do/accomplish something in the future.
          Commitments are created, posted, and rated in public.
        </p>
        <p>
          In order to prove completion of a commitment, users must submit a
          photo, or url before their {"commitment's"} deadline.
        </p>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <h2 className="text-lg font-bold text-violet-500">
          Ratings and Attestions
        </h2>
        <p>
          After a commitment is created, it will be rateable by any user. Once
          the creator submits proof of completion, any user who rated the
          commitment can attest to whether the submitted proof sufficiently
          statisies the commitment task. For each proof attestation, the
          corresponding {"'rating'"} from the attestor is converted into
          reputation.
        </p>
      </div>
    </div>
  );
};
