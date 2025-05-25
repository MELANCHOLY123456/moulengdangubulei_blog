<template>
    <div class="article-detail">
        <h1 class="article-title">{{ article.title }}</h1>
        <p class="article-meta"><strong>Author:</strong> {{ article.author }}</p>
        <p class="article-meta"><strong>Upload Time:</strong> {{ formattedUploadTime }}</p>
        <div class="article-content">
            <p>{{ article.content }}</p>
        </div>
        <button class="back-button" @click="goBack">Back to Home</button>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            article: {}
        };
    },
    computed: {
        formattedUploadTime() {
            const date = new Date(this.article.upload_time);
            return date.toLocaleString();
        }
    },
    created() {
        const id = this.id ?? this.$route.params.id;
        axios.get(`http://localhost:3000/data/${id}`)
            .then(response => {
                console.log('article detail:', response.data); 
                this.article = response.data;
            })
            .catch(error => {
                console.error('Error fetching article details:', error);
            });
    },
    methods: {
        goBack() {
            this.$router.push('/');
        }
    }
};
</script>

<style scoped>
.article-detail {
    padding: 20px;
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(60, 100, 180, 0.07), 0 1.5px 4px rgba(0,0,0,0.03);
    color: var(--text-color);
    line-height: 1.6;
}

.article-title {
    font-size: 2rem;
    font-weight: bold;
    color: var(--text-color);
    margin-bottom: 1rem;
}

.article-meta {
    font-size: 1rem;
    color: var(--meta-color);
    margin-bottom: 0.5rem;
}

.article-content {
    font-size: 1rem;
    color: var(--text-color);
    margin-top: 1rem;
    white-space: pre-wrap;
}

.back-button {
    background: var(--primary-color);
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background 0.2s;
}

.back-button:hover {
    background: var(--accent-color);
    color: var(--text-color);
}
</style>