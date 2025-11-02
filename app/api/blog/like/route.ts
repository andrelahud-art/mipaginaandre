import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Simulated user tracking (in a real app, you'd use authentication)
const userTrackingCookie = 'blog-user-id';

function getUserId(request: NextRequest): string {
  const userId = request.cookies.get(userTrackingCookie)?.value;
  if (!userId) {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
  return userId;
}

function getLikesData() {
  const likesPath = path.join(process.cwd(), "data/blog-likes.json");
  try {
    const data = fs.readFileSync(likesPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveLikesData(data: any[]) {
  const likesPath = path.join(process.cwd(), "data/blog-likes.json");
  fs.writeFileSync(likesPath, JSON.stringify(data, null, 2));
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

export async function POST(request: NextRequest) {
  try {
    const { postId, action } = await request.json();
    
    if (!postId || !action || (action !== "like" && action !== "unlike")) {
      return NextResponse.json(
        { error: "Missing or invalid postId or action" },
        { status: 400 }
      );
    }

    const userId = getUserId(request);
    const likes = getLikesData();
    const posts = getBlogPostsData();

    // Find the post
    const postIndex = posts.findIndex((post: any) => post.id === postId);
    if (postIndex === -1) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    // Check if user already liked this post
    const existingLikeIndex = likes.findIndex(
      (like: any) => like.postId === postId && like.userId === userId
    );

    if (action === "like") {
      if (existingLikeIndex === -1) {
        // Add new like
        likes.push({
          id: Math.random().toString(36).substring(2) + Date.now().toString(36),
          postId,
          userId,
          createdAt: new Date().toISOString()
        });
        
        // Increment post likes count
        posts[postIndex].likes += 1;
      }
    } else if (action === "unlike") {
      if (existingLikeIndex !== -1) {
        // Remove like
        likes.splice(existingLikeIndex, 1);
        
        // Decrement post likes count
        posts[postIndex].likes = Math.max(0, posts[postIndex].likes - 1);
      }
    }

    // Save updated data
    saveLikesData(likes);
    saveBlogPostsData(posts);

    const response = NextResponse.json({
      success: true,
      likes: posts[postIndex].likes,
      userLiked: action === "like" ? (existingLikeIndex === -1) : false
    });

    // Set user cookie if it doesn't exist
    if (!request.cookies.get(userTrackingCookie)?.value) {
      response.cookies.set(userTrackingCookie, userId, {
        maxAge: 365 * 24 * 60 * 60, // 1 year
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
      });
    }

    return response;

  } catch (error) {
    console.error("Error processing like:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint to check if user has liked a post
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

    const userId = getUserId(request);
    const likes = getLikesData();
    
    const userLiked = likes.some(
      (like: any) => like.postId === postId && like.userId === userId
    );

    return NextResponse.json({
      userLiked,
      userId
    });

  } catch (error) {
    console.error("Error checking like status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}