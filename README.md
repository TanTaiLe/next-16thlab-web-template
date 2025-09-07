This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

# Bước 1:Tạo project Next.js + TypeScript + Tailwind với Yarn

## 1. Tạo project Next.js mới (TypeScript)

```bash
yarn create next-app next-16thlab-web-template --typescript --eslint
```

- `--typescript`: bật TypeScript ngay từ đầu
- `--eslint`: thêm ESLint config mặc định

## 2. Cài đặt Tailwind CSS (v3)

```bash
cd next-16thlab-web-template
yarn add -D tailwindcss@^3 postcss autoprefixer
npx tailwindcss init -p
```

- `@^3` v3 sẽ hỗ trợ được cả những trình duyệt cũ
- `-D`: cài đặt package vào devDependencies
- `postcss`: tiền xử lý CSS
- `autoprefixer`: tự động thêm prefix cho các thuộc tính CSS
- `-p`: tự động tạo ra 2 file `tailwind.config.js` và `postcss.config.js`

## 3. Cấu hình Tailwind v3

📌 Mở file `tailwind.config.js` → sửa nội dung:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## 4. Thêm CSS base của Tailwind

Mở `src/app/globals.css` (Next.js 13+) hoặc `styles/globals.css` (nếu `pages` router) → thêm:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Ở bước này thường `VSCode/IDE` sẽ báo `@tailwind` không nhận diện được - `Unknown at rule @tailwindcss(unknownAtRules)` (thực ra build vẫn chạy bình thường). Đây là lỗi từ `CSS IntelliSense` (của `PostCSS/VSCode`). Cách fix như sau 👇:

Trong thư mục gốc của project, tạo (hoặc mở) file:
`.vscode/settings.json` và thêm nội dung:

```json
{
  "css.validate": false,
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^'\"`]*)(?:'|\"|`)"],
    ["cva\\(([^)]*)\\)", "(?:'|\"|`)([^'\"`]*)(?:'|\"|`)"]
  ]
}
```

- `"css.validate": false` → tắt check CSS mặc định.
- Sau đó, VSCode sẽ dùng Tailwind IntelliSense extension để hiểu `@tailwind`.

Bên cạnh đó hãy đảm bảo rằng bạn đã cài extension `Tailwind CSS IntelliSense` (nếu chưa có).

# Bước 2: Setup ESLint + Prettier

## 1. Cài Prettier và plugin cần thiết

```bash
yarn add -D prettier eslint-config-prettier eslint-plugin-prettier

```

- `prettier`: định dạng code
- `eslint-config-prettier`: tắt các rule của ESLint xung đột với Prettier
- `eslint-plugin-prettier`: thêm rule Prettier vào ESLint

## 2. Tạo file cấu hình Prettier

📌 Tạo file `.prettierrc.json` ở root:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 100
}
```

- `semi: true`: luôn có dấu `;`
- `singleQuote: true`: dùng `' '` thay vì `" "`
- `trailingComma: es5`: thêm dấu `,` cuối object/array nếu cần
- `tabWidth: 2`: 2 space thay vì tab
- `printWidth: 100`: độ dài tối đa của một dòng code là 100 ký tự

## 3. Tạo file cấu hình ESLint

📌 Tạo file `.eslintrc.json` ở root:

```json
{
  "extends": ["next/core-web-vitals", "plugin:prettier/recommended"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "semi": true,
        "singleQuote": true,
        "trailingComma": "es5",
        "tabWidth": 2,
        "printWidth": 100
      }
    ]
  }
}
```

## 4. Thêm script vào package.json

📌 Trong file `package.json` ở root, thêm ở phần `scripts`:

```json
"scripts": {
  "lint": "next lint",
  "format": "prettier --write ."
}
```

- `yarn lint`: chạy ESLint
- `yarn format`: định dạng code bằng Prettier

## 5. Cấu hình VSCode

📌 Trong file `.vscode/settings.json` (tạo nếu chưa có), thêm:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

- `editor.defaultFormatter`: định dạng code mặc định là Prettier
- `editor.formatOnSave`: định dạng code khi lưu file

# Bước 3: Setup Supabase + Prisma ORM

## 1. Tạo project Supabase

Có 2 cách:

- Cloud (đơn giản nhất): vào https://supabase.com
  , đăng ký → tạo project Postgres miễn phí
- Local (nếu muốn chạy offline):

```bash
npx supabase init
supabase start
```

(Chạy bằng Docker)

📌 Sau khi có project, Supabase cung cấp cho bạn:

- `DB URL` (Postgres connection string) nằm ở `navigation bar` > button `Connect` nằm cạnh `main Production`
- `anon key` và `service_role key` (cho API auth) nằm ở `Project Settings` > `API Keys`

## 2. Cài Prisma & client Supabase

📌 Trong root:

```bash
yarn add @prisma/client
yarn add -D prisma
```

- `@prisma/client`: client Prisma
- `-D prisma`: CLI Prisma (chỉ cần trong dev)

## 3. Cấu hình Prisma

```bash
npx prisma init
```

- Tạo file `prisma/schema.prisma` (chứa cấu hình DB)
- Tạo file `.env` (chứa các biến môi trường) với biến `DATABASE_URL`

## 4. Kết nối Supabase với Prisma

Mở file .env và dán connection string của Supabase:

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"
```

Ví dụ: `postgresql://postgres:T@ntai1412#@db.cltzzjtyxcwyayiaqnhs.supabase.co:5432/postgres`

## 5. Khai báo schema với Prisma

Ví dụ bạn muốn có bảng `User`:

📂 prisma/schema.prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
```

## 6. Chạy migration & generate Prisma Client

```bash
npx prisma migrate dev --name init
```

👉 Prisma sẽ:

- Tạo bảng trong Supabase DB
- Sinh Prisma Client để bạn gọi trong code

## 7. Dùng Prisma trong Next.js

Tạo file helper 📂 `src/lib/prisma.ts`

```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

## 8. Tạo API route thử nghiệm

📂 `src/app/api/users/route.ts` (Next.js 13 App Router)

```ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
```

Sau đó chạy project:

```bash
yarn dev
```

Và truy cập API:

```bash
http://localhost:3000/api/users
```

👉 Ta sẽ thấy danh sách users trong DB (trống ban đầu)

✅ Vậy là bạn đã kết nối thành công Next.js ↔ Prisma ↔ Supabase 🎉

# Bước 4: Setup Jest + React Testing Library

## 1. Cài đặt dependency

```bash
yarn add -D jest @types/jest ts-jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- `jest` → test runner
- `ts-jest + @types/jest` → hỗ trợ TypeScript
- `jest-environment-jsdom` → giả lập DOM cho test React
- `@testing-library/react` → render & test component React
- `@testing-library/jest-dom` → matcher bổ sung (toBeInTheDocument, toHaveTextContent …)
- `@testing-library/user-event` → giả lập thao tác user (click, type, tab …)

## 2. Tạo file cấu hình Jest

Tạo file `jest.config.js` ở root:

```ts
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./", // thư mục root của Next.js app
});

const customJestConfig = {
  preset: "ts-jest",
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // alias @/ trỏ về thư mục gốc
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default createJestConfig(customJestConfig);
```

- `preset: 'ts-jest'`: dùng ts-jest để biên dịch TypeScript
- `moduleDirectories`: tìm module trong các thư mục này
- `testEnvironment: 'jest-environment-jsdom'`: giả lập DOM cho test React
- `moduleNameMapper`: alias `@/` trỏ về thư mục gốc
- `setupFilesAfterEnv`: chạy file setup Jest trước khi chạy test
- `moduleFileExtensions`: các đuôi file được phép

## 3. Tạo file setup Jest

Tạo file `jest.setup.ts` ở root:

```ts
import "@testing-library/jest-dom";
```

👉 Dùng để import matcher bổ sung cho Jest

## 4. Thêm script vào package.json

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "format": "prettier --write .",
  "test": "jest --watch"
}
```

## 5. Viết test đơn giản

📂 `components/Hello.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import React from "react";

function Hello() {
  return <h1>Hello 16thLab</h1>;
}

describe("Hello component", () => {
  it("renders correctly", () => {
    render(<Hello />);
    expect(screen.getByText("Hello 16thLab")).toBeInTheDocument();
  });
});
```

- `describe`: nhóm test
- `it`: 1 test case
- `render`: render component
- `screen`: truy cập DOM
- `expect`: viết test
- `getByText`: query DOM
- `toBeInTheDocument`: matcher bổ sung từ `@testing-library/jest-dom`

Sau đó chạy test:

```bash
yarn test
```

👉 Ta sẽ thấy test passed 🎉

VD cho 1 kết quả passed:

```bash
 PASS  components/Hello.test.tsx
  Hello component
    √ renders correctly (31 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.054 s
```

# Bước 5: Setup CI/CD với Vercel

- Mỗi lần push code → tự động chạy lint + test
- Nếu pass → Vercel sẽ deploy Preview/Production
- Nếu fail → chặn deploy

## 1. Deploy project lên Vercel

1. Push code lên GitHub/GitLab/Bitbucket (Vercel hỗ trợ cả 3).
2. Vào https://vercel.com, login bằng GitHub (hoặc GitLab).
3. Ở phần `Import Git Repository` tiến hành chọn project repositories mà bạn cần (có thể chọn tất cả hoặc chỉ định 1 vài repo).
4. Sau khi chọn bạn sẽ thấy project vừa thêm vào và Vercel sẽ tự detect project là Next.js, bấm `Import`.
5. Ở mục `Environment Variables` → thêm Key và Value cho `DATABASE_URL` (chuỗi Supabase đã encode).
6. Bấm `Deploy` → Vercel sẽ build và deploy lần đầu.

Đối với lần đầu deply, ta sẽ gặp lỗi:

```bash
Collecting page data ...Error: @prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.
...
> Build error occurred [Error: Failed to collect page data for /api/users] { type: 'Error' }
```

Lỗi này xuất phát từ `Prisma client` chưa được generate nên Next.js không import được `@prisma/client`. Giải pháp xử lý:

```bash
yarn prisma generate
```

Điều này sẽ tạo thư mục `.prisma` và cập nhật `node_modules/@prisma/client` dựa trên `schema.prisma`.

Cập nhật lại file `app/api/users/route.ts`, bạn chắc chắn phải import Prisma client từ thư viện:

```ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}
```

Và deploy lại lần nữa.

## 2. Tích hợp lint + test vào pipeline CI/CD của Vercel

### ⚡ Cách 1: Dùng Vercel’s "Build Command" (đơn giản nhất)

1. Vào Settings → Build and Development.
2. Sửa Build Command từ:

```bash
next build
```

thành:

```bash
yarn lint && yarn test && next build
```

👉 Nếu lint/test fail → build fail → Vercel không deploy.

### ⚡ Cách 2: Dùng GitHub Actions (chuyên nghiệp hơn)

Nếu muốn chạy lint/test trước cả khi Vercel build, bạn tạo CI workflow trong repo:
📂 `.github/workflows/ci.yml`

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: "yarn"

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Run lint
        run: yarn lint

      - name: Run tests
        run: yarn test --ci --watchAll=false
```

👉 Lợi ích:

- Khi bạn tạo Pull Request → GitHub sẽ chạy CI.
- Chỉ khi pass CI → mới merge vào main.
- Vercel sau đó deploy code đã được kiểm chứng.

## 3. Kết quả CI/CD

- Push lên nhánh feature: Vercel auto deploy Preview (dùng để QA/PM review).
- Merge vào main: Vercel auto deploy Production.
- Fail lint/test: Deploy bị chặn.
