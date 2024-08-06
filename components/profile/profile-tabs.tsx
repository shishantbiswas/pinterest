"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecordModel } from "pocketbase";
import Post from "../post";
import useUser from "@/hooks/useUser";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import ImageDropzone from "../image-dropzone";

export default function ProfileTabs({
  likedPosts,
  posts,
  id,
}: {
  posts: RecordModel[] | null;
  likedPosts: RecordModel | undefined | null;
  id: string;
}) {
  const signedInUser = useUser();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const formData = new FormData();

  const UpdateProfile = () => {
    formData.append("user", JSON.stringify(signedInUser) || "");

    if (!name || !username) {
      toast.warning("Name, Username are required !");
      return;
    }

    formData.append("name", name);
    formData.append("username", username);

    fetch("/api/update-profile", { method: "POST", body: formData }).then(
      (res) => {
        res
          .json()
          .then((result) => toast.success(result.success || result.error));
      }
    );
  };


  return (
    <Tabs defaultValue="created" className="mt-4">
      <TabsList className="w-fit flex items-center justify-start ">
        <TabsTrigger value="created">Created</TabsTrigger>
        {signedInUser?.id == id && (
          <>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="profile">Edit profile</TabsTrigger>
          </>
        )}
      </TabsList>
      <TabsContent value="created" className="columns-3  gap-4 h-fit my-8">
        {posts && posts.map((post) => <Post key={post.id} post={post} />)}
      </TabsContent>

      <TabsContent value="saved" className="columns-3  gap-4 h-fit my-8">
        {likedPosts?.expand?.likedPost?.map((post: RecordModel) => (
          <Post key={post.id} post={post} />
        ))}
      </TabsContent>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">             
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                defaultValue={`${signedInUser?.name}` || name}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                defaultValue={`${signedInUser?.username}`}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={UpdateProfile}>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
