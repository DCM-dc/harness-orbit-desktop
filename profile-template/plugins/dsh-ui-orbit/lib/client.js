window.__ModuleLoader__.load({
  id: "@local/dsh-ui-orbit",
  factory: (require) => {
    const module = { exports: {} };
    const exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

    const React = require("react");
    const h = React.createElement;

    const css = `
      .dsh-orbit-root {
        --orbit-bg: var(--dsw-alias-bg-base, light-dark(#f4f7fb, #07090d));
        --orbit-surface: var(--dsw-alias-bg-elevated, light-dark(#ffffff, #11151c));
        --orbit-surface-2: var(--dsw-specific-sidebar-fill, light-dark(#f7f9fc, #0d1117));
        --orbit-text: var(--dsw-alias-label-primary, light-dark(#141820, #f5f7fa));
        --orbit-muted: var(--dsw-alias-label-secondary, light-dark(#667085, #929cac));
        --orbit-border: var(--dsw-alias-border-l1, light-dark(rgba(20, 28, 40, .12), rgba(255, 255, 255, .09)));
        --orbit-blue: light-dark(#2f6feb, #73a7ff);
        --orbit-cyan: light-dark(#078a9d, #62d8e9);
        --orbit-green: light-dark(#11875d, #59d19d);
        --orbit-purple: light-dark(#7553ca, #ac8cff);
        --orbit-danger: light-dark(#c93d4d, #ff7b8a);
        --orbit-pointer-x: 58%;
        --orbit-pointer-y: 16%;
        --orbit-session-width: 276px;
        --orbit-details-width: 0px;
        color: var(--orbit-text);
        background: var(--orbit-bg);
        height: 100%;
        min-height: 0;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-optical-sizing: auto;
        overflow: hidden;
        overflow: clip;
        position: relative;
        isolation: isolate;
      }

      .dsh-orbit-root::before {
        content: "";
        position: absolute;
        z-index: -1;
        inset: -28%;
        pointer-events: none;
        opacity: .72;
        background:
          radial-gradient(circle at var(--orbit-pointer-x) var(--orbit-pointer-y), color-mix(in srgb, var(--orbit-cyan) 13%, transparent), transparent 21%),
          radial-gradient(circle at 80% 80%, color-mix(in srgb, var(--orbit-purple) 9%, transparent), transparent 23%);
        transform: translateZ(0);
      }

      .dsh-orbit-root *, .dsh-orbit-root *::before, .dsh-orbit-root *::after { box-sizing: border-box; }
      .dsh-orbit-root button, .dsh-orbit-root input { font: inherit; }

      .dsh-orbit-topbar {
        height: 58px;
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 0 17px;
        border-bottom: 1px solid var(--orbit-border);
        background: color-mix(in srgb, var(--orbit-surface) 76%, transparent);
        backdrop-filter: blur(24px) saturate(175%);
        position: relative;
        z-index: 30;
      }

      .dsh-orbit-brand {
        display: flex;
        align-items: center;
        gap: 9px;
        min-width: 185px;
        white-space: nowrap;
        font-weight: 500;
        letter-spacing: -.025em;
      }

      .dsh-orbit-brand-mark {
        width: 30px;
        height: 30px;
        border-radius: 10px;
        display: grid;
        place-items: center;
        color: #07101d;
        background: linear-gradient(145deg, #9bc6ff, #62dbdf);
        box-shadow: 0 0 24px rgba(94, 182, 255, .23), inset 0 1px 0 rgba(255, 255, 255, .55);
      }

      .dsh-orbit-brand-sub { color: var(--orbit-muted); font-weight: 400; }

      .dsh-orbit-crumb {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
        margin-right: auto;
        color: var(--orbit-muted);
      }

      .dsh-orbit-crumb strong {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--orbit-text);
        font-weight: 500;
      }

      .dsh-orbit-health {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 7px 10px;
        border: 1px solid color-mix(in srgb, var(--orbit-border) 80%, transparent);
        border-radius: 999px;
        color: var(--orbit-muted);
        background: color-mix(in srgb, var(--orbit-surface) 66%, transparent);
        backdrop-filter: blur(15px) saturate(165%);
        white-space: nowrap;
      }

      .dsh-orbit-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--orbit-green);
        box-shadow: 0 0 0 4px color-mix(in srgb, var(--orbit-green) 14%, transparent);
        flex: none;
      }

      .dsh-orbit-dot[data-running="true"] {
        background: var(--orbit-cyan);
        box-shadow: 0 0 0 4px color-mix(in srgb, var(--orbit-cyan) 15%, transparent), 0 0 18px color-mix(in srgb, var(--orbit-cyan) 55%, transparent);
      }

      .dsh-orbit-top-action {
        --orbit-press-scale: 1;
        width: 34px;
        height: 34px;
        display: grid;
        place-items: center;
        border: 1px solid var(--orbit-border);
        border-radius: 11px;
        color: var(--orbit-muted);
        background: color-mix(in srgb, var(--orbit-surface) 68%, transparent);
        cursor: pointer;
        transform: scale(var(--orbit-press-scale));
        will-change: transform;
      }

      .dsh-orbit-body {
        height: calc(100% - 58px);
        min-height: 0;
        display: grid;
        grid-template-columns: 72px var(--orbit-session-width) minmax(0, 1fr) var(--orbit-details-width);
        transition: grid-template-columns 360ms cubic-bezier(.22, .78, .22, 1);
        position: relative;
        overflow: clip;
      }

      .dsh-orbit-nav {
        min-height: 0;
        padding: 12px 9px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        border-right: 1px solid var(--orbit-border);
        background: color-mix(in srgb, var(--orbit-surface-2) 78%, transparent);
        backdrop-filter: blur(22px) saturate(170%);
        position: relative;
        z-index: 20;
      }

      .dsh-orbit-nav-list {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
      }

      .dsh-orbit-nav-glass {
        position: absolute;
        z-index: 0;
        top: 0;
        left: 3px;
        right: 3px;
        height: 46px;
        border: 1px solid color-mix(in srgb, var(--orbit-border) 82%, rgba(255, 255, 255, .22));
        border-radius: 15px;
        background: color-mix(in srgb, var(--orbit-surface) 67%, transparent);
        box-shadow: 0 10px 28px rgba(0, 0, 0, .13), inset 0 1px 0 rgba(255, 255, 255, .11);
        backdrop-filter: blur(18px) saturate(180%);
        pointer-events: none;
        will-change: transform;
      }

      .dsh-orbit-nav-button {
        --orbit-press-scale: 1;
        width: 54px;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 15px;
        color: var(--orbit-muted);
        background: transparent;
        cursor: pointer;
        position: relative;
        z-index: 1;
        transform: scale(var(--orbit-press-scale));
        will-change: transform;
      }

      .dsh-orbit-nav-button[aria-pressed="true"], .dsh-orbit-nav-button:hover { color: var(--orbit-text); }

      .dsh-orbit-nav-button::after {
        content: attr(aria-label);
        position: absolute;
        left: calc(100% + 10px);
        top: 50%;
        padding: 6px 8px;
        border: 1px solid var(--orbit-border);
        border-radius: 8px;
        color: var(--orbit-text);
        background: var(--orbit-surface);
        box-shadow: 0 10px 30px rgba(0, 0, 0, .18);
        opacity: 0;
        pointer-events: none;
        transform: translate3d(-4px, -50%, 0) scale(.96);
        transition: opacity 140ms ease, transform 180ms cubic-bezier(.2, .8, .2, 1);
        white-space: nowrap;
      }

      .dsh-orbit-nav-button:hover::after { opacity: 1; transform: translate3d(0, -50%, 0) scale(1); }
      .dsh-orbit-nav-spacer { flex: 1; }

      .dsh-orbit-session-pane {
        min-width: 0;
        height: 100%;
        overflow: hidden;
        border-right: 1px solid var(--orbit-border);
        background: color-mix(in srgb, var(--orbit-surface-2) 88%, transparent);
        opacity: 1;
        transition: opacity 180ms ease;
      }

      .dsh-orbit-session-pane[data-open="false"] { opacity: 0; pointer-events: none; }
      .dsh-orbit-session-pane > * { height: 100%; }

      .dsh-orbit-stage {
        min-width: 0;
        min-height: 0;
        overflow: hidden;
        overflow: clip;
        position: relative;
        background: color-mix(in srgb, var(--orbit-bg) 86%, transparent);
      }

      .dsh-orbit-view {
        position: absolute;
        inset: 0;
        min-width: 0;
        min-height: 0;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translate3d(0, 12px, 0) scale(.986);
        filter: blur(5px);
        transition: opacity 220ms ease, transform 360ms cubic-bezier(.2, .82, .22, 1), filter 260ms ease, visibility 0s linear 360ms;
        will-change: transform, opacity, filter;
      }

      .dsh-orbit-view[data-active="true"] {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translate3d(0, 0, 0) scale(1);
        filter: blur(0);
        transition-delay: 0s;
      }

      .dsh-orbit-chat-view > * { height: 100%; }

      .dsh-orbit-details-pane {
        min-width: 0;
        height: 100%;
        overflow: hidden;
        border-left: 1px solid var(--orbit-border);
        background: color-mix(in srgb, var(--orbit-surface) 86%, transparent);
        backdrop-filter: blur(22px) saturate(155%);
        opacity: 1;
        transition: opacity 180ms ease;
      }

      .dsh-orbit-details-pane[data-open="false"] { opacity: 0; pointer-events: none; }
      .dsh-orbit-details-pane > * { height: 100%; }

      .dsh-orbit-overlay {
        position: absolute;
        z-index: 60;
        inset: 0;
        pointer-events: none;
      }

      .dsh-orbit-overlay > * { pointer-events: auto; }

      .dsh-orbit-page {
        height: 100%;
        min-height: 0;
        overflow: auto;
        padding: clamp(18px, 3vw, 34px);
        scrollbar-gutter: stable;
      }

      .dsh-orbit-page-head {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 22px;
      }

      .dsh-orbit-page-head h1 {
        margin: 0;
        font-size: clamp(1.55rem, 3.2vw, 2.4rem);
        line-height: 1.04;
        letter-spacing: -.045em;
        font-weight: 500;
      }

      .dsh-orbit-page-head p { margin: 8px 0 0; color: var(--orbit-muted); }

      .dsh-orbit-status-chip {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 7px 10px;
        border: 1px solid var(--orbit-border);
        border-radius: 999px;
        color: var(--orbit-muted);
        background: color-mix(in srgb, var(--orbit-surface) 72%, transparent);
        backdrop-filter: blur(16px) saturate(165%);
        white-space: nowrap;
      }

      .dsh-orbit-graph-layout {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 286px;
        gap: 16px;
        align-items: stretch;
      }

      .dsh-orbit-graph-canvas {
        --orbit-graph-x: 50%;
        --orbit-graph-y: 42%;
        min-height: 430px;
        border: 1px solid var(--orbit-border);
        border-radius: 22px;
        background:
          radial-gradient(circle at var(--orbit-graph-x) var(--orbit-graph-y), color-mix(in srgb, var(--orbit-blue) 13%, transparent), transparent 23%),
          linear-gradient(var(--orbit-border) 1px, transparent 1px),
          linear-gradient(90deg, var(--orbit-border) 1px, transparent 1px),
          color-mix(in srgb, var(--orbit-surface) 68%, transparent);
        background-size: auto, 30px 30px, 30px 30px, auto;
        overflow: hidden;
        position: relative;
      }

      .dsh-orbit-graph-canvas::before {
        content: "LIVE CLIENT COMPOSITION";
        position: absolute;
        z-index: 3;
        top: 16px;
        left: 18px;
        color: var(--orbit-muted);
        font-size: 11px;
        letter-spacing: .11em;
      }

      .dsh-orbit-graph-lines {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }

      .dsh-orbit-graph-lines path {
        fill: none;
        stroke: color-mix(in srgb, var(--orbit-blue) 53%, transparent);
        stroke-width: 1.3;
        vector-effect: non-scaling-stroke;
      }

      .dsh-orbit-graph-canvas[data-running="true"] .dsh-orbit-graph-lines path {
        stroke: var(--orbit-cyan);
        stroke-dasharray: 5 10;
        animation: dsh-orbit-flow 900ms linear infinite;
        filter: drop-shadow(0 0 4px color-mix(in srgb, var(--orbit-cyan) 62%, transparent));
      }

      @keyframes dsh-orbit-flow { to { stroke-dashoffset: -30; } }

      .dsh-orbit-graph-node {
        --orbit-press-scale: 1;
        position: absolute;
        z-index: 4;
        width: clamp(126px, 19%, 168px);
        min-height: 74px;
        padding: 11px 12px;
        border: 1px solid var(--orbit-border);
        border-radius: 16px;
        color: var(--orbit-text);
        background: color-mix(in srgb, var(--orbit-surface) 91%, transparent);
        box-shadow: 0 14px 42px rgba(0, 0, 0, .16), inset 0 1px 0 rgba(255, 255, 255, .07);
        backdrop-filter: blur(18px) saturate(160%);
        text-align: left;
        cursor: pointer;
        transform: translate(-50%, -50%) scale(var(--orbit-press-scale));
        transition: border-color 170ms ease, box-shadow 190ms ease, background 170ms ease;
        will-change: transform, box-shadow;
      }

      .dsh-orbit-graph-node:hover { border-color: color-mix(in srgb, var(--orbit-blue) 55%, var(--orbit-border)); }
      .dsh-orbit-graph-node[aria-pressed="true"] {
        border-color: var(--orbit-blue);
        box-shadow: 0 0 0 4px color-mix(in srgb, var(--orbit-blue) 12%, transparent), 0 18px 46px rgba(0, 0, 0, .21);
      }

      .dsh-orbit-graph-node[data-root="true"] {
        background: color-mix(in srgb, var(--orbit-blue) 12%, var(--orbit-surface));
      }

      .dsh-orbit-node-title {
        display: flex;
        align-items: center;
        gap: 7px;
        min-width: 0;
        font-weight: 500;
      }

      .dsh-orbit-node-title span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .dsh-orbit-node-meta {
        margin-top: 7px;
        color: var(--orbit-muted);
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .dsh-orbit-inspector {
        min-height: 430px;
        padding: 18px;
        border: 1px solid var(--orbit-border);
        border-radius: 22px;
        background: color-mix(in srgb, var(--orbit-surface) 79%, transparent);
        box-shadow: 0 18px 55px rgba(0, 0, 0, .12), inset 0 1px 0 rgba(255, 255, 255, .08);
        backdrop-filter: blur(24px) saturate(165%);
        overflow: hidden;
        position: relative;
      }

      .dsh-orbit-inspector::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: .5;
        background: linear-gradient(125deg, rgba(255, 255, 255, .09), transparent 31%, transparent 72%, color-mix(in srgb, var(--orbit-blue) 8%, transparent));
      }

      .dsh-orbit-inspector-inner {
        position: relative;
        animation: dsh-orbit-materialize 340ms cubic-bezier(.2, .82, .22, 1) both;
        transform-origin: right center;
      }

      @keyframes dsh-orbit-materialize {
        from { opacity: .35; transform: translate3d(13px, 0, 0) scale(.975); filter: blur(8px); }
        to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); filter: blur(0); }
      }

      .dsh-orbit-inspector-label {
        color: var(--orbit-muted);
        font-size: 11px;
        letter-spacing: .1em;
        text-transform: uppercase;
      }

      .dsh-orbit-inspector-icon {
        width: 44px;
        height: 44px;
        display: grid;
        place-items: center;
        margin: 17px 0 12px;
        border-radius: 14px;
        color: var(--orbit-blue);
        background: color-mix(in srgb, var(--orbit-blue) 13%, transparent);
      }

      .dsh-orbit-inspector h2 {
        margin: 0;
        font-size: 20px;
        line-height: 1.15;
        letter-spacing: -.025em;
        font-weight: 500;
        overflow-wrap: anywhere;
      }

      .dsh-orbit-inspector-sub { margin: 7px 0 18px; color: var(--orbit-muted); }

      .dsh-orbit-inspector-section {
        padding: 14px 0;
        border-top: 1px solid var(--orbit-border);
      }

      .dsh-orbit-info-row {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        margin: 9px 0;
      }

      .dsh-orbit-info-row span { color: var(--orbit-muted); }

      .dsh-orbit-code {
        padding: 4px 6px;
        border-radius: 7px;
        color: var(--orbit-text);
        background: color-mix(in srgb, var(--orbit-text) 6%, transparent);
        font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
        font-size: 11px;
        overflow-wrap: anywhere;
      }

      .dsh-orbit-list {
        display: grid;
        gap: 9px;
      }

      .dsh-orbit-market-card {
        display: grid;
        grid-template-columns: 44px minmax(0, 1fr) auto;
        align-items: center;
        gap: 14px;
        margin-bottom: 16px;
        padding: 15px 16px;
        border: 1px solid color-mix(in srgb, var(--orbit-blue) 32%, var(--orbit-border));
        border-radius: 19px;
        background:
          linear-gradient(120deg, color-mix(in srgb, var(--orbit-blue) 10%, transparent), transparent 48%),
          color-mix(in srgb, var(--orbit-surface) 76%, transparent);
        box-shadow: 0 16px 46px rgba(0, 0, 0, .12), inset 0 1px 0 rgba(255, 255, 255, .08);
        backdrop-filter: blur(22px) saturate(165%);
      }

      .dsh-orbit-market-icon {
        width: 44px;
        height: 44px;
        display: grid;
        place-items: center;
        border-radius: 14px;
        color: var(--orbit-blue);
        background: color-mix(in srgb, var(--orbit-blue) 13%, transparent);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08);
      }

      .dsh-orbit-market-title {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        font-weight: 550;
        letter-spacing: -.015em;
      }

      .dsh-orbit-market-copy { margin-top: 4px; color: var(--orbit-muted); font-size: 13px; line-height: 1.45; }

      .dsh-orbit-market-badge {
        padding: 3px 7px;
        border-radius: 999px;
        color: var(--orbit-cyan);
        background: color-mix(in srgb, var(--orbit-cyan) 10%, transparent);
        font-size: 11px;
        font-weight: 500;
      }

      .dsh-orbit-market-link {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        min-height: 38px;
        padding: 0 13px;
        border: 1px solid color-mix(in srgb, var(--orbit-blue) 44%, var(--orbit-border));
        border-radius: 12px;
        color: var(--orbit-text);
        background: color-mix(in srgb, var(--orbit-blue) 10%, var(--orbit-surface));
        text-decoration: none;
        white-space: nowrap;
        transition: transform 180ms cubic-bezier(.2, .82, .22, 1), border-color 160ms ease, background 160ms ease;
      }

      .dsh-orbit-market-link:hover { transform: translateY(-1px); border-color: var(--orbit-blue); background: color-mix(in srgb, var(--orbit-blue) 15%, var(--orbit-surface)); }
      .dsh-orbit-market-link:active { transform: scale(.975); }
      .dsh-orbit-market-link:focus-visible { outline: 2px solid var(--orbit-blue); outline-offset: 3px; }

      .dsh-orbit-plugin-row {
        display: grid;
        grid-template-columns: 32px minmax(0, 1fr) auto;
        align-items: center;
        gap: 11px;
        padding: 12px 13px;
        border: 1px solid var(--orbit-border);
        border-radius: 15px;
        background: color-mix(in srgb, var(--orbit-surface) 72%, transparent);
        backdrop-filter: blur(14px) saturate(150%);
      }

      .dsh-orbit-plugin-icon {
        width: 32px;
        height: 32px;
        display: grid;
        place-items: center;
        border-radius: 10px;
        color: var(--orbit-purple);
        background: color-mix(in srgb, var(--orbit-purple) 11%, transparent);
      }

      .dsh-orbit-plugin-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 500;
      }

      .dsh-orbit-plugin-meta { margin-top: 3px; color: var(--orbit-muted); font-size: 12px; }

      .dsh-orbit-timeline {
        position: relative;
        display: grid;
        gap: 0;
        max-width: 760px;
      }

      .dsh-orbit-event {
        display: grid;
        grid-template-columns: 68px 20px minmax(0, 1fr);
        gap: 10px;
        min-height: 70px;
      }

      .dsh-orbit-event-time { padding-top: 2px; color: var(--orbit-muted); font-variant-numeric: tabular-nums; }

      .dsh-orbit-event-rail { position: relative; }
      .dsh-orbit-event-rail::before {
        content: "";
        position: absolute;
        top: 12px;
        bottom: -8px;
        left: 9px;
        width: 1px;
        background: var(--orbit-border);
      }

      .dsh-orbit-event:last-child .dsh-orbit-event-rail::before { display: none; }

      .dsh-orbit-event-dot {
        position: absolute;
        top: 3px;
        left: 5px;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: var(--orbit-cyan);
        box-shadow: 0 0 0 4px color-mix(in srgb, var(--orbit-cyan) 13%, transparent);
      }

      .dsh-orbit-event-title { font-weight: 500; }
      .dsh-orbit-event-copy { margin-top: 5px; color: var(--orbit-muted); }

      .dsh-orbit-empty {
        min-height: 260px;
        display: grid;
        place-items: center;
        border: 1px dashed var(--orbit-border);
        border-radius: 20px;
        color: var(--orbit-muted);
        text-align: center;
      }

      .dsh-orbit-mobile-scrim { display: none; }

      .dsh-orbit-icon { width: 18px; height: 18px; display: block; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }

      @media (max-width: 1080px) {
        .dsh-orbit-graph-layout { grid-template-columns: 1fr; }
        .dsh-orbit-inspector { min-height: auto; }
        .dsh-orbit-inspector-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 0 22px; }
        .dsh-orbit-inspector-inner > :first-child { grid-column: 1 / -1; }
      }

      @media (max-width: 820px) {
        .dsh-orbit-brand { min-width: auto; }
        .dsh-orbit-brand-copy, .dsh-orbit-health span:last-child { display: none; }
        .dsh-orbit-body { grid-template-columns: 1fr; grid-template-rows: minmax(0, 1fr) 64px; }
        .dsh-orbit-nav {
          grid-row: 2;
          grid-column: 1;
          flex-direction: row;
          justify-content: center;
          gap: 4px;
          padding: 8px 12px;
          border-right: 0;
          border-top: 1px solid var(--orbit-border);
        }
        .dsh-orbit-nav-list { width: auto; flex-direction: row; }
        .dsh-orbit-nav-glass { display: none; }
        .dsh-orbit-nav-button[aria-pressed="true"] { background: color-mix(in srgb, var(--orbit-surface) 72%, transparent); }
        .dsh-orbit-nav-button::after { display: none; }
        .dsh-orbit-nav-spacer, .dsh-orbit-nav > .dsh-orbit-nav-button { display: none; }
        .dsh-orbit-stage { grid-row: 1; grid-column: 1; }
        .dsh-orbit-session-pane {
          position: absolute;
          z-index: 45;
          top: 0;
          bottom: 64px;
          left: 0;
          width: min(86vw, 330px);
          opacity: 1;
          transform: translate3d(-105%, 0, 0);
          transition: transform 360ms cubic-bezier(.2, .82, .22, 1);
          box-shadow: 22px 0 60px rgba(0, 0, 0, .28);
        }
        .dsh-orbit-session-pane[data-open="true"] { transform: translate3d(0, 0, 0); }
        .dsh-orbit-session-pane[data-open="false"] { opacity: 1; }
        .dsh-orbit-details-pane {
          position: absolute;
          z-index: 50;
          top: 0;
          right: 0;
          bottom: 64px;
          width: min(92vw, 390px);
          opacity: 1;
          transform: translate3d(105%, 0, 0);
          transition: transform 360ms cubic-bezier(.2, .82, .22, 1);
          box-shadow: -22px 0 60px rgba(0, 0, 0, .28);
        }
        .dsh-orbit-details-pane[data-open="true"] { transform: translate3d(0, 0, 0); }
        .dsh-orbit-details-pane[data-open="false"] { opacity: 1; }
        .dsh-orbit-mobile-scrim {
          display: block;
          position: absolute;
          z-index: 40;
          inset: 0 0 64px;
          border: 0;
          background: rgba(0, 0, 0, .34);
          opacity: 0;
          pointer-events: none;
          transition: opacity 220ms ease;
        }
        .dsh-orbit-mobile-scrim[data-open="true"] { opacity: 1; pointer-events: auto; }
        .dsh-orbit-overlay { bottom: 64px; }
      }

      @media (max-width: 620px) {
        .dsh-orbit-topbar { padding: 0 11px; }
        .dsh-orbit-crumb span, .dsh-orbit-crumb .dsh-orbit-workspace { display: none; }
        .dsh-orbit-page { padding: 17px 12px 24px; }
        .dsh-orbit-page-head { align-items: flex-start; }
        .dsh-orbit-page-head p { max-width: 25rem; }
        .dsh-orbit-graph-canvas { min-height: 560px; }
        .dsh-orbit-graph-lines { display: none; }
        .dsh-orbit-graph-node {
          position: relative;
          top: auto !important;
          left: auto !important;
          width: calc(100% - 24px);
          min-height: 0;
          margin: 10px 12px;
          transform: scale(var(--orbit-press-scale));
        }
        .dsh-orbit-graph-canvas::before { position: relative; display: block; top: auto; left: auto; padding: 16px 18px 3px; }
        .dsh-orbit-inspector-inner { display: block; }
        .dsh-orbit-plugin-row { grid-template-columns: 32px minmax(0, 1fr); }
        .dsh-orbit-plugin-row > .dsh-orbit-status-chip { display: none; }
        .dsh-orbit-market-card { grid-template-columns: 40px minmax(0, 1fr); padding: 13px; }
        .dsh-orbit-market-icon { width: 40px; height: 40px; }
        .dsh-orbit-market-link { grid-column: 1 / -1; justify-content: center; }
      }

      @media (prefers-reduced-motion: reduce) {
        .dsh-orbit-root *, .dsh-orbit-root *::before, .dsh-orbit-root *::after { animation: none !important; transition-duration: .01ms !important; }
        .dsh-orbit-view { filter: none; transform: none; }
        .dsh-orbit-graph-canvas[data-running="true"] .dsh-orbit-graph-lines path { stroke-dasharray: none; }
      }

      @media (prefers-reduced-transparency: reduce) {
        .dsh-orbit-topbar, .dsh-orbit-nav, .dsh-orbit-health, .dsh-orbit-status-chip,
        .dsh-orbit-graph-node, .dsh-orbit-inspector, .dsh-orbit-details-pane,
        .dsh-orbit-plugin-row, .dsh-orbit-nav-glass, .dsh-orbit-market-card {
          backdrop-filter: none;
          background: var(--orbit-surface);
        }
      }

      @media (prefers-contrast: more) {
        .dsh-orbit-topbar, .dsh-orbit-nav, .dsh-orbit-session-pane,
        .dsh-orbit-details-pane, .dsh-orbit-graph-canvas,
        .dsh-orbit-graph-node, .dsh-orbit-inspector, .dsh-orbit-plugin-row, .dsh-orbit-market-card {
          border-color: var(--orbit-text);
        }
      }
    `;

    const styleId = "@local/dsh-ui-orbit/styles";
    if (typeof document !== "undefined" && document.querySelector(`style[data-plugin-css=${JSON.stringify(styleId)}]`) === null) {
      const style = document.createElement("style");
      style.dataset.plugin = "@local/dsh-ui-orbit";
      style.dataset.pluginCss = styleId;
      style.textContent = css;
      document.head.appendChild(style);
    }

    const iconPaths = {
      orbit: "M12 3a9 9 0 1 0 9 9c0-2.2-4-3.2-9-3.2S3 9.8 3 12m9-3.2c2 0 3.6 1.4 3.6 3.2S14 15.2 12 15.2 8.4 13.8 8.4 12 10 8.8 12 8.8Z",
      chat: "M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z",
      graph: "M6 4v5m0 6v5m12-16v5m0 6v5M6 9h12M6 15h12M3 12h6m6 0h6",
      activity: "M3 12h4l3-8 4 16 3-8h4",
      plugins: "M8 3h8v5h5v8h-5v5H8v-5H3V8h5Z",
      panel: "M4 4h16v16H4ZM10 4v16",
      close: "m6 6 12 12M18 6 6 18",
      layers: "m12 3 9 5-9 5-9-5Zm-9 10 9 5 9-5m-18 5 9 5 9-5",
      plug: "M12 22v-5m-4-7V5m8 5V5M6 10h12v2a6 6 0 0 1-12 0Z",
      clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v5l3 2",
      settings: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.57V20h-3v-.09a1.7 1.7 0 0 0-1-1.57 1.7 1.7 0 0 0-1.88.34l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 0 0 7.1 15a1.7 1.7 0 0 0-1.57-1H5.4v-3h.09a1.7 1.7 0 0 0 1.57-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.12-2.12.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1-1.57V4.7h3v.09a1.7 1.7 0 0 0 1 1.57 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.12 2.12-.06.06A1.7 1.7 0 0 0 19.4 10a1.7 1.7 0 0 0 1.57 1h.09v3h-.09a1.7 1.7 0 0 0-1.57 1Z",
      external: "M14 4h6v6m0-6-9 9M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5"
    };

    function Icon({ name, size = 18 }) {
      return h("svg", {
        className: "dsh-orbit-icon",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        "aria-hidden": true
      }, h("path", { d: iconPaths[name] || iconPaths.layers }));
    }

    function useReducedMotion() {
      const [reduced, setReduced] = React.useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      React.useEffect(() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduced(query.matches);
        query.addEventListener?.("change", update);
        return () => query.removeEventListener?.("change", update);
      }, []);
      return reduced;
    }

    function useSpringNumber(target, initial = target) {
      const reduced = useReducedMotion();
      const [value, setValue] = React.useState(initial);
      const state = React.useRef({ value: initial, velocity: 0, target, frame: 0, previous: 0 });

      React.useEffect(() => {
        const current = state.current;
        current.target = target;
        if (reduced) {
          if (current.frame) cancelAnimationFrame(current.frame);
          current.frame = 0;
          current.value = target;
          current.velocity = 0;
          setValue(target);
          return;
        }
        if (current.frame) return;

        const step = (time) => {
          const s = state.current;
          const delta = s.previous === 0 ? 1 / 60 : Math.min((time - s.previous) / 1000, .032);
          s.previous = time;
          const acceleration = 300 * (s.target - s.value) - 32 * s.velocity;
          s.velocity += acceleration * delta;
          s.value += s.velocity * delta;
          setValue(s.value);
          if (Math.abs(s.target - s.value) < .001 && Math.abs(s.velocity) < .001) {
            s.value = s.target;
            s.velocity = 0;
            s.previous = 0;
            s.frame = 0;
            setValue(s.value);
            return;
          }
          s.frame = requestAnimationFrame(step);
        };
        current.frame = requestAnimationFrame(step);
      }, [target, reduced]);

      React.useEffect(() => () => {
        if (state.current.frame) cancelAnimationFrame(state.current.frame);
      }, []);
      return value;
    }

    function MotionButton({ className = "", style, onPointerDown, onPointerUp, onPointerCancel, onPointerLeave, ...props }) {
      const [pressed, setPressed] = React.useState(false);
      const scale = useSpringNumber(pressed ? .955 : 1, 1);
      return h("button", {
        ...props,
        className,
        style: { ...style, "--orbit-press-scale": scale },
        onPointerDown: (event) => { setPressed(true); onPointerDown?.(event); },
        onPointerUp: (event) => { setPressed(false); onPointerUp?.(event); },
        onPointerCancel: (event) => { setPressed(false); onPointerCancel?.(event); },
        onPointerLeave: (event) => { setPressed(false); onPointerLeave?.(event); }
      });
    }

    class OrbitLayoutController {
      constructor() { this.actions = null; }
      attach(actions) {
        this.actions = actions;
        return () => { if (this.actions === actions) this.actions = null; };
      }
      toggleSidebar() { this.actions?.toggleSidebar(); }
      openDetails() { this.actions?.openDetails(); }
      closeDetails() { this.actions?.closeDetails(); }
    }

    class ThemePresenter {
      constructor() {
        this.appliedTokens = [];
        this.themeColorMeta = document.createElement("meta");
        this.themeColorMeta.name = "theme-color";
      }
      apply(snapshot) {
        const scheme = snapshot.active.colorScheme;
        document.documentElement.style.colorScheme = scheme;
        if (scheme === "dark") document.body.setAttribute("data-ds-dark-theme", "");
        else document.body.removeAttribute("data-ds-dark-theme");
        for (const name of this.appliedTokens) document.body.style.removeProperty(name);
        this.appliedTokens = [];
        for (const [name, value] of Object.entries(snapshot.active.tokens)) {
          document.body.style.setProperty(name, value);
          this.appliedTokens.push(name);
        }
        this.themeColorMeta.content = getComputedStyle(document.body).backgroundColor;
        if (!this.themeColorMeta.isConnected) document.head.append(this.themeColorMeta);
      }
      dispose() {
        document.documentElement.style.removeProperty("color-scheme");
        document.body.removeAttribute("data-ds-dark-theme");
        for (const name of this.appliedTokens) document.body.style.removeProperty(name);
        this.appliedTokens = [];
        this.themeColorMeta.remove();
      }
    }

    function flattenSlots(nodes, result = []) {
      for (const node of nodes || []) {
        result.push(node);
        flattenSlots(node.children || [], result);
      }
      return result;
    }

    function activePluginRows(nodes) {
      const plugins = new Map();
      for (const slot of flattenSlots(nodes, [])) {
        for (const occupant of slot.occupants || []) {
          if (!occupant.active || !occupant.registrant) continue;
          const row = plugins.get(occupant.registrant) || { name: occupant.registrant, slots: [] };
          if (!row.slots.includes(slot.name)) row.slots.push(slot.name);
          plugins.set(occupant.registrant, row);
        }
      }
      return [...plugins.values()].sort((a, b) => a.name.localeCompare(b.name));
    }

    function shortPluginName(name) {
      return String(name || "built-in").replace(/^@deepseek-ai\//, "").replace(/^@local\//, "");
    }

    function workspaceName(path) {
      if (!path) return "No workspace";
      const parts = String(path).split(/[\\/]+/).filter(Boolean);
      return parts[parts.length - 1] || path;
    }

    function PluginGraph({ graph, running, selected, onSelect }) {
      const rootNode = graph?.[0] || { name: "root", kind: "single", scope: "root", occupants: [], children: [] };
      const satellites = (rootNode.children || []).slice(0, 4);
      const selectedNode = flattenSlots([rootNode], []).find((node) => node.name === selected) || rootNode;
      const positions = [
        { left: "42%", top: "20%" },
        { left: "42%", top: "49%" },
        { left: "42%", top: "78%" },
        { left: "76%", top: "49%" }
      ];
      const activeOccupant = (selectedNode.occupants || []).find((item) => item.active);

      const [pointer, setPointer] = React.useState({ x: 50, y: 42 });
      const pointerFrame = React.useRef(0);
      const pendingPointer = React.useRef(pointer);
      const onPointerMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pendingPointer.current = {
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100
        };
        if (pointerFrame.current) return;
        pointerFrame.current = requestAnimationFrame(() => {
          setPointer(pendingPointer.current);
          pointerFrame.current = 0;
        });
      };
      React.useEffect(() => () => pointerFrame.current && cancelAnimationFrame(pointerFrame.current), []);

      const nodeButton = (node, style, isRoot = false) => {
        const active = (node.occupants || []).find((item) => item.active);
        return h(MotionButton, {
          key: node.name,
          type: "button",
          className: "dsh-orbit-graph-node",
          style,
          "data-root": isRoot || undefined,
          "aria-pressed": selectedNode.name === node.name,
          onClick: () => onSelect(node.name)
        },
          h("div", { className: "dsh-orbit-node-title" }, h(Icon, { name: isRoot ? "orbit" : "layers" }), h("span", null, node.name)),
          h("div", { className: "dsh-orbit-node-meta" }, active ? shortPluginName(active.registrant) : `${(node.occupants || []).length} occupants`)
        );
      };

      return h("div", { className: "dsh-orbit-graph-layout" },
        h("div", {
          className: "dsh-orbit-graph-canvas",
          "data-running": running || undefined,
          style: { "--orbit-graph-x": `${pointer.x}%`, "--orbit-graph-y": `${pointer.y}%` },
          onPointerMove
        },
          h("svg", { className: "dsh-orbit-graph-lines", viewBox: "0 0 800 430", preserveAspectRatio: "none", "aria-hidden": true },
            h("path", { d: "M160 215 C240 215 245 86 336 86" }),
            h("path", { d: "M160 215 C245 215 252 211 336 211" }),
            h("path", { d: "M160 215 C240 215 245 335 336 335" }),
            h("path", { d: "M488 211 C565 211 575 211 646 211" })
          ),
          nodeButton(rootNode, { left: "17%", top: "49%" }, true),
          ...satellites.map((node, index) => nodeButton(node, positions[index]))
        ),
        h("aside", { className: "dsh-orbit-inspector", "aria-label": "Plugin inspector" },
          h("div", { className: "dsh-orbit-inspector-inner", key: selectedNode.name },
            h("div", null,
              h("div", { className: "dsh-orbit-inspector-label" }, "Live slot inspector"),
              h("div", { className: "dsh-orbit-inspector-icon" }, h(Icon, { name: selectedNode.name === "root" ? "orbit" : "layers", size: 20 })),
              h("h2", null, selectedNode.name),
              h("p", { className: "dsh-orbit-inspector-sub" }, `${selectedNode.kind} · ${selectedNode.scope}`)
            ),
            h("div", { className: "dsh-orbit-inspector-section" },
              h("div", { className: "dsh-orbit-info-row" }, h("span", null, "Status"), h("strong", null, activeOccupant ? "Active" : "Available")),
              h("div", { className: "dsh-orbit-info-row" }, h("span", null, "Occupants"), h("strong", null, String((selectedNode.occupants || []).length))),
              h("div", { className: "dsh-orbit-info-row" }, h("span", null, "Children"), h("strong", null, String((selectedNode.children || []).length)))
            ),
            h("div", { className: "dsh-orbit-inspector-section" },
              h("div", { className: "dsh-orbit-inspector-label" }, "Active registrant"),
              h("div", { className: "dsh-orbit-code", style: { marginTop: 9 } }, activeOccupant?.registrant || "No active registrant")
            ),
            h("div", { className: "dsh-orbit-inspector-section" },
              h("div", { className: "dsh-orbit-inspector-label" }, "Composition"),
              h("div", { style: { marginTop: 9, color: "var(--orbit-muted)" } }, (selectedNode.occupants || []).map((item) => shortPluginName(item.registrant)).join(" · ") || "Empty slot")
            )
          )
        )
      );
    }

    function PluginsPage({ plugins }) {
      return h("div", { className: "dsh-orbit-page" },
        h("div", { className: "dsh-orbit-page-head" },
          h("div", null, h("h1", null, "插件清单"), h("p", null, "当前浏览器运行时实际激活的客户端插件。")),
          h("span", { className: "dsh-orbit-status-chip" }, h("span", { className: "dsh-orbit-dot" }), `${plugins.length} active`)
        ),
        h("section", { className: "dsh-orbit-market-card", "aria-label": "DSH 插件市场" },
          h("div", { className: "dsh-orbit-market-icon" }, h(Icon, { name: "plugins", size: 20 })),
          h("div", { style: { minWidth: 0 } },
            h("div", { className: "dsh-orbit-market-title" }, "Community Plugin Market", h("span", { className: "dsh-orbit-market-badge" }, "Agent access")),
            h("div", { className: "dsh-orbit-market-copy" }, "浏览 GitHub dsh-plugin 社区仓库。Agent 可检查来源、manifest 与依赖，并在确认后下载、安装。")
          ),
          h("a", {
            className: "dsh-orbit-market-link",
            href: "https://github.com/topics/dsh-plugin",
            target: "_blank",
            rel: "noreferrer",
            "aria-label": "打开 GitHub DSH 插件市场（新窗口）"
          }, "浏览市场", h(Icon, { name: "external", size: 16 }))
        ),
        plugins.length ? h("div", { className: "dsh-orbit-list" }, ...plugins.map((plugin) =>
          h("div", { className: "dsh-orbit-plugin-row", key: plugin.name },
            h("div", { className: "dsh-orbit-plugin-icon" }, h(Icon, { name: "plug" })),
            h("div", { style: { minWidth: 0 } },
              h("div", { className: "dsh-orbit-plugin-name" }, shortPluginName(plugin.name)),
              h("div", { className: "dsh-orbit-plugin-meta" }, plugin.slots.join(" · "))
            ),
            h("span", { className: "dsh-orbit-status-chip" }, h("span", { className: "dsh-orbit-dot" }), "Healthy")
          )
        )) : h("div", { className: "dsh-orbit-empty" }, "等待插件运行时完成组合…")
      );
    }

    function TimelinePage({ events }) {
      return h("div", { className: "dsh-orbit-page" },
        h("div", { className: "dsh-orbit-page-head" },
          h("div", null, h("h1", null, "运行轨迹"), h("p", null, "Slot 注册、替换和卸载都会在这里留下可观察记录。")),
          h("span", { className: "dsh-orbit-status-chip" }, h(Icon, { name: "activity" }), "Live")
        ),
        h("div", { className: "dsh-orbit-timeline" }, ...events.map((event) =>
          h("div", { className: "dsh-orbit-event", key: event.id },
            h("div", { className: "dsh-orbit-event-time" }, event.time),
            h("div", { className: "dsh-orbit-event-rail" }, h("span", { className: "dsh-orbit-event-dot" })),
            h("div", null, h("div", { className: "dsh-orbit-event-title" }, event.title), h("div", { className: "dsh-orbit-event-copy" }, event.copy))
          )
        ))
      );
    }

    function GraphPage({ graph, plugins, running, selected, onSelect }) {
      return h("div", { className: "dsh-orbit-page" },
        h("div", { className: "dsh-orbit-page-head" },
          h("div", null, h("h1", null, "运行时图谱"), h("p", null, "每个能力都是可检查、可替换的插件。")),
          h("span", { className: "dsh-orbit-status-chip" }, h("span", { className: "dsh-orbit-dot", "data-running": running || undefined }), running ? "Agent running" : `${plugins.length} plugins healthy`)
        ),
        h(PluginGraph, { graph, running, selected, onSelect })
      );
    }

    const views = [
      { id: "chat", label: "会话", icon: "chat" },
      { id: "graph", label: "插件图", icon: "graph" },
      { id: "trajectory", label: "轨迹", icon: "activity" },
      { id: "plugins", label: "插件", icon: "plugins" }
    ];

    function OrbitFrame({ useSessions, renderSlot, layout, getSlotGraph, subscribeSlots }) {
      const frameRef = React.useRef(null);
      const [activeView, setActiveView] = React.useState("chat");
      const [sidebarOpen, setSidebarOpen] = React.useState(() => window.innerWidth > 820);
      const [detailsOpen, setDetailsOpen] = React.useState(false);
      const [compact, setCompact] = React.useState(() => window.innerWidth <= 820);
      const [graph, setGraph] = React.useState(() => getSlotGraph());
      const graphSignatureRef = React.useRef(JSON.stringify(graph));
      const [selectedSlot, setSelectedSlot] = React.useState("root");
      const [events, setEvents] = React.useState(() => [{
        id: "boot",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        title: "Runtime composed",
        copy: "Orbit shell attached to the live Harness slot registry."
      }]);

      const currentId = useSessions((state) => state.current);
      const currentTitle = useSessions((state) => state.current ? state.byId[state.current]?.displayTitle : undefined);
      const currentCwd = useSessions((state) => state.current ? state.byId[state.current]?.cwd : undefined);
      const running = useSessions((state) => Boolean(state.current && state.byId[state.current]?.running));
      const plugins = React.useMemo(() => activePluginRows(graph), [graph]);
      const activeIndex = views.findIndex((item) => item.id === activeView);
      const navY = useSpringNumber(Math.max(0, activeIndex) * 51, 0);
      const sessionPaneVisible = activeView === "chat" && sidebarOpen;
      const detailsPaneVisible = activeView === "chat" && detailsOpen && Boolean(currentId);

      React.useEffect(() => layout.attach({
        toggleSidebar: () => setSidebarOpen((value) => !value),
        openDetails: () => setDetailsOpen(true),
        closeDetails: () => setDetailsOpen(false)
      }), [layout]);

      React.useEffect(() => {
        let frame = 0;
        let pendingKey = "runtime";
        const unsubscribe = subscribeSlots((key) => {
          pendingKey = key;
          if (frame) return;
          frame = requestAnimationFrame(() => {
            frame = 0;
            const nextGraph = getSlotGraph();
            const signature = JSON.stringify(nextGraph);
            if (signature === graphSignatureRef.current) return;
            graphSignatureRef.current = signature;
            setGraph(nextGraph);
            const now = new Date();
            setEvents((items) => [{
              id: `${now.getTime()}-${pendingKey}`,
              time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
              title: "Composition changed",
              copy: `Slot ${pendingKey} published a new runtime snapshot.`
            }, ...items].slice(0, 18));
          });
        });
        return () => {
          if (frame) cancelAnimationFrame(frame);
          unsubscribe?.();
        };
      }, []);

      React.useEffect(() => {
        const element = frameRef.current;
        if (!element) return;
        const observer = new ResizeObserver(() => {
          const nextCompact = element.getBoundingClientRect().width <= 820;
          setCompact((previous) => {
            if (previous === nextCompact) return previous;
            setSidebarOpen(!nextCompact);
            if (nextCompact) setDetailsOpen(false);
            return nextCompact;
          });
        });
        observer.observe(element);
        return () => observer.disconnect();
      }, []);

      const pointerFrame = React.useRef(0);
      const pointerPosition = React.useRef({ x: 58, y: 16 });
      const onPointerMove = (event) => {
        const rect = frameRef.current?.getBoundingClientRect();
        if (!rect) return;
        pointerPosition.current = {
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100
        };
        if (pointerFrame.current) return;
        pointerFrame.current = requestAnimationFrame(() => {
          frameRef.current?.style.setProperty("--orbit-pointer-x", `${pointerPosition.current.x}%`);
          frameRef.current?.style.setProperty("--orbit-pointer-y", `${pointerPosition.current.y}%`);
          pointerFrame.current = 0;
        });
      };
      React.useEffect(() => () => pointerFrame.current && cancelAnimationFrame(pointerFrame.current), []);

      const closeMobilePanels = () => {
        setSidebarOpen(false);
        setDetailsOpen(false);
      };

      const selectView = (view) => {
        setActiveView(view);
        requestAnimationFrame(() => {
          const page = frameRef.current?.querySelector(`[data-orbit-view="${view}"] .dsh-orbit-page`);
          if (page) page.scrollTop = 0;
        });
        if (view !== "chat" && compact) setSidebarOpen(false);
      };

      return h("div", {
        ref: frameRef,
        className: "dsh-orbit-root",
        style: {
          "--orbit-session-width": !compact && sessionPaneVisible ? "276px" : "0px",
          "--orbit-details-width": !compact && detailsPaneVisible ? "360px" : "0px"
        },
        onPointerMove
      },
        h("header", { className: "dsh-orbit-topbar" },
          h("div", { className: "dsh-orbit-brand" },
            h("span", { className: "dsh-orbit-brand-mark" }, h(Icon, { name: "orbit" })),
            h("span", { className: "dsh-orbit-brand-copy" }, "deepseek ", h("span", { className: "dsh-orbit-brand-sub" }, "Harness Orbit"))
          ),
          h("div", { className: "dsh-orbit-crumb" },
            h("span", { className: "dsh-orbit-workspace" }, workspaceName(currentCwd)),
            h("span", null, "/"),
            h("strong", null, currentTitle || (activeView === "chat" ? "新会话" : views.find((item) => item.id === activeView)?.label))
          ),
          h("div", { className: "dsh-orbit-health" }, h("span", { className: "dsh-orbit-dot", "data-running": running || undefined }), h("span", null, running ? "Agent running" : `${plugins.length} plugins healthy`)),
          h(MotionButton, {
            type: "button",
            className: "dsh-orbit-top-action",
            "aria-label": sessionPaneVisible ? "隐藏会话栏" : "显示会话栏",
            onClick: () => setSidebarOpen((value) => !value)
          }, h(Icon, { name: "panel" }))
        ),
        h("div", { className: "dsh-orbit-body" },
          h("nav", { className: "dsh-orbit-nav", "aria-label": "Main navigation" },
            h("div", { className: "dsh-orbit-nav-list" },
              h("span", { className: "dsh-orbit-nav-glass", style: { transform: `translate3d(0, ${navY}px, 0)` }, "aria-hidden": true }),
              ...views.map((view) => h(MotionButton, {
                key: view.id,
                type: "button",
                className: "dsh-orbit-nav-button",
                "aria-label": view.label,
                "aria-pressed": activeView === view.id,
                onClick: () => selectView(view.id)
              }, h(Icon, { name: view.icon })))
            ),
            h("div", { className: "dsh-orbit-nav-spacer" }),
            h(MotionButton, { type: "button", className: "dsh-orbit-nav-button", "aria-label": "设置", onClick: () => { setActiveView("chat"); setSidebarOpen(true); } }, h(Icon, { name: "settings" }))
          ),
          h("aside", { className: "dsh-orbit-session-pane", "data-open": sessionPaneVisible }, renderSlot("sidebar", { collapsed: false, width: 276 })),
          h("main", { className: "dsh-orbit-stage" },
            h("section", { className: "dsh-orbit-view dsh-orbit-chat-view", "data-orbit-view": "chat", "data-active": activeView === "chat", "aria-hidden": activeView !== "chat" }, renderSlot("conversation", {})),
            h("section", { className: "dsh-orbit-view", "data-orbit-view": "graph", "data-active": activeView === "graph", "aria-hidden": activeView !== "graph" }, h(GraphPage, { graph, plugins, running, selected: selectedSlot, onSelect: setSelectedSlot })),
            h("section", { className: "dsh-orbit-view", "data-orbit-view": "trajectory", "data-active": activeView === "trajectory", "aria-hidden": activeView !== "trajectory" }, h(TimelinePage, { events })),
            h("section", { className: "dsh-orbit-view", "data-orbit-view": "plugins", "data-active": activeView === "plugins", "aria-hidden": activeView !== "plugins" }, h(PluginsPage, { plugins }))
          ),
          h("aside", { className: "dsh-orbit-details-pane", "data-open": detailsPaneVisible }, renderSlot("details", {})),
          h("button", {
            type: "button",
            className: "dsh-orbit-mobile-scrim",
            "data-open": compact && (sidebarOpen || detailsOpen),
            "aria-label": "关闭面板",
            onClick: closeMobilePanels
          }),
          h("div", { className: "dsh-orbit-overlay", "data-shell-overlay": true }, renderSlot("shell.overlay", {}))
        )
      );
    }

    const inject = ["slots", "theme"];

    function apply(ctx) {
      const layout = new OrbitLayoutController();
      ctx.effect(() => {
        const disposeService = ctx.reflect.provide("layout", layout);
        const disposeRegistration = ctx.slots.register({
          name: "root",
          children: {
            sidebar: { kind: "single", scope: "root" },
            conversation: { kind: "single", scope: "session-maybe" },
            details: { kind: "single", scope: "session" },
            "shell.overlay": { kind: "list", scope: "root" }
          },
          inject: () => ({
            layout,
            getSlotGraph: () => ctx.slots.snapshot("root"),
            subscribeSlots: (listener) => ctx.on("slots/changed", listener)
          })
        }, OrbitFrame);
        return () => {
          disposeRegistration();
          disposeService();
        };
      }, "ui-orbit: layout service + root registration");

      ctx.effect(() => {
        const presenter = new ThemePresenter();
        presenter.apply(ctx.theme.getTheme());
        const off = ctx.on("theme/change", (snapshot) => presenter.apply(snapshot));
        return () => {
          off();
          presenter.dispose();
        };
      }, "ui-orbit: theme presenter");
    }

    exports.inject = inject;
    exports.apply = apply;
    return module.exports;
  }
});
