import {parser} from "lezer-jmespath"
import {continuedIndent, indentNodeProp, foldNodeProp, foldInside, LRLanguage, LanguageSupport} from "@codemirror/language"

/// A language provider that provides jmespath parsing.
export const jmespathLanguage = LRLanguage.define({
  name: "jmespath",
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        MultiSelectHash: continuedIndent({except: /^\s*\}/}),
        MultiSelectList: continuedIndent({except: /^\s*\]/})
      }),
      foldNodeProp.add({
        "MultiSelectHash MultiSelectList": foldInside
      })
    ]
  }),
  languageData: {
    closeBrackets: {brackets: ["[", "{", '"']},
    indentOnInput: /^\s*[\}\]]$/
  }
})

/// jmespath language support.
export function jmespath() {
  return new LanguageSupport(jmespathLanguage)
}

