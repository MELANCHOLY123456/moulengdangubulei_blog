<template>
  <div class="app">
    <Header />
    <button class="theme-switch" @click="toggleTheme" :aria-pressed="isDark">
      <span class="switch-track">
        <span class="switch-thumb" :class="{ dark: isDark }"></span>
      </span>
    </button>
    <NavBar />
    <div class="content">
      <Aside v-if="showAside" class="sidebar" />
      <router-view class="articles" />
    </div>
  </div>
</template>

<script>
import Header from './components/main-page/Header.vue';
import Aside from './components/main-page/Aside.vue';
import NavBar from './components/main-page/NavBar.vue';

export default {
  components: {
    Header,
    Aside,
    NavBar
  },
  data() {
    return {
      isDark: false
    };
  },
  computed: {
    showAside() {
      // 只在文章相关页面显示侧边栏
      return this.$route.path.startsWith('/articles') ||
             this.$route.path.startsWith('/article/') ||
             this.$route.path.startsWith('/category/');
    }
  },
  mounted() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.isDark = true;
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      this.isDark = false;
      document.documentElement.setAttribute('data-theme', '');
    }
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : '');
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    }
  }
};
</script>

<style>
.content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  margin: 32px auto 0 auto;
  min-height: 600px;
  box-sizing: border-box;
}
.sidebar {
  width: 260px;
  min-width: 200px;
  margin-right: 24px;
}
.articles {
  flex: 1;
  min-width: 0;
}

/* 主题切换开关样式 */
.theme-switch {
  position: absolute;
  top: 24px;
  right: 40px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  z-index: 100;
  padding: 0;
}
.switch-track {
  position: relative;
  width: 54px;
  height: 28px;
  background: var(--primary-color);
  border-radius: 16px;
  display: flex;
  align-items: center;
  transition: background 0.2s;
}
.switch-thumb {
  position: absolute;
  left: 3px;
  top: 3px;
  width: 22px;
  height: 22px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(0,0,0,0.12);
  transition: left 0.25s cubic-bezier(.4,2,.6,1);
  z-index: 2;
}
.switch-thumb.dark {
  left: 29px;
}

body, #app {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(120deg, var(--bg-color) 0%, var(--accent-color) 100%);
  background-size: 200% 200%;
  animation: globalGradientBG 16s ease-in-out infinite;
  color: var(--text-color);
  transition: background 0.2s, color 0.2s;
}
@keyframes globalGradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
