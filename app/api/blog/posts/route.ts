import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getBlogPostsData() {
  const postsPath = path.join(process.cwd(), "data/blog-posts.json");
  try {
    const data = fs.readFileSync(postsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveBlogPostsData(data: any[]) {
  const postsPath = path.join(process.cwd(), "data/blog-posts.json");
  fs.writeFileSync(postsPath, JSON.stringify(data, null, 2));
}

function getCommentsData() {
  const commentsPath = path.join(process.cwd(), "data/blog-comments.json");
  try {
    const data = fs.readFileSync(commentsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Increment view count
export async function POST(request: NextRequest) {
  try {
    const { postId } = await request.json();
    
    if (!postId) {
      return NextResponse.json(
        { error: "Missing postId" },
        { status: 400 }
      );
    }

    const posts = getBlogPostsData();
    
    // Find and update post
    const postIndex = posts.findIndex((post: any) => post.id === postId);
    if (postIndex === -1) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    // Increment view count
    posts[postIndex].views += 1;
    
    // Save updated data
    saveBlogPostsData(posts);

    return NextResponse.json({
      success: true,
      views: posts[postIndex].views
    });

  } catch (error) {
    console.error("Error updating view count:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET all posts or specific post
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");
    const slug = searchParams.get("slug");
    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");
    const tag = searchParams.get("tag");
    
    const posts = getBlogPostsData();
    const comments = getCommentsData();

    if (postId || slug) {
      // Get specific post
      const post = posts.find((p: any) => 
        p.id === postId || p.slug === slug
      );
      
      if (!post) {
        return NextResponse.json(
          { error: "Post not found" },
          { status: 404 }
        );
      }

      // Get comments for this post
      const postComments = comments.filter(
        (comment: any) => comment.postId === post.id && !comment.parentCommentId
      );

      // Sort comments by creation date (newest first)
      postComments.sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Sort replies within each comment
      postComments.forEach((comment: any) => {
        if (comment.replies) {
          comment.replies.sort((a: any, b: any) => 
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }
      });

      return NextResponse.json({
        success: true,
        post,
        comments: postComments
      });
    }

    // Get all posts with filtering
    let filteredPosts = [...posts];

    // Filter by featured status
    if (featured === "true") {
      filteredPosts = filteredPosts.filter((post: any) => post.featured);
    }

    // Filter by tag
    if (tag) {
      filteredPosts = filteredPosts.filter((post: any) => 
        post.tags.includes(tag)
      );
    }

    // Sort by published date (newest first)
    filteredPosts.sort((a: any, b: any) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // Apply limit
    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum) && limitNum > 0) {
        filteredPosts = filteredPosts.slice(0, limitNum);
      }
    }

    // Get unique tags
    const allTags = Array.from(new Set(posts.flatMap((post: any) => post.tags)));

    return NextResponse.json({
      success: true,
      posts: filteredPosts,
      totalPosts: posts.length,
      filteredCount: filteredPosts.length,
      tags: allTags
    });

  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}