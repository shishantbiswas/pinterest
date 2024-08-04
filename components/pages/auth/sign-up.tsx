"use client";
import pb from "@/lib/pb";
import React, { useState, useTransition } from "react";
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
import { signUpSchema } from "@/schema/auth-schema";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { FormError } from "@/components/form-error";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import GoogleGIcon from "@/components/icons/google-g-icon";
import { ArrowLeft, ArrowLeftCircleIcon } from "lucide-react";
import { Container, Section } from "@/components/craft";

import placeholder from "@/public/placeholder.webp";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    const { email, password, passwordConfirm } = values;
    setError("");
    if (password !== passwordConfirm) {
      setError("Passwords are diffrent !");
      return;
    }
    startTransition(() => {
      pb.collection("users")
        .create({
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
        })
        .then((res) => {
          pb.collection("users").requestVerification(email);
          toast.success("Confirm your Email");
          router.push("/verify-email");
        })
        .catch((err) => {
          toast.error("The email is invalid or already in use");
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
                    <FormLabel>Email</FormLabel>
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="********"
                        {...field}
                        type={
                          showPassword
                            ? isPending
                              ? "password"
                              : "text"
                            : "password"
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" justify-between flex items-center">
                      Confirm Password
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
                            id="terms2"
                            checked={showPassword}
                            onCheckedChange={() =>
                              setShowPassword(!showPassword)
                            }
                          />
                          <label
                            htmlFor="terms2"
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
                <Link href={"/sign-in"}>
                  <button className="my-2 text-sm opacity-70 mb-0">
                    Already Have a Account ?
                  </button>
                </Link>
              </div>

              <FormError message={error} />
              <Button disabled={isPending} type="submit" className=" w-full">
                Sign Up
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
          <h1 className="font-semibold text-3xl mb-4">Sign Up</h1>
          <p className="text-sm text-gray-500 mb-4">
            By Signing In you accept to our{" "}
            <span className="text-black underline">Term and Conditions</span>{" "}
            and <span className="text-black underline">Privacy Policy</span>{" "}
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
