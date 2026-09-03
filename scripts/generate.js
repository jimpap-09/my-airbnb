#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const args = process.argv.slice(2);

function getOption(name, fallback) {
    const index = args.indexOf(`--${name}`);
    return index === -1 ? fallback : args[index + 1];
}

function hasFlag(name) {
    return args.includes(`--${name}`);
}

function printHelp() {
    console.log(`
Generate reusable Next.js UI

Usage:
  npm run generate -- --type navbar --name MainNavbar
  npm run generate -- --type site --name LandingPage
  node /path/to/scripts/generate.js --type navbar --name MainNavbar

Options:
  --type     navbar or site (required)
  --name     component name (default: GeneratedPage)
  --output   destination directory (default: app/generated)
  --root     root directory for generated files (default: current directory)
  --force    allow replacing files in the destination directory
  --help     show this help
`);
}

if (hasFlag("help")) {
    printHelp();
    process.exit(0);
}

const type = getOption("type");
const name = getOption("name", "GeneratedPage");
const output = getOption("output", "app/generated");
const root = path.resolve(getOption("root", process.cwd()));

if (!["navbar", "site"].includes(type)) {
    console.error("Error: --type must be either 'navbar' or 'site'.");
    printHelp();
    process.exit(1);
}

if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) {
    console.error("Error: --name must be a PascalCase component name.");
    process.exit(1);
}

const destination = path.resolve(root, output);

const templates = {
    navbar: {
        [`${name}.tsx`]: `'use client';

import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

const links = ["Explore", "Stays", "Experiences"];

export default function ${name}() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="fixed inset-x-0 top-0 z-10 border-b bg-white shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
                <a href="/" className="text-xl font-bold text-rose-500">
                    Your brand
                </a>
                <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
                    {links.map((link) => (
                        <a key={link} href="#" className="text-sm font-semibold hover:text-rose-500">
                            {link}
                        </a>
                    ))}
                </nav>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        aria-label="Search"
                        className="rounded-full border p-3 hover:shadow-md"
                    >
                        <BiSearch />
                    </button>
                    <button
                        type="button"
                        aria-expanded={menuOpen}
                        aria-label="Open user menu"
                        onClick={() => setMenuOpen((open) => !open)}
                        className="flex items-center gap-2 rounded-full border px-3 py-2 hover:shadow-md"
                    >
                        <AiOutlineMenu />
                        <span className="hidden text-sm font-semibold sm:inline">Menu</span>
                    </button>
                </div>
            </div>
            {menuOpen && (
                <div className="absolute right-4 top-16 w-48 rounded-xl bg-white p-2 text-sm shadow-lg">
                    <a href="/login" className="block rounded-lg px-3 py-2 hover:bg-neutral-100">
                        Log in
                    </a>
                    <a href="/signup" className="block rounded-lg px-3 py-2 hover:bg-neutral-100">
                        Sign up
                    </a>
                </div>
            )}
        </header>
    );
}
`,
    },
    site: {
        [`${name}.tsx`]: `import ${name}Navbar from "./${name}Navbar";

export default function ${name}() {
    return (
        <>
            <${name}Navbar />
            <main className="min-h-screen bg-neutral-50 px-4 pb-16 pt-32">
                <section className="mx-auto max-w-5xl text-center">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
                        Welcome
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                        Build something people love.
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600">
                        Replace this content with your website introduction and primary call to action.
                    </p>
                    <a
                        href="#start"
                        className="mt-8 inline-block rounded-full bg-rose-500 px-6 py-3 font-semibold text-white hover:bg-rose-600"
                    >
                        Get started
                    </a>
                </section>
            </main>
        </>
    );
}
`,
        [`${name}Navbar.tsx`]: `'use client';

import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

export default function ${name}Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="fixed inset-x-0 top-0 z-10 border-b bg-white shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                <a href="/" className="text-xl font-bold text-rose-500">Your brand</a>
                <nav className="hidden gap-6 md:flex" aria-label="Main navigation">
                    <a href="#features" className="text-sm font-semibold hover:text-rose-500">Features</a>
                    <a href="#about" className="text-sm font-semibold hover:text-rose-500">About</a>
                    <a href="#contact" className="text-sm font-semibold hover:text-rose-500">Contact</a>
                </nav>
                <button
                    type="button"
                    aria-expanded={menuOpen}
                    aria-label="Toggle navigation menu"
                    onClick={() => setMenuOpen((open) => !open)}
                    className="rounded-full border p-3 md:hidden"
                >
                    <AiOutlineMenu />
                </button>
            </div>
            {menuOpen && (
                <nav className="flex flex-col gap-2 border-t px-4 py-3 md:hidden" aria-label="Mobile navigation">
                    <a href="#features" className="rounded-lg px-3 py-2 hover:bg-neutral-100">Features</a>
                    <a href="#about" className="rounded-lg px-3 py-2 hover:bg-neutral-100">About</a>
                    <a href="#contact" className="rounded-lg px-3 py-2 hover:bg-neutral-100">Contact</a>
                </nav>
            )}
        </header>
    );
}
`,
    },
};

const generatedFileNames = Object.keys(templates[type]);
const existingFiles = generatedFileNames.filter((fileName) =>
    fs.existsSync(path.join(destination, fileName)),
);

if (!hasFlag("force") && existingFiles.length > 0) {
    console.error(
        `Error: ${existingFiles.join(", ")} already exist. Choose another --output or use --force.`,
    );
    process.exit(1);
}

fs.mkdirSync(destination, { recursive: true });

for (const [fileName, content] of Object.entries(templates[type])) {
    fs.writeFileSync(path.join(destination, fileName), content, "utf8");
}

console.log(`Generated ${type} in ${path.relative(root, destination)}`);
