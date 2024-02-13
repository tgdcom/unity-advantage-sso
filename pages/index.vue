<template>
  <div class="container mx-auto lg:max-w-[50rem]">
    <h1
      class="text-black dark:text-white text-4xl sm:text-5xl font-semibold text-center"
    >
      {{ greeting
      }}<template v-if="session?.user">{{ ` ${session.user.name}` }}</template
      >!
    </h1>
    <div class="my-12 space-x-4">
      <a
        class="focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-2.5 px-3.5 py-2.5 shadow-sm text-white dark:text-gray-900 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500 dark:bg-blue-400 dark:hover:bg-blue-500 dark:disabled:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:focus-visible:outline-blue-400 inline-flex items-center"
        :disabled="true || !!session?.user"
        href="/api/auth/signin"
        >Local Sign-in</a
      >
      <UButton
        size="lg"
        color="blue"
        variant="solid"
        label="Button"
        :disabled="!!session?.user"
        @click="signIn('advantage')"
        >Sign-in w/ Advantage</UButton
      >
      <UButton
        v-if="session?.user"
        size="lg"
        color="blue"
        variant="solid"
        label="Button"
        @click="signOut()"
        >Sign Out</UButton
      >
    </div>
    <div class="my-12">
      <pre>Status: {{ status }}</pre>
      <pre v-if="session?.user">Session: {{ session }}</pre>
      <pre v-if="cookies">Cookies: {{ cookies }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
const { signIn, signOut, session, status, cookies, getProviders } = useAuth()

// list of greetings to display
const greetings = [
  'Hello',
  'Hi',
  'Hey',
  'Howdy',
  'Hola',
  'Bonjour',
  'Ciao',
  'Namaste',
  'Salaam',
  'Konnichiwa',
  'Guten Tag',
  'Olá',
  'Aloha',
  'Shalom',
  'Kamusta',
  'Merhaba',
  'Hej',
  'Hei',
  'Ahoj',
  'Halo',
  'Szia',
  'Salut',
  'Zdravstvuyte',
  'Nǐ hǎo',
  'Annyeong',
  'Sawubona',
  'Jambo',
  'Salam',
  'Sveiki',
  'Mingalarba',
  'Sain baina uu',
  'Szia',
]

const random = () => greetings[Math.floor(Math.random() * greetings.length)]
const greeting = useState('greeting', random)

const { pause, resume, isActive } = useIntervalFn(
  () => {
    greeting.value = random()
  },
  1000 * 30,
  { immediateCallback: false },
)
</script>
