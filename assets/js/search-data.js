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
        },{id: "nav-projects",
          title: "projects",
          description: "Here is a collection of projects I am currently working on. If you are interested in any of them, feel free to reach out!",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "post-evaluating-an-agentic-ai-application-2-3-what-research-and-our-experience-taught-us-about-llm-as-a-judge",
        
          title: "Evaluating an Agentic AI Application 2/3: What Research and Our Experience Taught Us...",
        
        description: "An LLM judge is a measurement instrument, not an oracle. Research shows that judges carry systematic bias, that the judge prompt is part of the instrument, and that confident verdicts can flip under pressure. Here is what we changed in our own evaluation approach as a result.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/llm-as-a-judge/";
          
        },
      },{id: "post-evaluating-an-agentic-ai-application-1-3-summarizing-my-experience-integrating-deepeval-with-arize-phoenix-at-codify",
        
          title: "Evaluating an Agentic AI Application 1/3: Summarizing my Experience Integrating DeepEval with Arize...",
        
        description: "How can you make sure that your AI agents&#39; output is truthful and faithful to your query? This is what inspired our journey integrating the evaluation platform DeepEval with the LLM trace platform Arize Phoenix. In this blog post, I will present the challenges I faced in this journey and how I solved them.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/agentic-ai-eval/";
          
        },
      },{id: "post-a-brief-introduction-to-some-of-the-math-behind-the-transformer",
        
          title: "A Brief Introduction to (some of) the Math Behind the Transformer",
        
        description: "The Transformer architecture, introduced in 2017 by Google, is the basis for every state-of-the-art generative AI model today. Understanding (some of) the math behind it is essential for understanding the Transformer itself and today&#39;s generative AI models.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/transformer/";
          
        },
      },{id: "post-a-brief-introduction-to-natural-language-generation-nlg",
        
          title: "A Brief Introduction to Natural Language Generation (NLG)",
        
        description: "Natural language generation (NLG), i.e., the generation of text using language models and their causal language modeling capabilities, is not as black box as people make it out to be. In fact, a user can control many parameters. (Note that it is still basically like magic and that me and others are just trying our best)",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/nlg/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-i-published-my-very-first-paper-in-the-international-journal-for-public-opinion-research-check-it-out-here",
          title: 'I published my very first paper in the International Journal for Public Opinion...',
          description: "",
          section: "News",},{id: "news-i-published-my-first-software-package-in-cran-gglyph-a-tool-for-visualizing-directed-pairwise-relationships-check-it-out-here",
          title: 'I published my first software package in CRAN, gglyph, a tool for visualizing...',
          description: "",
          section: "News",},{id: "news-i-got-my-first-cs-paper-accepted-to-eurovis-2026-that-is-a-very-nice-birthday-present-indeed-check-it-out-here",
          title: 'I got my first CS paper accepted to EuroVis 2026! That is a...',
          description: "",
          section: "News",},{id: "news-together-with-my-supervisor-andreas-spitz-i-published-a-version-of-my-master-s-thesis-on-the-evaluation-of-document-retrieval-models-on-arxiv-check-it-out-here",
          title: 'Together with my supervisor, Andreas Spitz, I published a version of my master’s...',
          description: "",
          section: "News",},{id: "projects-aira-amp-8212-a-local-retrieval-augmented-ai-research-assistant",
          title: 'AIRA &amp;amp;#8212; A local retrieval-augmented AI Research Assistant',
          description: "A web application for an SLM-based research assistant for academic research. Implementing current SOTA in industry and academia.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-llm-internals-lab",
          title: 'LLM Internals Lab',
          description: "A web app for interactively teaching core aspects of NLP and language modeling.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-promptfolio-amp-8212-a-collaborative-prompt-portfolio",
          title: 'PromptFolio &amp;amp;#8212; A collaborative Prompt portFolio',
          description: "A web application for a managing a collaborative portfolio of prompts.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
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
