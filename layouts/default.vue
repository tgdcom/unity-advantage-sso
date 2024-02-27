<template>
  <div class="wrapper">
    <div class="margins" style="padding-top: 3rem; ">
      <div class="content">
        <h1 class="heading">
          <NuxtLink to="/">
            This
          </NuxtLink> is a test environment for <span class="gradient__text">nuxt/vue stuff</span>!
        </h1>
        <p class="description">
          Read documentation <a class="hover-underline-animation" href="https://nuxt.com" target="_blank">here</a>.
        </p>
      </div>

      <div class="py-12">
        <slot />
      </div>
    </div>

    <div class="margins footer">
      <div style="color: #D1D5DB">
        With love by
        <NuxtLink href="https://tgdcom.com" target="_blank" class="hover-underline-animation">
          TGD Communications
        </NuxtLink>
      </div>
      <div class="social">
        <NuxtLink href="https://twitter.com/tgdcom" target="_blank" class="hover-underline-animation">
          Twitter
        </NuxtLink>
        <NuxtLink href="https://github.com/tgdcom" target="_blank" class="hover-underline-animation">
          Github
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background-color: #eefbfc;
    color: #484848;
  }

  /* Layout */
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-height: 100vh;
    color: #ffffff;
    background-color: #0E0E10;
  }
  .margins {
    padding-left: 1rem;
    padding-right: 1rem;

    @media (min-width: 1024px) {
      padding-left: 5rem;
      padding-right: 5rem;
    }
  }

  /* Heading */
  .content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .heading {
      font-size: 2.4rem;
      line-height: 2.25rem;
      font-weight: 700;

      @media (min-width: 1280px) {
        font-size: 3rem;
        line-height: 1;
      }
    }

    .description {
      font-size: 1.125rem;
      line-height: 1.75rem;
      color: #9CA3AF;

      @media (min-width: 1280px) {
        font-size: 1.25rem;
        line-height: 1.75rem;
      }
    }
  }

  /* Modules */
  .modules_grid {
    display: grid;
    margin-top: 2.5rem;
    gap: 2rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 1280px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .card {
    position: relative;
    padding: 30px;
    border: 3px solid;
    border-radius: 10px;
    border-color: hsla(0, 0%, 100%, 0.1);
    transition: 0.5s;

    .layout {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      justify-content: space-between;
      height: 100%;

      .group {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .heading {
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: 700;
      }

      .description {
        color: #D1D5DB;
      }

      .group .actions {
        display: flex;
        gap: 0.5rem;
      }
    }
  }

  /* Footer */
  .footer {
    display: flex;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-top: 2.5rem;
    justify-content: space-between;
    align-items: center;
    border-top-width: 1px;
    border-color: #1F2937;
    width: 100%;

    .social {
      display: flex;
      gap: 1.25rem;
      align-items: center;
    }
  }

  /* Special */
  .gradient__text {
    background: linear-gradient(to right, #d21831 10%, #b0081c 40%, #d0112b 60%, #d21831 90%);
    background-size: 200% auto;
    color: #000;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 1s linear infinite;
  }

  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }

  .hover-underline-animation {
    display: inline-block;
    position: relative;
    color: #d0112b;
    text-decoration: none;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: #d0112b;
      transform-origin: bottom right;
      transition: transform 0.25s ease-out;
    }

    &:hover::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
</style>
