<template>
  <div class="talk-page relative min-h-dvh overflow-hidden">
    <div class="talk-page__glow talk-page__glow--a" aria-hidden="true" />
    <div class="talk-page__glow talk-page__glow--b" aria-hidden="true" />
    <div class="talk-page__grid" aria-hidden="true" />

    <main class="relative z-10 flex min-h-dvh items-center justify-center px-6 py-16">
      <div class="talk-content mx-auto max-w-4xl text-center">
        <p class="talk-eyebrow mb-6 text-sm font-medium tracking-[0.2em] uppercase text-teal-700/80">
          Talk
        </p>

        <h1 class="talk-title text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
          From REST to MCP
        </h1>

        <p class="talk-subtitle mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-600 sm:text-xl md:text-2xl">
          Making Your Backend AI-Ready with FastMCP
        </p>

        <div class="talk-rule mx-auto mt-10 h-px w-24 bg-teal-600/40" aria-hidden="true" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.talk-page {
  background:
    radial-gradient(ellipse 80% 60% at 50% -10%, rgb(204 251 241 / 0.7), transparent 55%),
    radial-gradient(ellipse 50% 40% at 100% 100%, rgb(224 242 254 / 0.55), transparent 50%),
    linear-gradient(165deg, #f8fafc 0%, #ecfeff 45%, #f1f5f9 100%);
}

.talk-page__glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(64px);
  pointer-events: none;
  animation: drift 14s ease-in-out infinite alternate;
}

.talk-page__glow--a {
  top: 12%;
  left: -8%;
  width: 42vw;
  height: 42vw;
  max-width: 520px;
  max-height: 520px;
  background: rgb(45 212 191 / 0.18);
}

.talk-page__glow--b {
  right: -6%;
  bottom: 8%;
  width: 36vw;
  height: 36vw;
  max-width: 440px;
  max-height: 440px;
  background: rgb(56 189 248 / 0.16);
  animation-delay: -5s;
  animation-duration: 18s;
}

.talk-page__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgb(15 23 42 / 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgb(15 23 42 / 0.035) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent 75%);
  pointer-events: none;
}

.talk-eyebrow {
  font-family: 'Sora', sans-serif;
  animation: rise 0.7s ease-out both;
}

.talk-title {
  font-family: 'Fraunces', Georgia, serif;
  font-optical-sizing: auto;
  animation: rise 0.85s ease-out 0.12s both;
}

.talk-subtitle {
  font-family: 'Sora', sans-serif;
  animation: rise 0.85s ease-out 0.28s both;
}

.talk-rule {
  animation: rise 0.7s ease-out 0.45s both;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes drift {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(24px, -18px) scale(1.06);
  }
}

@media (prefers-reduced-motion: reduce) {
  .talk-eyebrow,
  .talk-title,
  .talk-subtitle,
  .talk-rule,
  .talk-page__glow {
    animation: none;
  }
}
</style>
