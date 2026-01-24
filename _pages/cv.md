---
layout: page
permalink: /cv/
title: CV
nav: true
---

<style>
.cv-flags {
  display: flex;
  gap: 32px;
  justify-content: center;
  margin-top: 150px;
}

.cv-flag {
  display: inline-block;

  /* Force a proper flag shape */
  width: 120px !important;
  aspect-ratio: 4 / 3;
  height: auto !important;

  /* Override flag-icons sizing */
  line-height: 0 !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;

  /* Rounded “button” */
  border-radius: 12px;
  overflow: hidden;

  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

/* Hover + keyboard focus */
.cv-flag:hover,
.cv-flag:focus-visible {
  transform: scale(1.08);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
}
</style>

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/flag-icons@6.15.0/css/flag-icons.min.css"
/>

<div class="cv-flags">
  <a href="{{ '/assets/pdf/cv_english.pdf' | relative_url }}">
    <span class="cv-flag fi fi-gb"></span>
  </a>

  <a href="{{ '/assets/pdf/cv_german.pdf' | relative_url }}">
    <span class="cv-flag fi fi-de"></span>
  </a>
</div>
