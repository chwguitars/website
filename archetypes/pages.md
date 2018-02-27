---
title: "{{ replace .TranslationBaseName "-" " " | title }}"
upperHeading: 
date: {{ .Date }}
url: "/{{ .TranslationBaseName}}/"
menu:
  main:
    identifier: "{{ .TranslationBaseName }}"
    name: "{{ replace .TranslationBaseName "-" " " | title }}"
    url: "/{{ .TranslationBaseName }}/"
    weight: 100
---

