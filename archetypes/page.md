---
title: "{{ replace .TranslationBaseName "-" " " | title }}"
date: {{ .Date }}
url: "/{{ .TranslationBaseName}}/"
upperHeading: ""
menu:
  main:
    identifier: "{{ .TranslationBaseName }}"
    name: "{{ replace .TranslationBaseName "-" " " | title }}"
    url: "/{{ .TranslationBaseName }}/"
    weight: 100
---

