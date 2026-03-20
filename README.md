# Research report (Vite + React)

## Deploy to Render (share with your team)

Render needs your code on **GitHub** (or GitLab/Bitbucket), then it builds and hosts the site.

### 1) Put this folder on GitHub

**Important:** This repo should contain **only** the contents of the `report-site` folder (so `package.json` is at the **root** of the repo). Do **not** commit `node_modules` or `dist` (they are in `.gitignore`).

**Option A — GitHub website (no Git installed on your PC)**

1. Go to [github.com](https://github.com) → **New repository** → create it (e.g. `createai-research-report`).
2. **Add file → Upload files**.
3. Upload everything inside `report-site` **except**:
   - `node_modules` (skip this folder entirely)
   - `dist` (optional; Render will rebuild it)
4. Commit to the `main` branch.

**Option B — Git in Cursor / terminal**

```bash
cd report-site
git init
git add .
git commit -m "Initial commit"
```

Create an empty repo on GitHub, then follow GitHub’s instructions to add `origin` and `git push -u origin main`.

### 2) Create a Static Site on Render

1. Sign in at [render.com](https://render.com).
2. **New +** → **Static Site**.
3. **Connect** your GitHub account and select the repository.
4. Use these settings:

| Setting | Value |
|--------|--------|
| **Branch** | `main` (or your default branch) |
| **Root directory** | *(leave empty)* — only if your app lives in a subfolder of the repo |
| **Build command** | `npm install && npm run build` |
| **Publish directory** | `dist` |

5. Click **Create Static Site**. After the build finishes, Render shows a URL like `https://createai-research-report.onrender.com` — share that with your team.

### 3) If you use the Blueprint file

This repo includes `render.yaml`. In Render you can choose **New → Blueprint**, connect the repo, and apply the blueprint — or create the Static Site manually with the table above (same result).

### Local development

```bash
npm install
npm run dev
```

### Build locally

```bash
npm run build
npm run preview
```
