export const ALLOWED_EXTENSIONS = [
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".json",
    ".md",
    ".css",
    ".html",
    ".py",
    ".java",
    ".cpp",
    ".c",
];
export const IMPORTANT_FILES = [
    "package.json",
    "next.config",
    "middleware",
    "app/",
    "pages/",
    "components/",
    "src/",
    "lib/",
    "utils/",
    "actions/",
    "api/",
    "server/",
];

export const IGNORE_PATHS = [
    "node_modules",
    ".next",
    "dist",
    "build",
    ".git",
    "coverage",
    "public/",
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    ".png",
    ".jpg",
    ".jpeg",
    ".svg",
    ".webp",
    ".mp4",
    ".mov",
];

export function isUsefulFile(path) {

    const isIgnored = IGNORE_PATHS.some((item) =>
        path.includes(item)
    );

    const hasAllowedExtension = ALLOWED_EXTENSIONS.some((ext) =>
        path.endsWith(ext)
    );

    const isImportant = IMPORTANT_FILES.some((item) =>
        path.includes(item)
    );

    return !isIgnored && hasAllowedExtension && isImportant;
}