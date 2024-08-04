"use client";

import { Separator } from "@/components/ui/separator";
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { FormError } from "@/components/form-error";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function VerifyEmail() {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const resendEmail = z.object({
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof resendEmail>>({
    resolver: zodResolver(resendEmail),
    defaultValues: {
      email: "",
    },
  });

  const emailList = [
    {
      id: 1,
      name: "Gmail",
      link: "https://mail.google.com/mail",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="52 42 88 66">
          <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
          <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
          <path
            fill="#fbbc04"
            d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"
          />
          <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92" />
          <path
            fill="#c5221f"
            d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"
          />
        </svg>
      ),
    },
    {
      id: 2,
      name: "Outlook",
      link: "https://look.live.com/mail/0/",
      icon: (
        <svg
          version="1.1"
          id="Livello_1"
          x="0px"
          y="0px"
          viewBox="0 0 1831.085 1703.335"
          enableBackground="new 0 0 1831.085 1703.335"
        >
          <path
            fill="#0A2767"
            d="M1831.083,894.25c0.1-14.318-7.298-27.644-19.503-35.131h-0.213l-0.767-0.426l-634.492-375.585  c-2.74-1.851-5.583-3.543-8.517-5.067c-24.498-12.639-53.599-12.639-78.098,0c-2.934,1.525-5.777,3.216-8.517,5.067L446.486,858.693  l-0.766,0.426c-19.392,12.059-25.337,37.556-13.278,56.948c3.553,5.714,8.447,10.474,14.257,13.868l634.492,375.585  c2.749,1.835,5.592,3.527,8.517,5.068c24.498,12.639,53.599,12.639,78.098,0c2.925-1.541,5.767-3.232,8.517-5.068l634.492-375.585  C1823.49,922.545,1831.228,908.923,1831.083,894.25z"
          />
          <path
            fill="#0364B8"
            d="M520.453,643.477h416.38v381.674h-416.38V643.477z M1745.917,255.5V80.908  c1-43.652-33.552-79.862-77.203-80.908H588.204C544.552,1.046,510,37.256,511,80.908V255.5l638.75,170.333L1745.917,255.5z"
          />
          <path fill="#0078D4" d="M511,255.5h425.833v383.25H511V255.5z" />
          <path
            fill="#28A8EA"
            d="M1362.667,255.5H936.833v383.25L1362.667,1022h383.25V638.75L1362.667,255.5z"
          />
          <path
            fill="#0078D4"
            d="M936.833,638.75h425.833V1022H936.833V638.75z"
          />
          <path fill="#0364B8" d="M936.833,1022h425.833v383.25H936.833V1022z" />
          <path
            fill="#14447D"
            d="M520.453,1025.151h416.38v346.969h-416.38V1025.151z"
          />
          <path fill="#0078D4" d="M1362.667,1022h383.25v383.25h-383.25V1022z" />
          <linearGradient
            id="SVGID_1_"
            gradientUnits="userSpaceOnUse"
            x1="1128.4584"
            y1="811.0833"
            x2="1128.4584"
            y2="1.9982"
            gradientTransform="matrix(1 0 0 -1 0 1705.3334)"
          >
            <stop offset="0" stopColor="#35B8F1" />
            <stop offset="1" stopColor="#28A8EA" />
          </linearGradient>
          <path
            fill="url(#SVGID_1_)"
            d="M1811.58,927.593l-0.809,0.426l-634.492,356.848c-2.768,1.703-5.578,3.321-8.517,4.769  c-10.777,5.132-22.481,8.029-34.407,8.517l-34.663-20.27c-2.929-1.47-5.773-3.105-8.517-4.897L447.167,906.003h-0.298  l-21.036-11.753v722.384c0.328,48.196,39.653,87.006,87.849,86.7h1230.914c0.724,0,1.363-0.341,2.129-0.341  c10.18-0.651,20.216-2.745,29.808-6.217c4.145-1.756,8.146-3.835,11.966-6.217c2.853-1.618,7.75-5.152,7.75-5.152  c21.814-16.142,34.726-41.635,34.833-68.772V894.25C1831.068,908.067,1823.616,920.807,1811.58,927.593z"
          />
          <path
            opacity="0.5"
            fill="#0A2767"
            d="M1797.017,891.397v44.287l-663.448,456.791L446.699,906.301  c0-0.235-0.191-0.426-0.426-0.426l0,0l-63.023-37.899v-31.938l25.976-0.426l54.932,31.512l1.277,0.426l4.684,2.981  c0,0,645.563,368.346,647.267,369.197l24.698,14.478c2.129-0.852,4.258-1.703,6.813-2.555  c1.278-0.852,640.879-360.681,640.879-360.681L1797.017,891.397z"
          />
          <path
            fill="#1490DF"
            d="M1811.58,927.593l-0.809,0.468l-634.492,356.848c-2.768,1.703-5.578,3.321-8.517,4.769  c-24.641,12.038-53.457,12.038-78.098,0c-2.918-1.445-5.76-3.037-8.517-4.769L446.657,928.061l-0.766-0.468  c-12.25-6.642-19.93-19.409-20.057-33.343v722.384c0.305,48.188,39.616,87.004,87.803,86.7c0.001,0,0.002,0,0.004,0h1229.636  c48.188,0.307,87.5-38.509,87.807-86.696c0-0.001,0-0.002,0-0.004V894.25C1831.068,908.067,1823.616,920.807,1811.58,927.593z"
          />
          <path
            opacity="0.1"
            d="M1185.52,1279.629l-9.496,5.323c-2.752,1.752-5.595,3.359-8.517,4.812  c-10.462,5.135-21.838,8.146-33.47,8.857l241.405,285.479l421.107,101.476c11.539-8.716,20.717-20.178,26.7-33.343L1185.52,1279.629  z"
          />
          <path
            opacity="0.05"
            d="M1228.529,1255.442l-52.505,29.51c-2.752,1.752-5.595,3.359-8.517,4.812  c-10.462,5.135-21.838,8.146-33.47,8.857l113.101,311.838l549.538,74.989c21.649-16.254,34.394-41.743,34.407-68.815v-9.326  L1228.529,1255.442z"
          />
          <path
            fill="#28A8EA"
            d="M514.833,1703.333h1228.316c18.901,0.096,37.335-5.874,52.59-17.033l-697.089-408.331  c-2.929-1.47-5.773-3.105-8.517-4.897L447.125,906.088h-0.298l-20.993-11.838v719.914  C425.786,1663.364,465.632,1703.286,514.833,1703.333C514.832,1703.333,514.832,1703.333,514.833,1703.333z"
          />
          <path
            opacity="0.1"
            d="M1022,418.722v908.303c-0.076,31.846-19.44,60.471-48.971,72.392  c-9.148,3.931-19,5.96-28.957,5.962H425.833V383.25H511v-42.583h433.073C987.092,340.83,1021.907,375.702,1022,418.722z"
          />
          <path
            opacity="0.2"
            d="M979.417,461.305v908.302c0.107,10.287-2.074,20.469-6.388,29.808  c-11.826,29.149-40.083,48.273-71.54,48.417H425.833V383.25h475.656c12.356-0.124,24.533,2.958,35.344,8.943  C962.937,405.344,979.407,432.076,979.417,461.305z"
          />
          <path
            opacity="0.2"
            d="M979.417,461.305v823.136c-0.208,43-34.928,77.853-77.927,78.225H425.833V383.25  h475.656c12.356-0.124,24.533,2.958,35.344,8.943C962.937,405.344,979.407,432.076,979.417,461.305z"
          />
          <path
            opacity="0.2"
            d="M936.833,461.305v823.136c-0.046,43.067-34.861,78.015-77.927,78.225H425.833  V383.25h433.072c43.062,0.023,77.951,34.951,77.927,78.013C936.833,461.277,936.833,461.291,936.833,461.305z"
          />
          <linearGradient
            id="SVGID_2_"
            gradientUnits="userSpaceOnUse"
            x1="162.7469"
            y1="1383.0741"
            x2="774.0864"
            y2="324.2592"
            gradientTransform="matrix(1 0 0 -1 0 1705.3334)"
          >
            <stop offset="0" stopColor="#1784D9" />
            <stop offset="0.5" stopColor="#107AD5" />
            <stop offset="1" stopColor="#0A63C9" />
          </linearGradient>
          <path
            fill="url(#SVGID_2_)"
            d="M78.055,383.25h780.723c43.109,0,78.055,34.947,78.055,78.055v780.723  c0,43.109-34.946,78.055-78.055,78.055H78.055c-43.109,0-78.055-34.947-78.055-78.055V461.305  C0,418.197,34.947,383.25,78.055,383.25z"
          />
          <path
            fill="#FFFFFF"
            d="M243.96,710.631c19.238-40.988,50.29-75.289,89.17-98.495c43.057-24.651,92.081-36.94,141.675-35.515  c45.965-0.997,91.321,10.655,131.114,33.683c37.414,22.312,67.547,55.004,86.742,94.109c20.904,43.09,31.322,90.512,30.405,138.396  c1.013,50.043-9.706,99.628-31.299,144.783c-19.652,40.503-50.741,74.36-89.425,97.388c-41.327,23.734-88.367,35.692-136.011,34.578  c-46.947,1.133-93.303-10.651-134.01-34.067c-37.738-22.341-68.249-55.07-87.892-94.28c-21.028-42.467-31.57-89.355-30.745-136.735  C212.808,804.859,223.158,755.686,243.96,710.631z M339.006,941.858c10.257,25.912,27.651,48.385,50.163,64.812  c22.93,16.026,50.387,24.294,78.353,23.591c29.783,1.178,59.14-7.372,83.634-24.358c22.227-16.375,39.164-38.909,48.715-64.812  c10.677-28.928,15.946-59.572,15.543-90.404c0.33-31.127-4.623-62.084-14.649-91.554c-8.855-26.607-25.246-50.069-47.182-67.537  c-23.88-17.79-53.158-26.813-82.91-25.55c-28.572-0.74-56.644,7.593-80.184,23.804c-22.893,16.496-40.617,39.168-51.1,65.365  c-23.255,60.049-23.376,126.595-0.341,186.728L339.006,941.858z"
          />
          <path
            fill="#50D9FF"
            d="M1362.667,255.5h383.25v383.25h-383.25V255.5z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      name: "iCloud",
      link: "https://mail.icloud.com",
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Mail_%28iOS%29.svg/480px-Mail_%28iOS%29.svg.png"
          alt="iCloud Logo"
        />
      ),
    },
  ];

  function onSubmit(values: z.infer<typeof resendEmail>) {
    const { email } = values;
    setError("");
    if (!email) {
      setError("Email is required !");
      return;
    }
    startTransition(() => {
      pb.collection("users")
        .requestVerification(email)
        .then((res) => {
          toast.success("Verification Email send")
        })
        .catch((err)=>{
          toast.error('A verification email was already sent.')
        })
    });
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="max-w-[350px] p-6 space-y-4 rounded-lg border">
        <h1 className="text-3xl font-bold ">Verify your Accounts</h1>
        <p className=" text-sm opacity-40 text-wrap">
          We have sent you a Verification Mail on your provided Email Address
        </p>
        <div className="flex items-center justify-between ">
          {emailList.map((link) => (
            <Link target="_blank" href={`${link.link}`} key={link.id}>
              <div className=" max-h-[50px] aspect-square ">{link.icon}</div>
              <p>{link.name}</p>
            </Link>
          ))}
        </div>
        <Separator />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-4 min-w-[300px] mb-0"
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
            <div className=" flex flex-col">
              <Link href={"/sign-in"}>
                <button className="text-sm opacity-70 mb-0">
                  Already Have a Account ?
                </button>
              </Link>
            </div>
            <FormError message={error} />
            <Button disabled={isPending} type="submit" className=" w-full">
              Resend Verfication Email
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}