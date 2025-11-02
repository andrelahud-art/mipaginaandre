import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getCommentsData() {
  const commentsPath = path.join(process.cwd(), "data/blog-comments.json");
  try {
    const data = fs.readFileSync(commentsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveCommentsData(data: any[]) {
  const commentsPath = path.join(process.cwd(), "data/blog-comments.json");
  fs.writeFileSync(commentsPath, JSON.stringify(data, null, 2));
}

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

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeContent(content: string): string {
  // Basic content sanitization
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    const { postId, author, email, content, parentCommentId } = await request.json();
    
    // Validation
    if (!postId || !author || !email || !content) {
      return NextResponse.json(
        { error: "Missing required fields: postId, author, email, content" },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (content.length < 5 || content.length > 1000) {
      return NextResponse.json(
        { error: "Comment must be between 5 and 1000 characters" },
        { status: 400 }
      );
    }

    if (author.length < 2 || author.length > 50) {
      return NextResponse.json(
        { error: "Author name must be between 2 and 50 characters" },
        { status: 400 }
      );
    }

    const comments = getCommentsData();
    const posts = getBlogPostsData();

    // Check if post exists
    const postIndex = posts.findIndex((post: any) => post.id === postId);
    if (postIndex === -1) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    // Create new comment
    const newComment = {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      postId,
      author: sanitizeContent(author),
      email: email.toLowerCase(),
      content: sanitizeContent(content),
      createdAt: new Date().toISOString(),
      likes: 0,
      parentCommentId: parentCommentId || null
    };

    // If it's a reply, add it to parent comment's replies
    if (parentCommentId) {
      const parentCommentIndex = comments.findIndex(
        (comment: any) => comment.id === parentCommentId && comment.postId === postId
      );
      
      if (parentCommentIndex === -1) {
        return NextResponse.json(
          { error: "Parent comment not found" },
          { status: 404 }
        );
      }

      if (!comments[parentCommentIndex].replies) {
        comments[parentCommentIndex].replies = [];
      }
      
      comments[parentCommentIndex].replies.push(newComment);
    } else {
      // Add as top-level comment
      comments.push({
        ...newComment,
        replies: []
      });
    }

    // Update post comments count
    posts[postIndex].commentsCount = comments.filter(
      (comment: any) => comment.postId === postId
    ).length + comments
      .filter((comment: any) => comment.postId === postId)
      .reduce((total: number, comment: any) => total + (comment.replies?.length || 0), 0);

    // Save updated data
    saveCommentsData(comments);
    saveBlogPostsData(posts);

    return NextResponse.json({
      success: true,
      comment: newComment,
      totalComments: posts[postIndex].commentsCount
    });

  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch comments for a post
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");
    
    if (!postId) {
      return NextResponse.json(
        { error: "Missing postId parameter" },
        { status: 400 }
      );
    }

    const comments = getCommentsData();
    
    // Filter comments for the specific post
    const postComments = comments.filter(
      (comment: any) => comment.postId === postId && !comment.parentCommentId
    );

    // Sort by creation date (newest first)
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
      comments: postComments,
      total: postComments.length + postComments.reduce(
        (total: number, comment: any) => total + (comment.replies?.length || 0), 0
      )
    });

  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}