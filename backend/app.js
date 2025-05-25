const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

const db = require('./db');

app.use(cors({
    origin: 'http://localhost:5173', // 允许的前端地址
    methods: ['GET', 'POST'], // 允许的 HTTP 方法
    allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
    credentials: true // 如果需要支持跨域携带凭据
}));

// 测试接口
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// 获取所有文章数据
app.get('/data', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM articles');
        res.json(rows);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Error retrieving data from database');
    }
});

// 根据文章 ID 获取文章详情
app.get('/data/:id', async (req, res) => {
    const articleId = req.params.id; // 获取 URL 参数中的文章 ID
    try {
        const [rows] = await db.query('SELECT * FROM articles WHERE article_id = ?', [articleId]);
        if (rows.length > 0) {
            res.json(rows[0]); // 返回找到的文章详情
        } else {
            res.status(404).json({ error: 'Article not found' }); // 如果未找到，返回 404 错误
        }
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'Error retrieving article from database' });
    }
});


// 获取所有类别
app.get('/categories', async (req, res) => {
    try {
        // 使用更安全的SQL写法，移除注释
        const queryText = 'SELECT * FROM categories ORDER BY name ASC';
        const [rows] = await db.query(queryText);

        res.json(rows);
    } catch (error) {
        console.error('Database query error:', {
            message: error.message,
            stack: error.stack,
            query: 'SELECT * FROM categories ORDER BY name ASC'
        });

        res.status(500).json({
            error: 'Error retrieving categories',
            details: process.env.NODE_ENV === 'development'
                ? error.message
                : 'Internal server error'
        });
    }
});

// 获取带类别的文章
app.get('/articles-with-categories', async (req, res) => {
    try {
        const [articles] = await db.query(`
            SELECT 
                a.*, 
                JSON_ARRAYAGG(c.name) AS categories
            FROM articles a
            LEFT JOIN article_categories ac ON a.article_id = ac.article_id
            LEFT JOIN categories c ON ac.category_id = c.category_id
            GROUP BY a.article_id
        `);
        res.json(articles);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'Error retrieving articles with categories' });
    }
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
