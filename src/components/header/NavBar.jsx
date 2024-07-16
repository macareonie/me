import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../context/ThemeContext";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "About Me", href: "/about", current: false },
  { name: "Food Blog", href: "/foodblog", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Disclosure as="nav" className="bg-gray-800 dark:bg-gray-900">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://i.pinimg.com/736x/be/13/d7/be13d79969e314e814d19a6c211772a8.jpg"
                    alt="Random Picture"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 dark:bg-gray-700 text-white"
                            : "text-gray-300 dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white",
                          "rounded-md px-3 py-2 text-lg font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="ml-4 p-2 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    {darkMode ? (
                      <SunIcon className="h-6 w-6" />
                    ) : (
                      <MoonIcon className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 dark:bg-gray-700 text-white"
                      : "text-gray-300 dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
              <button
                onClick={toggleTheme}
                className="w-full text-left p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                {darkMode ? (
                  <div className="flex items-center">
                    <SunIcon className="h-6 w-6 mr-2" />
                    Light Mode
                  </div>
                ) : (
                  <div className="flex items-center">
                    <MoonIcon className="h-6 w-6 mr-2" />
                    Dark Mode
                  </div>
                )}
              </button>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
