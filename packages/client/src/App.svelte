<script lang="ts">
  import { mount as mountDevTools } from "@latticexyz/dev-tools";
  import { derived, writable } from "svelte/store";
  import { onMount } from "svelte";
  import { setupNetwork } from "./mud/setupNetwork";
  import { createSystemCalls } from "./mud/createSystemCalls";
  import { createClientComponents } from "./mud/createClientComponents";
  import { Has, runQuery } from "@latticexyz/recs";

  const network = writable<
    undefined | Awaited<ReturnType<typeof setupNetwork>>
  >();

  const components = derived(
    network,
    (net) => net && createClientComponents(net)
  );

  const counter = writable(0);
  const commitments = writable<string[]>([]);

  let listening = false;
  components.subscribe((comps) => {
    if (listening || !comps) return;
    listening = true;

    comps.Counter.update$.subscribe((update) => {
      const [nextValue] = update.value;
      counter.set(nextValue?.value || 0);
    });

    comps.Commitment.update$.subscribe((update) => {
      console.log("commitment updated");
      console.log(update);
      commitments.update((commitments) => {
        return [...commitments, update.entity];
      });
    });
  });

  const systemCalls = derived(
    [network, components],
    ([net, comps]) => net && comps && createSystemCalls(net, comps)
  );

  onMount(async () => {
    mountDevTools();
    network.set(await setupNetwork());
  });

  let commitmentDescription = "";
</script>

<main class="background h-full bg-slate-400">
  <div class="box-border flex min-h-screen items-center justify-center">
    <div class="flex flex-col rounded-2xl w-[600px] h-[600px] gap-2">
      <div class=" flex gap-2">
        <input
          class=" w-full p-3 text-black bg-yellow-100 border-2 border-stone-600 rounded-2xl"
          type="text"
          placeholder="Describe your commitment"
          bind:value={commitmentDescription}
        />
        <button
          class="bg-slate-800 p-3 rounded-2xl"
          on:click={() => $systemCalls?.createCommitment(commitmentDescription)}
          >Post</button
        >
      </div>
      Commitments with descriptions
      <div>
        {matches}
      </div>
    </div>
  </div>
</main>
