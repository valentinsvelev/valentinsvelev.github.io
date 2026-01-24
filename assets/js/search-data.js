// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "post-my-experience-with-publishing-an-r-package-on-cran",
        
          title: "My experience with publishing an R package on CRAN",
        
        description: "How to create an R package? How to publish the R package on The Comprehensive R Archive Network (CRAN)? How to avoid Hadley Wickham as a reviewer? Well, I actually cannot help with the latter, but I can give some insights for the first two questions.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/cran/";
          
        },
      },{id: "post-evaluating-an-agentic-ai-application-summarizing-my-experience-integrating-deepeval-with-arize-phoenix-at-codify",
        
          title: "Evaluating an Agentic AI application - Summarizing my experience integrating DeepEval with Arize...",
        
        description: "How can you make sure that your AI agents&#39; output is truthful and faithful to your query? This is what inspired our journey integrating the evaluation platform DeepEval with the LLM trace platform Arize Phoenix. In this blog post, I will present the challenges I faced in this journey and how I solved them.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/agentic-ai-eval/";
          
        },
      },{id: "post-a-brief-introduction-to-some-of-the-math-behind-the-transformer",
        
          title: "A brief introduction to (some of) the math behind the Transformer",
        
        description: "The Transformer architecture, introduced in 2017 by Google, is the basis for every state-of-the-art generative AI model today. Understanding (some of) the math behind it is essential for understanding the Transformer itself and today&#39;s generative AI models.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/transformer/";
          
        },
      },{id: "post-a-brief-introduction-to-natural-language-generation-nlg",
        
          title: "A brief introduction to natural language generation (NLG)",
        
        description: "Natural Language Generation (NLG), i.e., the generation of text using language models and their causal language modeling capabilities, is not as black box as people make it out to be. In fact, a user can control many parameters. (Note that it is still basically like magic and that me and others are just trying our best)",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/nlg/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-published-my-first-paper-in-the-international-journal-for-public-opinion-research-ijpor",
          title: 'Published my first paper in the International Journal for Public Opinion Research (IJPOR)....',
          description: "",
          section: "News",},{id: "news-submitted-my-first-two-cs-papers-to-eurovis-2026-and-sigir-2026",
          title: 'Submitted my first two CS papers to EuroVis 2026 and SIGIR 2026',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{id: "teachings-data-science-fundamentals",
          title: 'Data Science Fundamentals',
          description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/data-science-fundamentals/";
            },},{id: "teachings-introduction-to-machine-learning",
          title: 'Introduction to Machine Learning',
          description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/introduction-to-machine-learning/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%76%61%6C%65%6E%74%69%6E.%76%65%6C%65%76@%75%6E%69-%6B%6F%6E%73%74%61%6E%7A.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=aG4ypE8AAAAJ", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/valentinsvelev", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/velev_valentin", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
