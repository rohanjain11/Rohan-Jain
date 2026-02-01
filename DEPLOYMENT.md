# GitHub Pages Deployment Guide

## Step 1: Install gh-pages (if not already installed)
```bash
npm install --save-dev gh-pages
```

## Step 2: Set up Git Remote
```bash
git remote add origin https://github.com/rohanjain11/Rohan-Jain.git
```

## Step 3: Add and Commit All Files
```bash
git add .
git commit -m "Initial commit: Portfolio website"
```

## Step 4: Push to GitHub
```bash
git branch -M main
git push -u origin main
```

## Step 5: Deploy to GitHub Pages
```bash
npm run deploy
```

This will:
1. Build your project (`npm run build`)
2. Deploy the `dist` folder to the `gh-pages` branch
3. Make your site available at: `https://rohanjain11.github.io/Rohan-Jain/`

## Step 6: Enable GitHub Pages (if needed)
1. Go to your repository on GitHub: https://github.com/rohanjain11/Rohan-Jain
2. Click on **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Select **gh-pages** branch and **/ (root)** folder
5. Click **Save**

## Future Updates
After making changes to your portfolio:
```bash
git add .
git commit -m "Update portfolio"
git push
npm run deploy
```

Your site will be live at: **https://rohanjain11.github.io/Rohan-Jain/**
