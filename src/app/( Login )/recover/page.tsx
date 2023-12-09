import { CustomInput, PageWrapper } from "@/app/ui/components";
import Link from "next/link";

export default function Page() {
  return (
    <PageWrapper>
      <>
        <div className="z-[2] w-full bg-white bg-opacity-95 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:bg-opacity-95 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Crea una cuenta
            </h1>
            <form
              className="space-y-4 md:space-y-6 flex flex-col items-center"
            >
              <CustomInput
                id="name"
                label="Tu nombre"
                type="name"
                placeholder="John Doe"
                required={true}
                onChange={e => setName(e.target.value)}
              />
              <CustomInput
                id="email"
                label="Tu correo electrónico"
                type="email"
                placeholder="name@company.com"
                required={true}
                onChange={e => setEmail(e.target.value)}
              />
              <CustomInput
                id="password"
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                required={true}
                onChange={e => setPassword(e.target.value)}
              />
              <CustomInput
                id="confirm-password"
                label="Confirmar Contraseña"
                type="password"
                placeholder="••••••••"
                required={true}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <div className="w-full flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required={true}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    Acepto los{' '}
                    <Link
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      términos y condiciones
                    </Link>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={response.isLoading}
                className={`relative overflow-hidden transition-all duration-500 w-full aspect-[12/2] ease-in-out p-2.5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm  text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 
                btn
                ${response.isLoading && 'isLoading'} 
                ${response.isSuccess && 'isSuccess'} 
                ${response.hasError && 'hasError'}`}
              >
              </button>
              <p className="w-full text-sm font-light text-gray-500 dark:text-gray-400">
                ¿Ya tienes una cuenta?{' '}
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Inicia sesión
                </Link>
              </p>
            </form>
          </div>
        </div>
      </>
    </PageWrapper>);
}