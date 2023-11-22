"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PageWrapper from "../ui/PageWrapper";

export default function Page() {
  const [isAnimated, setIsAnimated] = useState(false);
  const router = useRouter();

  return (
    <PageWrapper>
      <>
        <Image
          className={`plane ${isAnimated ? "animated-plane" : ""}`}
          src={isAnimated ? "/plane-animated.webp" : "/plane.webp"}
          alt="Avión volando"
          width={630}
          height={540.5}
          onTransitionEnd={(e) => {
            e.currentTarget.style.display = "none";
            router.push("/");
          }}
        />
        <Image
          className="clouds"
          src="/cloud0.webp"
          alt="Nube"
          width={1920}
          height={1080}
        />
        <div className="z-[1]  w-full bg-white bg-opacity-95 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:bg-opacity-95 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Inicia sesión en tu cuenta
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Correo electrónico
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required={true}
                  />
                </label>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required={true}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Recordar contraseña
                    </label>
                  </div>
                </div>
                <Link
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <button
                type="submit"
                onClick={() => setIsAnimated(true)}
                className="transition-all w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Iniciar sesión
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                ¿No tienes una cuenta?{" "}
                <Link
                  href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Regístrate
                </Link>
              </p>
            </form>
          </div>
        </div>
      </>
    </PageWrapper>
  );
}
