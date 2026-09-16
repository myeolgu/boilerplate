#!/usr/bin/env bash
# UserPromptSubmit hook: 사용자가 프롬프트에 "검수"라는 단어를 포함해 보내면
# npm run checkstyle / checkhtml을 실행하고 결과를 모델 컨텍스트에 주입한다.
# 그 외 프롬프트는 그대로 통과시킨다(exit 0, 추가 동작 없음).
# jq가 이 환경에 없어서 JSON 파싱/생성은 전부 node로 처리한다.

input="$(cat)"

prompt=$(printf '%s' "$input" | node -e '
let d = "";
process.stdin.on("data", (c) => (d += c));
process.stdin.on("end", () => {
  try {
    const j = JSON.parse(d);
    process.stdout.write(j.prompt || "");
  } catch (e) {}
});
')

case "$prompt" in
  *검수*) ;;
  *) exit 0 ;;
esac

tmp_style=$(mktemp)
tmp_html=$(mktemp)
npm run checkstyle >"$tmp_style" 2>&1
npm run checkhtml >"$tmp_html" 2>&1

node -e '
const fs = require("fs");
// eslint-disable-next-line no-control-regex
const stripAnsi = (s) => s.replace(/\x1b\[[0-9;]*m/g, "");
const cap = (s, n) => (s.length > n ? "...(생략)...\n" + s.slice(-n) : s);
const style = cap(stripAnsi(fs.readFileSync(process.argv[1], "utf8")), 4000);
const html = cap(stripAnsi(fs.readFileSync(process.argv[2], "utf8")), 4000);
const ctx =
  "### npm run checkstyle 결과\n" + style +
  "\n\n### npm run checkhtml 결과\n" + html + "\n";
console.log(
  JSON.stringify({
    hookSpecificOutput: { hookEventName: "UserPromptSubmit", additionalContext: ctx },
  })
);
' "$tmp_style" "$tmp_html"

rm -f "$tmp_style" "$tmp_html"
