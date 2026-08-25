export const BLOG_POSTS = [
  {
    id: 1,
    title: "Building Scalable REST APIs with Node.js and Express",
    slug: "building-scalable-rest-apis-node-express",
    excerpt:
      "A practical guide to structuring Node.js APIs with controllers, services, validation, authentication, and clean architecture.",
    category: "Backend",
    tags: ["Node.js", "Express", "REST API"],
    publishedAt: "2026-08-18",
    readTime: "8 min read",
    featured: true,

    cover:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80",

    content: [
      {
        type: "paragraph",
        text: "Building a backend that works is relatively easy. Building one that remains easy to understand and maintain as the application grows is a different challenge. A good API needs clear boundaries between routing, business logic, data access, validation, and authentication.",
      },

      {
        type: "heading",
        text: "Why structure matters",
      },

      {
        type: "paragraph",
        text: "When everything lives inside route handlers, even a small application can quickly become difficult to maintain. Controllers become large, database queries get mixed with business logic, and making changes becomes increasingly risky.",
      },

      {
        type: "paragraph",
        text: "A better approach is to separate responsibilities. Routes should describe endpoints, controllers should handle HTTP concerns, and services should contain the actual application logic.",
      },

      {
        type: "heading",
        text: "A simple backend architecture",
      },

      {
        type: "paragraph",
        text: "A practical Express application can be divided into routes, controllers, services, validation, middleware, and database layers. Each layer has a focused responsibility and can evolve independently.",
      },

      {
        type: "code",
        language: "typescript",
        code: `export const getUser = async (
  req: Request,
  res: Response
) => {
  const user = await userService.getUser(req.params.id);

  return res.status(200).json({
    success: true,
    user,
  });
};`,
      },

      {
        type: "heading",
        text: "Keep controllers thin",
      },

      {
        type: "paragraph",
        text: "Controllers should not contain complicated business logic. Their main responsibility is to receive the request, call the appropriate service, and return the response.",
      },

      {
        type: "heading",
        text: "Final thoughts",
      },

      {
        type: "paragraph",
        text: "A clean architecture does not mean adding unnecessary complexity. The goal is simply to create boundaries that make the code easier to understand, test, and change as the project grows.",
      },
    ],
  },

  {
    id: 2,
    title: "Understanding TypeScript Generics Without the Confusion",
    slug: "typescript-generics-without-confusion",
    excerpt:
      "Learn how TypeScript generics work and how to use them to build reusable and type-safe functions.",
    category: "JavaScript",
    tags: ["TypeScript", "JavaScript"],
    publishedAt: "2026-08-14",
    readTime: "6 min read",
    featured: false,

    cover:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1600&q=80",

    content: [
      {
        type: "paragraph",
        text: "Generics are one of the most useful features in TypeScript. They allow us to write reusable code while still preserving type information.",
      },

      {
        type: "heading",
        text: "What are generics?",
      },

      {
        type: "paragraph",
        text: "Instead of creating a function that only works with one specific type, generics allow us to create functions that can work with many types while remaining completely type safe.",
      },

      {
        type: "code",
        language: "typescript",
        code: `function identity<T>(value: T): T {
  return value;
}

const name = identity("Nikhil");
const age = identity(22);`,
      },

      {
        type: "heading",
        text: "When should you use them?",
      },

      {
        type: "paragraph",
        text: "Generics are especially useful when building reusable utilities, API response types, data structures, and shared components.",
      },
    ],
  },

  {
    id: 3,
    title: "Prisma + PostgreSQL: A Clean Backend Architecture",
    slug: "prisma-postgresql-clean-backend",
    excerpt:
      "How to organize Prisma, PostgreSQL, services, controllers, and validation in a production-ready Express application.",
    category: "Backend",
    tags: ["Prisma", "PostgreSQL", "Express"],
    publishedAt: "2026-08-10",
    readTime: "9 min read",
    featured: false,

    cover:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",

    content: [
      {
        type: "paragraph",
        text: "Prisma provides a powerful developer experience when working with PostgreSQL. But the ORM itself is only one part of creating a maintainable backend.",
      },

      {
        type: "heading",
        text: "Separating database logic",
      },

      {
        type: "paragraph",
        text: "Keeping database operations isolated from controllers makes the application easier to test and makes future changes to the data layer much simpler.",
      },

      {
        type: "heading",
        text: "The service layer",
      },

      {
        type: "paragraph",
        text: "Services provide a natural place for business logic. Controllers can remain focused on HTTP while services handle application-level operations.",
      },
    ],
  },
];
