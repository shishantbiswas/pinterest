"use client";
import { useCallback, useRef, useState, useTransition } from "react";
import { Container, Section } from "../../craft";
import ImageDropzone from "../../image-dropzone";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostSchema } from "@/schema/post-schema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Trash2Icon, XCircle } from "lucide-react";
import { toast } from "sonner";
import useUser from "@/hooks/useUser";

type Tags = {
  id: number;
  name: string;
  value: string;
};

export default function CreatePost() {
  const [image, setImage] = useState<File | null>();
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);
  const [isPending, startTransition] = useTransition();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  }, []);

  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      // description: "",
      link: "",
    },
  });

  const tags = [
    {
      id: 1,
      name: "Art",
      value: "art",
    },
    {
      id: 2,
      name: "Architecture",
      value: "architecture",
    },
    {
      id: 3,
      name: "DIY and Crafts",
      value: "diyAndCrafts",
    },
    {
      id: 4,
      name: "Fashion",
      value: "fashion",
    },
    {
      id: 5,
      name: "Food and Drink",
      value: "foodAndDrink",
    },
    {
      id: 6,
      name: "Home Decor",
      value: "homeDecor",
    },
    {
      id: 7,
      name: "Travel",
      value: "travel",
    },
    {
      id: 8,
      name: "Weddings",
      value: "weddings",
    },
    {
      id: 9,
      name: "Health and Fitness",
      value: "healthAndFitness",
    },
    {
      id: 10,
      name: "Beauty",
      value: "beauty",
    },
    {
      id: 11,
      name: "Photography",
      value: "photography",
    },
    {
      id: 12,
      name: "Technology",
      value: "technology",
    },
    {
      id: 13,
      name: "Sports",
      value: "sports",
    },
    {
      id: 14,
      name: "Humor",
      value: "humor",
    },
  ];

  const user = useUser();

  function onSubmit(values: z.infer<typeof CreatePostSchema>) {
    startTransition(() => {
      const formData = new FormData();
      const formValues = form.getValues();
      if (!image) {
        toast.error("Please select an image before submitting.");
        return;
      }
      formData.append("image", image);
      formData.append("user", JSON.stringify(user));

      formData.append("tags", JSON.stringify(selectedTags));
      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      if (!user) {
        toast.error("Error: You're not logged In", {
          description: "Please try refreshing the page",
        });
        return;
      }
      fetch("/api/new", { method: "POST", body: formData }).then((res) => {
        res.json().then((result) => {
          if (result.success) {
            toast.success("Post Created Successfully");
          } else {
            toast.error("Error: Failed to create post");
          }
        });
      });
    });
  }

  const addUniqueTag = (tag: Tags) => {
    const existingTags = selectedTags.some(
      (existingTag) => existingTag.value === tag.value
    );
    const indexToRemove = selectedTags.findIndex(
      (existingTag) => existingTag.id === tag.id
    );

    if (existingTags) {
      setSelectedTags(
        selectedTags.filter((_, index) => index !== indexToRemove)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <Section>
      <Container className="w-full flex items-start flex-col md:flex-row gap-4 ">
        {!image ? (
          <div className="w-full h-[340px] md:sticky top-48">
            <ImageDropzone className=" h-full" onDrop={onDrop} />
          </div>
        ) : (
          <div className="relative w-full not-prose md:sticky top-48">
            <h1 className="text-2xl font-semibold mb-2">Image Preview</h1>
            <button
              className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-full"
              onClick={() => setImage(null)}
            >
              <Trash2Icon />
            </button>
            <img
              className="rounded-lg"
              src={URL.createObjectURL(image)}
              alt={image.name}
            />
          </div>
        )}
        <div className=" w-full not-prose">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" space-y-6 w-full mb-0"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending || !image}
                        placeholder="Add a Title"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending || !image}
                        placeholder="Add a link"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <h1 className="text-sm">Tags</h1>
              <div className="flex flex-wrap gap-2 prose">
                {tags.map((tag) => (
                  <TagsArray key={tag.id} tag={tag} addUniqueTag={addUniqueTag} image={image} isPending={isPending} />
                ))}
              </div>
              <Button
                disabled={isPending || !image}
                type="submit"
                className=" w-full"
              >
                {isPending
                  ? "Publishing"
                  : image
                  ? "Create Post"
                  : "Upload Image to Start editing"}
              </Button>
            </form>
          </Form>
        </div>
      </Container>
    </Section>
  );
}

const TagsArray = ({
  addUniqueTag,
  isPending,
  image,
  tag,
}: {
  tag: {
    id: number;
    name: string;
    value: string;
  };
  image: File | null | undefined;
  addUniqueTag: (tags:Tags) => void;
  isPending: boolean;
}) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <button
      style={{
        backgroundColor: isSelected ? "#64748b" : "",
        borderRadius: isSelected ? "50px" : "5px",
        color: isSelected ? "white" : "",
      }}
      disabled={isPending || !image}
      onClick={(event) => {
        event.preventDefault();
        addUniqueTag(tag);
        setIsSelected(!isSelected);
      }}
      className="px-3 text-sm py-1 border duration-500 flex gap-2 items-center text-center hover:bg-slate-200 disabled:opacity-50 disabled:hover:bg-transparent transition-all slate"
      key={tag.id}
    >
      {tag.name}
      <XCircle
        size={13}
        className="transition-all w-fit text-white"
        style={{
          scale: isSelected ? "1" : "0",
          width: isSelected ? "" : "0px",
        }}
      />
    </button>
  );
};
