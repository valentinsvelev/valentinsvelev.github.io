---
layout: post
title: "Evaluating an Agentic AI Application 1/2: Summarizing my Experience Integrating DeepEval with Arize Phoenix at Codify"
date: 2025-10-03
description: How can you make sure that your AI agents' output is truthful and faithful to your query? This is what inspired our journey integrating the evaluation platform DeepEval with the LLM trace platform Arize Phoenix. In this blog post, I will present the challenges I faced in this journey and how I solved them.
tags: llm agentic-ai software
related_posts: false
---

**Note**: This article was published on Codify AG's website. Check it out [here](https://www.codify.ch/post/evaluating-ai-agents-with-deepeval-and-arize-phoenix-lessons-from-our-integration-journey).

### What this Blog Post is About
Today, AI agents are everywhere. One of the biggest challenges in the new era of MLOps isn't just building an innovative agentic AI tool; it's proving that it actually works, consistently and reliably. How do you measure “helpfulness”? How do you track down the root cause of (subtle) hallucinations? Standard ML metrics like precision, recall, and accuracy or NLP metrics like BLEU, MAUVE, and BERTScore simply don't cut it. And what about tracking an agent's actions and thoughts? How can those be evaluated? At present, these questions constitute some of the most critical considerations in the evaluation of LLM and agent outputs. After experimenting with different frameworks, we decided on [DeepEval](https://deepeval.com/docs/getting-started) for our evaluation pipeline and [Arize Phoenix](https://phoenix.arize.com/) for collecting and analyzing the traces of our agents.

### Why DeepEval and Arize Phoenix?
DeepEval is an open-source platform designed for evaluating LLMs and agents using what are known as “LLM-as-a-judge” metrics. This technique leverages state-of-the-art LLMs to assess the quality of an AI application's output. The core idea is that since these powerful models were trained with Reinforcement Learning from Human Feedback (RLHF), their judgment often aligns well with human evaluation (see [Zheng et al., 2023](https://proceedings.neurips.cc/paper_files/paper/2023/hash/91f18a1287b398d378ef22505bf41832-Abstract-Datasets_and_Benchmarks.html)). We decided to use DeepEval over alternative platforms such as RAGAs or Arize Phoenix's built-in evaluation tools because of its ease-of-use, customizability, and versatility.

Arize Phoenix is an open-source platform for collecting and analyzing traces in an AI application. It provides the observability layer we need to understand the inner workings of our agent, from its initial thoughts to its final actions.

### Our Integration Journey: What We Found
While both frameworks work well on their own, making them work in tandem presented several challenges:

* **Challenges with custom metrics in DeepEval:** While DeepEval is versatile, we encountered some difficulties when fine-tuning our custom evaluation metrics. Creating nuanced, domain-specific metrics that accurately captured the performance of our agent required a significant amount of trial and error. An example is the high sensitivity to semantic and syntactic choices for the judge's prompt.

* **Difficulties with the integration of DeepEval and Arize Phoenix:** The primary hurdle was integrating DeepEval metrics with Arize Phoenix to run and log our evaluation experiments. This proved difficult because the available documentation did not provide sufficient guidance on configuring Arize Phoenix for custom AI applications. More specifically, one of the biggest challenges is running an experiment with our custom DeepEval metrics. Evaluators are functions that are applied to each data point and specified in the “evaluators” argument in “run_experiment()”. While Arize Phoenix's documentation provides a simple example for how to define a custom metric, it is not helpful for DeepEval metrics. After scouring the documentation and the source code, we found that the solution was to use the decorator “@create_evaluator”.

* **Running an experiment in Arize Phoenix with “run_experiment()”:** Adapting this method to our required set-up is a key problem to be solved. Some of the most time-consuming challenges are:

* **The “dataset” argument:** Running an evaluation with “run_experiment()” in Arize Phoenix requires uploading a dataset and then downloading it again. This is because you cannot use a local dataset, such as a DataFrame in your environment, to run an evaluation. You need a Dataset object instead, which you obtain by downloading a previously uploaded dataset. This “two-step dance” felt unintuitive, especially for large(r) datasets and multiple concurrent experiment runs.

* **The “task” argument:** If your dataset already includes the LLM or agent responses, you must use a workaround for the task argument by specifying a dummy task that simply returns the response. This is because the “task” argument cannot be empty.

* **Data accessibility issues in Arize Phoenix:** A major workflow challenge we discovered is that you cannot easily access the results of a previously run experiment. To analyze our evaluation results, we had to manually query the underlying database and combine the data ourselves. This was again not easy as there is very little documentation for how the database is structured.

* **A plethora of outdated documentation for Arize Phoenix:** As mentioned previously, one recurring frustration was Arize Phoenix's documentation. When searching for guidance on Arize Phoenix or its integrations, we often stumbled upon outdated blog posts, GitHub issues, or old versions of docs. This meant we were frequently cross-referencing multiple sources and testing configurations by hand just to figure out what worked with the current release.

* **Parallelization pitfalls in Arize Phoenix:** We also ran into challenges when trying to scale up evaluation runs. Arize Phoenix provides concurrency controls, but in practice we found subtle differences in behavior between synchronous and asynchronous execution. For instance, when running evaluations asynchronously with the “concurrency” argument in “run_experiment()”, we had to set it to 1 because otherwise it would return an error.

* **Running an experiment from our web app:** After setting up the experiment locally, we needed to get it running in Docker. This required setting the PHOENIX_HOST environment variable to enable the connection, which was undocumented and something we only discovered by inspecting the source code. We also encountered persistent timeout issues: even with a high timeout value configured (“timeout” argument in “run_experiment()”), the evaluation would start, complete, and then restart in an infinite loop, repeatedly showing the message “Worker timeout, requeuing.”

### Final Thoughts
Overall, both DeepEval and Arize Phoenix are powerful tools that fill critical gaps in the agent evaluation workflow. DeepEval helps us move beyond traditional metrics by using LLMs as evaluators, while Phoenix gives us the observability we need to diagnose failures and trace agent reasoning. But integrating the two is still an early-stage effort; it requires patience, manual workarounds, and a willingness to dive into undocumented behavior.

If you're considering adopting these tools together, our advice is to budget extra time for debugging, expect to build custom patches, and don't be afraid to get your hands dirty in the source code.