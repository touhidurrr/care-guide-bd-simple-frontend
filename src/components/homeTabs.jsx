"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addPost, getPosts, getUsers, restartServer } from "@/lib/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function HomeTabs() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsAdmin(Cookies.get("admin") === "true");
    getPosts().then(setPosts);
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    getUsers().then(setUsers);
  }, [isAdmin]);

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="posts">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          {isAdmin && <TabsTrigger value="admin">Admin</TabsTrigger>}
        </TabsList>

        <TabsContent value="posts">
          <Card className="shadow-md border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Posts</CardTitle>
              <CardDescription>
                Create, view, and manage your posts below.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    await addPost(title, content);
                    router.refresh();
                  } catch (err) {
                    console.error("Failed to create post:", err);
                  }
                }}
                className="p-4 border rounded-xl bg-gray-50 space-y-3"
              >
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title"
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="content" className="text-sm font-medium">
                    Content
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post..."
                    rows={3}
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Create Post
                  </Button>
                </div>
              </form>

              <div className="grid gap-4">
                {posts.length > 0 ? (
                  posts.map((post, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border hover:shadow-sm transition-all duration-200"
                    >
                      <h3 className="text-lg font-semibold mb-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
                        {post.content}
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>By: {post.username}</span>
                        <span>
                          {new Date(post.createdAt).toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No posts yet. Create one above!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {isAdmin && (
          <TabsContent value="admin">
            <Card className="shadow-md border border-gray-200">
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>
                  Manage registered users (admin only).
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {/* Restart Server Button */}
                <div className="flex flex-col gap-2">
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() =>
                      restartServer()
                        .then((result) => alert(`Server restarted:\n${result}`))
                        .catch((err) => {
                          console.error(err);
                          alert(
                            `Failed to restart server. Error: ${err.message}`,
                          );
                        })
                    }
                  >
                    Restart Server
                  </Button>
                </div>

                {/* Users list */}
                {users.length > 0 ? (
                  users.map((user, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-md border bg-gray-50 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{user.username}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {user.admin ? "admin" : "user"}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No users found.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      <Button
        onClick={() => {
          Cookies.remove("token");
          Cookies.remove("admin");
          router.refresh();
        }}
      >
        Logout
      </Button>
    </div>
  );
}
