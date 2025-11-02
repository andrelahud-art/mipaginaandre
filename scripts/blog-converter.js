const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Function to convert markdown files to JSON
function convertMarkdownToJson() {
  const contentDir = path.join(process.cwd(), 'content/blog');
  const dataDir = path.join(process.cwd(), 'data');
  
  if (!fs.existsSync(contentDir)) {
    console.log('Content directory does not exist');
    return;
  }

  const markdownFiles = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
  const posts = [];

  markdownFiles.forEach(file => {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);
    
    // Generate unique ID from slug or filename
    const id = frontmatter.slug || path.basename(file, '.md');
    
    // Create post object matching your JSON structure
    const post = {
      id,
      title: frontmatter.title,
      slug: frontmatter.slug,
      excerpt: frontmatter.excerpt,
      content: content.trim(),
      author: frontmatter.author,
      publishedAt: frontmatter.publishedAt,
      tags: frontmatter.tags || [],
      readTime: frontmatter.readTime,
      featured: frontmatter.featured || false,
      likes: frontmatter.likes || 0,
      views: frontmatter.views || 0,
      commentsCount: frontmatter.commentsCount || 0,
      image: frontmatter.image || ""
    };
    
    posts.push(post);
  });

  // Sort by published date (newest first)
  posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Write to JSON file
  const outputPath = path.join(dataDir, 'blog-posts.json');
  fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));
  
  console.log(`✅ Converted ${posts.length} markdown files to JSON`);
  console.log(`📄 Output: ${outputPath}`);
}

// Function to create markdown from JSON (for migration)
function convertJsonToMarkdown() {
  const dataPath = path.join(process.cwd(), 'data/blog-posts.json');
  const contentDir = path.join(process.cwd(), 'content/blog');
  
  if (!fs.existsSync(dataPath)) {
    console.log('blog-posts.json does not exist');
    return;
  }

  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  const posts = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  
  posts.forEach(post => {
    const frontmatter = `---
title: "${post.title}"
slug: "${post.slug}"
excerpt: "${post.excerpt}"
author: "${post.author}"
publishedAt: "${post.publishedAt}"
tags: [${post.tags.map(tag => `"${tag}"`).join(', ')}]
readTime: "${post.readTime}"
featured: ${post.featured}
likes: ${post.likes}
views: ${post.views}
commentsCount: ${post.commentsCount}
image: "${post.image}"
---

`;

    const markdownContent = frontmatter + post.content;
    const fileName = `${post.slug}.md`;
    const filePath = path.join(contentDir, fileName);
    
    fs.writeFileSync(filePath, markdownContent);
    console.log(`✅ Created ${fileName}`);
  });
}

// Run based on command line argument
const command = process.argv[2];

if (command === 'md-to-json') {
  convertMarkdownToJson();
} else if (command === 'json-to-md') {
  convertJsonToMarkdown();
} else {
  console.log(`
📝 Blog Content Converter

Usage:
  node scripts/blog-converter.js md-to-json   # Convert Markdown files to JSON
  node scripts/blog-converter.js json-to-md   # Convert JSON to Markdown files

This script helps you work with markdown files while maintaining
compatibility with your existing JSON-based blog system.
  `);
}

module.exports = { convertMarkdownToJson, convertJsonToMarkdown };