"use client";
import pb from "@/lib/pb";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInSchema } from "@/schema/auth-schema";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { FormError } from "@/components/form-error";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import GoogleGIcon from "@/components/icons/google-g-icon";
import { Container, Section } from "@/components/craft";
import { ArrowLeft, ArrowRight } from "lucide-react";

import placeholder from "@/public/placeholder.webp";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signInSchema>) {
    const { email, password } = values;
    setError("");
    startTransition(() => {
      pb.collection("users")
        .authWithPassword(email, password)
        .then((res) => {
          router.push("/");
        })
        .catch((err) => {
          toast.error("Invalid login credentials.");
        });
    });
  }
  const googleAuth = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(() => {
      pb.collection("users")
        .authWithOAuth2({ provider: "google" })
        .then((res) => {
          router.push("/");
        })
        .catch((err) => {
          toast.error("Error: Sign Up Failed !");
        });
    });
  };

  return (
    <Section>
      <Container className="flex flex-col-reverse min-[800px]:flex-row gap-2">
        <div className="space-y-4 min-[800px]:w-[700px] lg:w-[800px] p-4 sm:p-8 flex flex-col items-center border rounded-xl">
          <form className="w-full" onSubmit={googleAuth}>
            <Button
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2"
              variant={"outline"}
              type="submit"
            >
              <GoogleGIcon className="size-4" />
              Sign In With Google
            </Button>
          </form>
          <Separator />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" space-y-6 w-full mb-0"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email/Username</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="johhnysilverhand@cp.nc"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" justify-between flex items-center">
                      Password
                      <Button
                        asChild
                        variant={"link"}
                        size={"sm"}
                        className=" text-sm opacity-70 mb-0"
                      >
                        <Link href={"/reset"}>Forgot Password ?</Link>
                      </Button>
                    </FormLabel>
                    <FormControl>
                      <div className="mt-4">
                        <Input
                          disabled={isPending}
                          placeholder="********"
                          type={
                            showPassword
                              ? isPending
                                ? "password"
                                : "text"
                              : "password"
                          }
                          {...field}
                        />
                        <FormMessage />
                        <div className=" flex items-center gap-2 mt-4">
                          <Checkbox
                            id="password"
                            checked={showPassword}
                            onCheckedChange={() =>
                              setShowPassword(!showPassword)
                            }
                          />
                          <label
                            htmlFor="password"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Show Password
                          </label>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className=" flex flex-col">
                <Link href={"/sign-up"}>
                  <button className="my-2 text-sm opacity-70 mb-0">
                    Already Have a Account ?
                  </button>
                </Link>
              </div>
              <FormError message={error} />
              <Button disabled={isPending} type="submit" className=" w-full">
                {isPending ? "Signing In" : "Sign In"}
              </Button>
            </form>
          </Form>
        </div>
        <div className=" w-full border min-h-full rounded-lg p-8 not-prose">
          <Button
            onClick={() => router.back()}
            className="mb-6 w-fit flex items-center gap-2"
            size={"sm"}
            variant={"outline"}
          >
            <ArrowLeft className="w-4" />
            Previous Page
          </Button>
          <h1 className="font-semibold text-3xl mb-4">Sign In</h1>
          <p className="text-sm text-gray-500 mb-4">
            Welcome Back !
          </p>
          <img
            className="h-52 w-full object-cover rounded-lg"
            src={Object.values(placeholder)[0]}
            alt="sign-in-image"
          />
        </div>
      </Container>
    </Section>
  );
}
