<template>
  <toast />
  <div
    :class="[
      'fixed z-20 top-20 left-0 w-full h-[calc(100vh-5rem)] bg-[var(--surface-overlay)] transition-opacity duration-300 flex flex-col items-center justify-center gap-8 text-4xl [font-weight:1000] tracking-wide',
      showMenu ? 'opacity-95' : 'opacity-0 pointer-events-none'
    ]"
  >
    <p
      v-for="link in links"
      @click="scrollTo(link)"
      :class="[activeLink === link ? '' : 'brightness-50', 'cursor-pointer hover:brightness-100 transition-all']"
    >
      {{ link[0].toUpperCase() + link.slice(1) }}
    </p>
    <p @click="openLink('/src/assets/jace_reinke_resume.pdf')" class="cursor-pointer brightness-50 hover:brightness-100 transition-all">Resume</p>
    <span class="absolute bottom-0 right-0 flex gap-4 p-6">
      <i class="pi pi-github text-3xl cursor-pointer hover:brightness-50" @click="openLink('https://github.com/jreinke428')"></i>
      <i
        class="pi pi-linkedin text-3xl cursor-pointer hover:brightness-50"
        @click="openLink('https://www.linkedin.com/in/jace-reinke-34b068241/')"
      ></i>
    </span>
  </div>
  <nav class="flex justify-between items-center py-6 px-10 fixed w-full z-10">
    <div
      :class="[
        'absolute top-0 left-0 w-full h-full -z-10 bg-[var(--surface-overlay)] transition-opacity duration-300',
        isScrolled || showMenu ? 'opacity-95' : 'opacity-0'
      ]"
    ></div>
    <p class="font-semibold text-2xl cursor-pointer hover:brightness-50 transition-all" @click="scrollTo('home')">&lt;jreinke /&gt;</p>
    <i
      :class="['pi text-3xl cursor-pointer hover:brightness-50 transition-all', showMenu ? 'pi-times' : 'pi-bars']"
      @click="showMenu = !showMenu"
    ></i>
  </nav>
  <vue-particles id="particles" :options="ParticleConfig"></vue-particles>
  <div class="min-h-[100vh] flex flex-col gap-5 items-center justify-center relative" id="home">
    <h1 class="font-bold text-5xl">Jace Reinke</h1>
    <h2 class="font-medium text-3xl text-[var(--text-color-secondary)]">Full Stack Developer</h2>
    <p-button label="Learn More" icon="pi pi-arrow-right" icon-pos="right" @click="scrollTo('about')" />
  </div>
  <div class="min-h-[100vh] p-8 pt-28 flex flex-col gap-6 justify-center items-center" id="about">
    <div class="flex flex-col sm:flex-row items-center gap-8">
      <img
        v-animateonscroll="{ enterClass: 'sm:animate-[zoom_1s]', leaveClass: 'fadeout' }"
        class="duration-1000 rounded-full w-64 h-64 sm:w-72 sm:h-72 object-cover"
        src="@/assets/portrait.jpg"
      />
      <p
        v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }"
        class="max-w-[32rem] font-semibold text-sm sm:text-base [&_span]:text-[var(--primary-color)] duration-1000 text-center"
      >
        I am a <span>full-stack developer</span> with over 2 years of professional experience. I attend Drury University with a double major in
        <span>Software Engineering</span> and <span>Mathematics</span>, simultaneously working as a <span>Junior Developer</span> at O'Reilly Auto
        Parts. I have done work in <span>front-end</span> web development, <span>back-end</span> development, <span>mobile</span> application
        development, <span>database/server</span> management, and <span>game</span> development.
      </p>
    </div>
    <p class="text-xl font-bold">Languages</p>
    <div
      v-animateonscroll="{ enterClass: 'animate-[fadeRight_1s]', leaveClass: 'fadeout' }"
      class="flex gap-4 bg-[var(--surface-card)] px-4 py-2 rounded shadow-md shadow-black mt-[-1rem]"
    >
      <img
        v-for="language in languages"
        :key="language"
        v-tooltip.top="language"
        :src="`/src/assets/${language}.png`"
        class="object-contain w-6 sm:w-14"
      />
    </div>
    <p class="text-xl font-bold">Technologies</p>
    <div
      v-animateonscroll="{ enterClass: 'animate-[fadeLeft_1s]', leaveClass: 'fadeout' }"
      class="flex gap-4 bg-[var(--surface-card)] px-4 py-2 rounded shadow-md shadow-black mt-[-1rem]"
    >
      <img
        v-for="technology in technologies"
        :key="technology"
        v-tooltip.top="technology"
        :src="`/src/assets/${technology}.png`"
        class="object-contain w-6 sm:w-14"
      />
    </div>
  </div>
  <div class="min-h-[100vh] p-4 pt-28 flex flex-wrap gap-4 justify-center items-center" id="projects">
    <h1 class="w-full text-4xl font-bold text-center">Projects</h1>
    <div
      v-for="project in projects"
      class="w-96 h-72 relative rounded-md shadow-md shadow-black overflow-hidden duration-1000"
      v-animateonscroll="{ enterClass: 'sm:animate-[flip_1s]', leaveClass: 'fadeout' }"
    >
      <img :src="project.image" class="object-contain h-72" />
      <div
        class="absolute top-0 left-0 w-full h-full bg-[var(--surface-overlay)] opacity-0 hover:opacity-95 transition-opacity duration-500 p-4 flex flex-col gap-2 select-none"
      >
        <p class="text-2xl font-black">{{ project.title }}</p>
        <div class="flex flex-wrap gap-1"><Tag v-for="tech in project.subtitle" :value="tech" /></div>
        <p>{{ project.description }}</p>
        <div class="flex-grow"></div>
        <div class="flex justify-between">
          <p-button v-if="project.infoLink" class="mx-auto" size="small" severity="info" @click="openLink(project.infoLink)">More Info</p-button>
          <p-button v-if="project.projectLink" class="mx-auto" size="small" @click="openLink(project.projectLink)">Try It Out</p-button>
        </div>
      </div>
    </div>
  </div>
  <div
    class="min-h-[100vh] p-8 pt-28 flex flex-col gap-10 justify-center items-center duration-1000"
    id="contact"
    v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }"
  >
    <h1 class="w-full text-4xl font-bold text-center">Contact Me</h1>
    <span class="p-float-label">
      <p-input
        id="name"
        v-model="name.value"
        class="w-[41rem]"
        :class="name.error ? 'p-invalid' : ''"
        @input="(e: any) => (name.error = e.data ? '' : 'Name is required.')"
      />
      <label for="name">Name</label>
    </span>
    <small v-if="name.error" class="p-error -mt-8 text-left w-[41rem]">{{ name.error }}</small>
    <span class="p-float-label">
      <p-input
        id="email"
        v-model="email.value"
        class="w-[41rem]"
        :class="email.error ? 'p-invalid' : ''"
        @input="(e: any) => (email.error = e.data ? '' : 'Email is required.')"
      />
      <label for="email">Email</label>
    </span>
    <small v-if="email.error" class="p-error -mt-8 text-left w-[41rem]">{{ email.error }}</small>
    <span class="p-float-label">
      <p-input id="subject" v-model="subject" class="w-[41rem]" />
      <label for="subject">Subject</label>
    </span>
    <span class="p-float-label">
      <p-textarea id="body" v-model="body" class="w-[41rem]" rows="5" />
      <label for="body">Body</label>
    </span>
    <p-button @click="sendEmail">Send</p-button>
  </div>
</template>

<script setup lang="ts">
import PButton from 'primevue/button';
import PInput from 'primevue/inputtext';
import PTextarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import Tag from 'primevue/tag';
import * as ParticleConfig from '@/util/particlesjs-config.json';
import { onMounted, ref } from 'vue';
import emailjs from 'emailjs-com';
import { useToast } from 'primevue/usetoast';
import debounce from 'lodash/debounce';

const toastService = useToast();
const links = ['home', 'about', 'projects', 'contact'];

const activeLink = ref(links.find((link) => document.getElementById(link)?.getBoundingClientRect().bottom ?? 0 > 0) ?? '');
const isScrolled = ref(window.scrollY > 0);
const showMenu = ref(false);
const name = ref({ value: '', error: '' });
const email = ref({ value: '', error: '' });
const subject = ref('');
const body = ref('');

const languages = ['javascript', 'typescript', 'html', 'css', 'java', 'python', 'dart', 'sql'];
const technologies = ['vue', 'react', 'node', 'spring', 'godot', 'flutter', 'git'];
const projects = [
  {
    title: 'Stardew Valley Relationship Helper',
    subtitle: ['Vue', 'Vite', 'TypeScript', 'DaisyUI', 'Tailwind'],
    image: '/src/assets/srh.png',
    description: 'An interactive web application for users to track relationships in Stardew Valley.',
    infoLink: 'https://github.com/gimgine/stardew-relationship-helper',
    projectLink: 'https://gimgine.github.io/stardew-relationship-helper/#/'
  },
  {
    title: 'snipbit',
    subtitle: ['Vue', 'Vite', 'TypeScript', 'PrimeVue', 'Tailwind', 'PocketBase'],
    image: '/src/assets/snipbit.png',
    description: 'A social media platform for developers to store and share code snippets.',
    infoLink: 'https://devpost.com/software/snipbit-sc0au4',
    projectLink: 'https://snipbit.pockethost.io/#/'
  },
  {
    title: 'tabs',
    subtitle: ['React Native', 'Node', 'MongoDB', 'Geolocation', 'REST Api'],
    image: '/src/assets/tabs.png',
    description: 'An iOS application targeting drunk driving prevention among groups.',
    infoLink: 'https://devpost.com/software/tabs-sc6dxz'
  },
  {
    title: 'Echoes of Existence',
    subtitle: ['Godot', 'GDScript', 'Flow Field Pathfinding', 'Procedural World Gen'],
    image: '/src/assets/eoe.png',
    description: 'A 2D topdown game where players find and scan plants while fighting off hordes of aliens.',
    infoLink: 'https://naroop.itch.io/echoes-of-existence'
  },
  {
    title: 'eMission',
    subtitle: ['Flutter', 'Dart', 'Google Maps', 'Geolocation', 'Node'],
    image: '/src/assets/emission.png',
    description: "A mobile application gamifying the reduction of users' carbon footprint.",
    infoLink: 'https://github.com/Developer-DUCS/eMission/tree/development'
  }
];

const scrollTo = (id: string) => {
  showMenu.value = false;
  window.scrollTo({ top: document.getElementById(id)?.offsetTop, behavior: 'smooth' });
};

const openLink = (url: string) => window.open(url, '_blank');

const sendEmail = () => {
  if (!name.value.value) name.value.error = 'Name is required.';
  if (!email.value.value) email.value.error = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.value)) email.value.error = 'Please enter a valid email.';

  if (name.value.error || email.value.error) return;

  emailjs
    .send(
      'service_ykyrrzg',
      'template_phi719d',
      {
        from_name: name.value.value,
        email: email.value.value,
        subject: subject.value,
        message: body.value
      },
      '7HLw0yzW9CQhh44Us'
    )
    .then(
      () => {
        toastService.add({ severity: 'success', summary: 'Success.', detail: 'Your message was successfully sent.' });
      },
      () => {
        toastService.add({ severity: 'error', summary: 'Error', detail: 'There was a problem sending your message, please try again.' });
      }
    );
};

onMounted(() => {
  const debounced = debounce(
    () => (activeLink.value = links.find((link) => (document.getElementById(link)?.getBoundingClientRect().bottom ?? 0) > 0) ?? ''),
    100
  );
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 0;
    debounced();
  });
});
</script>

<style>
html,
body,
#app {
  background: var(--surface-ground);
  height: 100%;
}
</style>
