<template>
    <div class="main">
        <Article 
            v-for="article in articles" 
            :key="article.article_id" 
            :id="article.article_id"
            :title="article.title"
            :content="article.content" 
            :uploadTime="article.upload_time" 
            :author="article.author"
            :categories="article.categories"  
            @click="goToDetail(article.article_id)"
            @category-click="goToCategory"   
        />
    </div>
</template>

<script>
import axios from 'axios';
import Article from './Articles.vue';

export default {
    components: {
        Article
    },
    data() {
        return {
            articles: [] // 用于存储从后端获取的文章数据
        };
    },
    created() {
        // 在组件创建时调用后端 API 获取数据
        axios.get('http://localhost:3000/articles-with-categories')
            .then(response => {
                // 关键修复：将分类对象数组转换为名称数组
                this.articles = response.data.map(article => ({
                    ...article,
                    // 转换 categories 字段为名称数组（假设后端返回对象数组）
                    categories: article.categories?.map(cat => cat.name) || ["默认分类"]
                }));
                console.log('Processed articles:', this.articles); // 验证数据格式
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.$message.error('加载文章失败');
            });
    },
    methods: {
        goToDetail(id) {
            console.log('Navigating to article ID:', id);
            this.$router.push(`/article/${id}`);
        },
        // 新增方法：跳转到分类页面
        goToCategory(categoryName) {
            // 编码分类名称以兼容特殊字符
            this.$router.push({
                name: 'CategoryArticles',
                params: { 
                    name: encodeURIComponent(categoryName)
                }
            });
        }
    }
};
</script>