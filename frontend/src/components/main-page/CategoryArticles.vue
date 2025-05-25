<template>
    <div class="category-articles">
        <h2 class="category-title">分类: {{ categoryName }}</h2>
        <Article 
            v-for="article in filteredArticles" 
            :key="article.article_id" 
            :id="article.article_id"
            :title="article.title"
            :content="article.content" 
            :uploadTime="article.upload_time" 
            :author="article.author" 
            :categories="article.categories" 
            @click="goToDetail(article.article_id)"
        />
        <button class="back-button" @click="goBack">返回主页</button>
    </div>
</template>

<script>
import axios from 'axios';
import Article from './Articles.vue';

export default {
    components: {
        Article
    },
    props: {
        name: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            articles: [],
            categoryName: this.name
        };
    },
    computed: {
        filteredArticles() {
            if (!Array.isArray(this.articles)) {
                return [];
            }

            if (typeof this.categoryName !== 'string') {
                return [];
            }

            return this.articles.filter(article => {
                if (!article.categories || !Array.isArray(article.categories)) {
                    return false;
                }

                return article.categories.some(cat => 
                    cat.toString().toLowerCase() === this.categoryName.toLowerCase()
                );
            });
        }
    },
    created() {
        this.categoryName = this.name || this.$route.params.name;
        
        axios.get('http://localhost:3000/articles-with-categories')
            .then(response => {
                if (Array.isArray(response.data)) {
                    this.articles = response.data;
                    console.log('Loaded articles:', this.articles);
                    console.log('Current category:', this.categoryName);
                } else {
                    console.error('Invalid response format:', response.data);
                    this.$message.error('加载的文章数据格式不正确');
                }
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
                this.$message.error('加载文章列表失败，请稍后重试');
            });
    },
    methods: {
        goToDetail(id) {
            this.$router.push(`/article/${id}`);
        },
        goBack() {
            this.$router.push('/');
        }
    }
};
</script>