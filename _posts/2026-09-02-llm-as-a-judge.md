---
layout: post
title: "Evaluating an Agentic AI Application 2/3: What Research and Our Experience Taught Us About LLM-as-a-Judge"
date: 2026-09-02
description: An LLM judge is a measurement instrument, not an oracle. Research shows that judges carry systematic bias, that the judge prompt is part of the instrument, and that confident verdicts can flip under pressure. Here is what we changed in our own evaluation approach as a result.
tags: llm agentic-ai evaluation
related_posts: false
---

> **Evaluating an Agentic AI Application Series:**
> * **Part 1:** [Summarizing my Experience Integrating DeepEval with Arize Phoenix at Codify](/blog/2025/agentic-ai-eval/)
> * **Part 2:** What Research and Our Experience Taught Us About LLM-as-a-Judge *(This post)*
> * **Part 3:** [Coming Soon: Summarizing my Experience Evaluating Conversations at Codify](/post/2026-XX-XX-agentic-ai-conv-eval)

**Note**: This article was published on Codify's website. Check it out [here](https://www.codify.ch/post/evaluating-the-evaluator-llm-as-a-judge).

### Introduction
In our previous post on evaluating AI agents with DeepEval and Arize Phoenix, we mentioned one issue that kept showing up while building custom LLM-as-a-judge metrics: the result could be surprisingly sensitive to semantic and syntactic choices in the judge prompt.

That observation led us to a more fundamental question: **if an LLM is the evaluator, how do we evaluate the evaluator?**

We went back to the research and compared its findings with what we had seen in our own evaluation runs. Prompt sensitivity is only one part of the picture. Studies show that LLM judges can be influenced by answer position and response style, disagree with their own scalar scores when asked to compare two answers directly, struggle on reasoning-heavy tasks, and even change verdicts when challenged ([7](#ref-7), [8](#ref-8), [9](#ref-9), [10](#ref-10)).

None of this means LLM-as-a-judge is a bad idea. We still think it fills an important gap between rigid automated metrics and expensive human evaluation. But it changes how we use it: an LLM judge should be treated as a measurement instrument. Before trusting the number it produces, we need to understand, calibrate, and monitor the instrument.

### Why LLM-as-a-Judge Is Still Useful
Traditional metrics such as BLEU, ROUGE, and embedding-based similarity scores work well when quality can be reduced to overlap with a reference. That assumption breaks down for open-ended generation, multi-turn conversations, and agentic workflows, where two very different answers can both be good and a superficially similar answer can still be wrong ([2](#ref-2)).

Human evaluation remains the closest thing to a gold standard, but it is too slow and expensive to run across every model change, prompt revision, or pull request. LLM-as-a-judge sits between the two: a capable model evaluates an output against a rubric and produces a score, label, or preference that can be automated at scale ([1](#ref-1), [10](#ref-10)).

The useful question, then, is not whether an LLM judge is perfectly objective. It is whether its errors are understood well enough that the signal remains useful for the decision we want to make.

### Where LLM Judges Can Go Wrong
1. **Bias Is Systematic, Not Just Random**  
    LLM judges exhibit recurring behavioral biases. They may favor the response shown in a particular position, prefer longer or more polished answers, score outputs from the same model family more generously, or be swayed by authoritative-looking citations and URLs even when those references are fabricated ([8](#ref-8), [10](#ref-10)).

    The important point is that these effects are not constant. Position bias, for example, varies substantially across judges and tasks, and recent work suggests its magnitude also depends on how close the competing answers are in quality ([6](#ref-6)). That makes a single benchmark score a poor guarantee that a judge will be unbiased in your own setting.

2. **The Judge Prompt Is Part of the Measurement Instrument**  
    A judge does not evaluate a response in a vacuum. It evaluates the response through the instructions, criteria, score labels, examples, and reference material we put into its prompt. Meaning-preserving changes to that prompt can shift the distribution of scores even when the outputs being evaluated do not change ([4](#ref-4)). More broadly, prompt-formatting changes have produced very large accuracy swings in language-model evaluations, which is a useful warning against treating prompt wording as an implementation detail ([5](#ref-5)).

    This is the failure mode that most clearly matched our own experience. While tuning custom metrics, we found that swapping a single evaluative adjective in a rubric – for example, “accurate” for “correct” or “concise” for “brief” – could move the mean score across a fixed test set. The criterion sounded equivalent to us; the measurement was not.

    For us, that changed the role of prompt engineering. A judge prompt is not just an instruction that should “work.” It is part of the evaluation definition and needs to be versioned and tested accordingly.

3. **A Score and a Preference Can Contradict Each Other**  
    Coarse scalar scores hide uncertainty. A judge may give response A a 4 and response B a 3, then prefer B when the same two answers are compared directly. TrustJudge describes this as a score-comparison conflict and also documents non-transitive pairwise preferences such as A > B, B > C, and C > A ([7](#ref-7)).

    This matters whenever we use small score differences to rank models or decide whether a release is “better.” A change from 3.9 to 4.2 looks precise, but the judge may not actually support that ordering consistently.

4. **Plausible Reasoning Can Fool the Evaluator**  
    Reasoning-heavy tasks are another weak point. On mathematics, code, and multi-step logic, a judge can be persuaded by a plausible explanation and reproduce the candidate’s reasoning error instead of detecting it. Providing a reference answer or worked solution substantially improves judgment in these settings because the evaluator no longer has to solve the task and assess the candidate from scratch at the same time ([10](#ref-10)).

5. **A Confident Verdict May Still Be Fragile**  
    A recent line of work looks not only at whether a judge is correct, but at how strongly it holds its verdict. Zhao et al. ([9](#ref-9)) show that frontier models can reverse judgments when challenged, especially when an adaptive model changes its persuasion strategy from turn to turn. On the deliberately borderline items used in their experiments, a single scripted challenge produced substantial flip rates, while adaptive persuasion pushed them much higher.

    What makes this operationally relevant is the direction of those changes. Across the labelled conditions in the study, a majority of pressure-induced flips moved away from the ground-truth label rather than toward it. A judge that reconsiders under challenge is usually not correcting itself; it is being talked out of a verdict that was right.

### What We Changed in Our Evaluation Approach
The research contains many mitigation techniques, but they do not all buy the same thing. Some improve consistency, some improve correctness, and some mainly expose uncertainty. We therefore start with the low-cost controls that make the evaluation definition measurable before reaching for more expensive judge architectures.

1. **Start With Human Agreement**  
    Before optimizing a judge, first check whether it is measuring the quality bar you actually care about. That requires a human-labelled set built against the same rubric the judge will use.

    * Build a labelled baseline. As a practical starting point, 100-200 representative examples are usually enough to reveal major rubric problems and obvious judge-human disagreement. Treat this as an engineering starting point, not a universal sample-size rule.
    * Measure agreement, not only correlation. For categorical decisions, Cohen’s kappa is useful; for graded scores, weighted kappa or Krippendorff’s alpha may be more appropriate. Spearman correlation can look perfect even when a judge is systematically shifted above or below the human scores.
    * Treat thresholds as diagnostics, not certification. A kappa around 0.6 can be a useful warning line in practice, but the acceptable level depends on the task, class balance, consequences of errors, and uncertainty of the estimate.
    * Recalibrate after meaningful changes. A new rubric, judge model, prompt version, or task distribution can invalidate the agreement you measured earlier.

    The highest-leverage improvement is often not a stronger model but a narrower rubric. Holistic labels such as “helpfulness” force the judge to infer how competing qualities should be traded off. Decomposing that concept makes both the judge and the disagreement easier to interpret.

    > **Before:** “Rate the helpfulness of this response from 1 to 5.”

    > **After:** Score three checks independently: (1) Does the response answer the question that was actually asked? (2) Is every factual claim supported by the provided context? (3) Does it avoid unsafe instructions?

    A decomposed rubric does not automatically make the judge correct, but when it disagrees with a human, it tells us which criterion is failing instead of hiding the disagreement inside one opaque number.

2. **Version and Stress-Test the Judge Prompt**  
    Because the prompt is part of the instrument, it belongs under the same version control as the rest of the evaluation suite. Pin the judge model version where possible, store the exact system and rubric prompts, and treat model upgrades as evaluation changes rather than infrastructure changes.

    Before locking a rubric, we recommend running the labelled set through a few meaning-preserving variants: reorder the criteria, rephrase evaluative adjectives, or relabel score levels. If the headline result moves materially, report that sensitivity instead of selecting whichever wording produced the preferred number ([4](#ref-4), [5](#ref-5)).

    For an additional mechanical stability check, Zhao et al. ([9](#ref-9)) perturb otherwise identical judging prompts with irrelevant random content at temperature zero. We see this as a useful diagnostic rather than a quality metric: it can reveal raw prompt fragility, but a stable response to noise does not prove that the underlying judgment is correct.

3. **Remove Avoidable Structural and Identity Bias**  
    * Swap positions in pairwise evaluations. Evaluate A vs. B and B vs. A. If the result changes, treat the pair as unresolved rather than pretending one ordering is definitive. Position swapping roughly doubles the judge calls, but it is one of the simplest ways to expose presentation bias ([10](#ref-10)).
    * Hide irrelevant identity signals. Remove model names, assistant names, institutional branding, and other metadata that is not part of the criterion being tested. If citations are not under evaluation, do not let impressive-looking references become an accidental quality signal ([8](#ref-8)).
    * Avoid self-judging where practical. Research documents self-enhancement and preference leakage, including preferences toward related model families or models connected through training data ([3](#ref-3), [8](#ref-8)). Using a different evaluator does not guarantee neutrality, but it reduces one obvious source of dependence. If the same model must generate and judge, validate that setup explicitly against humans.

4. **Give the Judge a Reference When Correctness Is Knowable**  
    For math, code, logic, extraction, and other tasks where a known-good solution exists, include it. Reference-guided judging reduces the chance that the evaluator simply follows a persuasive but incorrect chain of reasoning ([10](#ref-10)).

    This also leads to a broader rule: if the property can be checked deterministically, do not ask an LLM to approximate the check. Use the judge for the subjective middle of the evaluation suite, not for facts your code can measure exactly.

5. **Treat Close Calls as Close Calls**  
    An evaluation pipeline often forces a winner even when the evidence is weak. That creates false precision. TrustJudge shows that consistency improves when small score or probability gaps are allowed to remain tied instead of being converted into arbitrary preferences ([7](#ref-7)).

    If your judge API exposes suitable token-level probabilities, distribution-sensitive scoring can go further: score on a wider scale, normalize the probability mass across score tokens, and use an expected value instead of a single argmax score. Bidirectional probability aggregation can also combine both presentation orders in pairwise judging ([7](#ref-7)).

    When token probabilities are unavailable, repeated sampling and averaging can be a useful engineering approximation, but we would label it as such rather than present it as equivalent to probability-based scoring. The goal is not to manufacture more decimals; it is to make uncertainty visible.

6. **Escalate Ambiguous and High-Stakes Cases**  
    A multi-model jury can be useful not only because several judges may outperform one, but because disagreement itself carries information. Zhao et al. ([9](#ref-9)) find that baseline jury agreement is a strong predictor of which items later prove unstable under pressure. In practice, low-consensus items are good candidates for human review: the problem may be the judge, but it may also be that the underlying example is genuinely hard to label.

    For decisions with real downstream consequences, we would rather route a small ambiguous slice to humans than hide uncertainty behind a single automated score.

### Advanced Techniques: Useful, but Not the Starting Point
There are more sophisticated ways to spend additional evaluator compute. Best-of-N reasoning, tree-search approaches, and other inference-time strategies can improve judge performance on difficult tasks, but they multiply cost and latency ([2](#ref-2)). Likewise, multi-model juries can make evaluations more robust while increasing operational complexity.

Large comparative evaluations also benefit from better ranking structures. Exhaustive pairwise comparison grows quadratically with the number of candidates. Tournament or merge-style schemes reduce the number of comparisons, while evaluating every candidate against a fixed baseline can reduce the problem to linear cost at the price of a coarser ranking ([2](#ref-2)).

These techniques are valuable when a decision genuinely depends on a fine ranking. They are not where we would start. A sophisticated judge architecture cannot rescue a vague rubric or an evaluator that has never been checked against human judgment.

### Know When Not to Use an LLM Judge
An LLM judge is most useful for qualities that are graded, contextual, or subjective. It is the wrong tool when the answer can be computed directly. We would keep the following checks outside the judge whenever possible:

* JSON validity, schema conformance, and required-field presence
* Exact match, regular-expression checks, and numeric tolerance against a known answer
* Latency, token count, cost, and other directly measurable properties
* Any narrow rule that can be expressed reliably in code without semantic interpretation

Every deterministic check moved out of the judge is one less metric that can drift when a model version or prompt changes.

### Final Thoughts
Our first experience with LLM-as-a-judge was practical: custom evaluation metrics were powerful, but surprisingly sensitive to how we expressed the criteria. The research helped us understand that this was not an isolated prompt-engineering annoyance. It was one example of a broader measurement problem.

The most important safeguards are also the least glamorous: define the rubric with humans, decompose vague criteria, version the judge prompt and model, remove avoidable bias, provide reference answers when correctness is knowable, and keep deterministic checks deterministic. More advanced techniques are useful once those foundations are in place.

Most of these safeguards buy consistency rather than truth. A judge can become very reliable at applying the wrong definition of quality. Human agreement therefore remains the anchor: the goal is not to build an evaluator that never changes its mind, but a measurement instrument whose relationship to human judgment we can test, monitor, and improve.

### References
1. <a id="ref-1"></a>Gu, J., Jiang, X., Shi, Z., et al. (2026). A survey on LLM-as-a-judge. The Innovation, 7(6), 101253. [https://doi.org/10.1016/j.xinn.2025.101253](https://doi.org/10.1016/j.xinn.2025.101253)
2. <a id="ref-2"></a>Li, D., Jiang, B., Huang, L., et al. (2025). From Generation to Judgment: Opportunities and Challenges of LLM-as-a-judge. Proceedings of EMNLP 2025, 2757–2791. [https://doi.org/10.18653/v1/2025.emnlp-main.138](https://doi.org/10.18653/v1/2025.emnlp-main.138)
3. <a id="ref-3"></a>Li, D., Sun, R., Huang, Y., et al. (2026). Preference Leakage: A Contamination Problem in LLM-as-a-judge. Proceedings of ICLR 2026. [https://openreview.net/forum?id=grIvSXVJ65](https://openreview.net/forum?id=grIvSXVJ65)
4. <a id="ref-4"></a>Li, Q., Dou, S., Shao, K., Chen, C., & Hu, X. (2025). Evaluating Scoring Bias in LLM-as-a-Judge. Proceedings of DASFAA 2026. [https://doi.org/10.1007/978-981-92-0372-7_2](https://doi.org/10.1007/978-981-92-0372-7_2)
5. <a id="ref-5"></a>Sclar, M., Choi, Y., Tsvetkov, Y., & Suhr, A. (2024). Quantifying Language Models’ Sensitivity to Spurious Features in Prompt Design or: How I learned to start worrying about prompt formatting. Proceedings of ICLR 2024. [https://openreview.net/forum?id=RIu5lyNXjT](https://openreview.net/forum?id=RIu5lyNXjT)
6. <a id="ref-6"></a>Shi, L., Ma, C., Liang, W., et al. (2025). Judging the Judges: A Systematic Study of Position Bias in LLM-as-a-Judge. Proceedings of IJCNLP-AACL 2025, 292–314. [https://doi.org/10.18653/v1/2025.ijcnlp-long.18](https://doi.org/10.18653/v1/2025.ijcnlp-long.18)
7. <a id="ref-7"></a>Wang, Y., Song, Y., Zhu, T., et al. (2026). TrustJudge: Inconsistencies of LLM-as-a-Judge and How to Alleviate Them. Proceedings of ICLR 2026. [https://openreview.net/forum?id=4uPyOCeN6U](https://openreview.net/forum?id=4uPyOCeN6U)
8. <a id="ref-8"></a>Ye, J., Wang, Y., Huang, Y., et al. (2025). Justice or Prejudice? Quantifying Biases in LLM-as-a-Judge. Proceedings of ICLR 2025. [https://openreview.net/forum?id=3GTtZFiajM](https://openreview.net/forum?id=3GTtZFiajM)
9. <a id="ref-9"></a>Zhao, J., Bhattacharjee, H., Korevaar, H., Radharapu, B., & El-Arini, K. (2026). Jagged Judges: Epistemic Stability Under Silence, Pressure, and Persistence. arXiv preprint arXiv:2608.12645. [https://doi.org/10.48550/arXiv.2608.12645](https://doi.org/10.48550/arXiv.2608.12645)
10. <a id="ref-10"></a>Zheng, L., Chiang, W.-L., Sheng, Y., et al. (2023). Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena. Advances in Neural Information Processing Systems (NeurIPS 2023), 36, 46595–46623. [https://openreview.net/forum?id=uccHPGDlao](https://openreview.net/forum?id=uccHPGDlao)