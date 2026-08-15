# DSH Orbit UI

`@local/dsh-ui-orbit` replaces the default DeepSeek Harness root layout while
keeping the shipped sidebar, conversation, details, settings, workspace, and
tool-view plugins mounted in their original slots.

The shell adds:

- a plugin-first navigation rail;
- a live client slot graph and plugin inventory;
- a GitHub `dsh-plugin` community market entry with an explicit Agent review/install trust boundary;
- a runtime change timeline;
- responsive desktop, tablet, and mobile layouts;
- pointer-following glass light, interruptible spring feedback, and reduced
  motion/transparency/contrast fallbacks.

It is loaded by disabling the shipped `ui-layout` row and inserting
`@local/dsh-ui-orbit` in the `web` profile patch.

`profile-cordis.patch.yml` contains the deployment patch used by the local
profile.
