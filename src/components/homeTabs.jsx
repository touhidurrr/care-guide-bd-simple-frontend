"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPosts, register } from "@/lib/api";
import { redirect } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

export function HomeTabs() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="login">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
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
                    await createPost(postTitle, postContent);
                    redirect("/");
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
                {getPosts().length > 0 ? (
                  getPosts().map((post, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border hover:shadow-sm transition-all duration-200"
                    >
                      <h3 className="text-lg font-semibold mb-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {post.content}
                      </p>
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

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>Create a new account.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() =>
                  register(username, name, email, password)
                    .then((res) => {})
                    .catch((err) => {})
                }
              >
                Register
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
