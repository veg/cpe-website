# CPE Website

This is the official website for the Computational Phylogenetics and Evolution (CPE) group.

## Table of Contents

- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Building for Production](#building-for-production)
- [Adding Content](#adding-content)
  - [Publications](#publications)
  - [Members](#members)
  - [News Articles](#news-articles)
  - [Software Items](#software-items)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Directory Structure

Here's an overview of the key directories in this project:

- `content/`: Contains all the Markdown files for dynamic content (publications, members, news, software).
  - `content/members/`: Markdown files for individual team members.
  - `content/news/`: Markdown files for news articles.
  - `content/publications/`: Markdown files for research publications.
  - `content/software/`: Markdown files for software projects.
- `data/`: Stores static data, such as CSV files.
- `public/`: Static assets like images, fonts, and other files served directly.
- `scripts/`: Utility scripts for various tasks (e.g., `check_yaml.py`).
- `src/app/`: Next.js application pages and routing.
  - `src/app/mission/`: Mission statement page.
  - `src/app/news/`: News listing and individual news article pages.
  - `src/app/publications/`: Publications listing and individual publication pages.
  - `src/app/software/`: Software listing and individual software project pages.
  - `src/app/team/`: Team members listing page.
- `src/components/`: Reusable React components.
- `src/lib/`: Utility functions and content processing logic (e.g., `content.ts` for Markdown parsing).

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/veg/cpe-website.git
    cd cpe-website
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Development Server

To run the development server with hot-reloading:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

This will create an optimized build in the `.next` directory.

## Adding Content

All dynamic content for the website is managed through Markdown files located in the `content/` directory. Each content type has its own subdirectory.

### Publications

To add a new publication:

1.  Create a new Markdown file in `content/publications/` (e.g., `new-publication-title.md`). The filename will be used as the slug for the URL.
2.  Add front matter (YAML) at the top of the file, followed by the content. Ensure the `year` field is present for sorting.

    Example `content/publications/your-publication.md`:
    ```markdown
    ---
    title: "Your Publication Title Here"
    authors: "Author One, Author Two, Author Three"
    journal: "Journal Name"
    year: "2023"
    pmid: "12345678" # Optional
    doi: "10.1000/xyz123" # Optional
    url: "https://example.com/your-publication" # Optional
    team_members: ['member-slug-1', 'member-slug-2'] # Optional: slugs of team members involved
    keywords: ['keyword1', 'keyword2'] # Optional
    ---
    This is the abstract or full content of your publication.
    ```

### Members

To add a new team member:

1.  Create a new Markdown file in `content/members/` (e.g., `john-doe.md`). The filename will be used as the slug for the URL.
2.  Add front matter (YAML) at the top of the file, followed by the member's bio or description.

    Example `content/members/your-member.md`:
    ```markdown
    ---
    name: "Your Name"
    role: "Graduate Student"
    image: "/images/your-member.jpg" # Path to member's image in public/images/
    email: "your.email@example.com" # Optional
    github: "your-github-username" # Optional
    linkedin: "your-linkedin-username" # Optional
    twitter: "your-twitter-username" # Optional
    ---
    A brief biography or description of the team member.
    ```

### News Articles

To add a new news article:

1.  Create a new Markdown file in `content/news/` (e.g., `exciting-news-event.md`). The filename will be used as the slug for the URL.
2.  Add front matter (YAML) at the top of the file, followed by the news content.

    Example `content/news/your-news.md`:
    ```markdown
    ---
    title: "Exciting News Event"
    date: "YYYY-MM-DD" # Date of the news article
    author: "News Editor" # Optional
    ---
    The full content of your news article goes here.
    ```

### Software Items

To add a new software project:

1.  Create a new Markdown file in `content/software/` (e.g., `my-awesome-tool.md`). The filename will be used as the slug for the URL.
2.  Add front matter (YAML) at the top of the file, followed by the software description.

    Example `content/software/your-software.md`:
    ```markdown
    ---
    title: "My Awesome Software Tool"
    description: "A brief description of the software."
    github: "your-github-repo" # Optional: GitHub repository link
    website: "https://example.com/software" # Optional: Official website link
    ---
    Detailed information about the software, features, usage, etc.
    ```

## Deployment

This project is designed to be easily deployed on [Vercel](https://vercel.com/). Simply connect your GitHub repository to Vercel, and it will automatically detect the Next.js framework and deploy your application.

**Vercel Deployment:** [Your Vercel Deployment URL Here] (Please replace this with the actual URL after successful deployment.)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.