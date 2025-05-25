<template>
    <header class="header" @click="goToHome">
        <div class="header-content">
            <img class="site-logo" src="/src/assets/pic/melancholy.jpg" alt="logo" />
            <h1 class="header-title">眸冷但骨不累</h1>
            <p class="subtitle">一个CS领域大学生的自学之路</p>
        </div>
    </header>
</template>

<script>
export default {
    methods: {
        goToHome() {
            this.$router.push('/');
        }
    }
};
</script>

<style scoped>
.header {
    /* background: linear-gradient(120deg, #f4f8fc 0%, #eaf1fb 100%); */
    background: linear-gradient(120deg, var(--bg-color) 0%, var(--accent-color) 100%);
    border-bottom: none;
    box-shadow: 0 2px 16px 0 rgba(91,143,249,0.06);
    border-radius: 0 0 24px 24px;
    padding: 2.5rem 1rem 2.5rem 1rem;
    margin-bottom: 1.2rem;
    text-align: center;
    transition: box-shadow 0.3s;
    position: relative;
    z-index: 10;
    overflow: hidden;
}
.header::after {
    content: "";
    display: block;
    position: absolute;
    left: 0; right: 0; bottom: -1px;
    height: 48px;
    background: var(--header-wave-bg, #e3f6f5);
    mask-image: url('data:image/svg+xml;utf8,<svg width="1440" height="48" viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 24C240 48 480 0 720 24C960 48 1200 0 1440 24V48H0V24Z" fill="black"/></svg>');
    mask-size: cover;
    mask-repeat: no-repeat;
    z-index: 2;
    pointer-events: none;
}
.site-logo {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 0.8rem;
    box-shadow: 0 2px 8px rgba(91,143,249,0.08);
    object-fit: cover;
    border: 3px solid #fff;
}
.header-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    position: relative;
    z-index: 3;
}

.header-title {
    font-family: 'Noto Sans SC', 'Poppins', sans-serif;
    font-size: 2.1rem;
    font-weight: 700;
    color: #22335b;
    margin-bottom: 0.5rem;
    letter-spacing: 0.5px;
    transition: color 0.2s;
    position: relative;
    cursor: pointer;
}
.header-title::after {
    content: "";
    display: block;
    margin: 0.5rem auto 0 auto;
    width: 2.5rem;
    height: 3px;
    border-radius: 2px;
    background: var(--primary-color);
    opacity: 0.18;
}
.header-title:hover {
    color: var(--primary-color);
}
.subtitle {
    font-size: 1.05rem;
    color: var(--meta-color);
    margin-top: 0.2rem;
    margin-bottom: 0;
    font-style: italic;
    opacity: 0.85;
    transition: color 0.3s, opacity 0.3s;
}

@media (max-width: 768px) {
    .header-title {
        font-size: 1.5rem;
    }
    .subtitle {
        font-size: 0.95rem;
    }
    .header {
        padding: 1.5rem 0.5rem 1rem 0.5rem;
    }
}

@media (max-width: 480px) {
    .header-title {
        font-size: 1.1rem;
        letter-spacing: normal;
    }
    .subtitle {
        font-size: 0.85rem;
    }
}
</style>