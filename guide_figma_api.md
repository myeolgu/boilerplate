# Figma API JSON Extraction Guide

이 문서는 Figma API를 통해 디자인 데이터를 추출하고, 불필요한 속성을 제거하여 경량화된 JSON 파일로 변환하는 자동화 파이프라인 사용법을 설명합니다.

## 1. 개요 (Overview)

디자인-개발 전달 과정에서 발생하는 "눈대중 코딩"을 방지하고, LLM이나 자동화 도구가 이해하기 쉬운 **구조화된 데이터(JSON)**를 제공하는 것이 목적입니다.

- **입력:** `src/guide/cl.csv` 파일의 `Figma URL` 컬럼
- **출력:** 각 HTML 파일과 동일한 경로/이름의 `.json` 파일 (예: `FO_Main.html` -> `FO_Main.json`)

## 2. 설정 (Setup)

### 2.1 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고, 본인의 Figma Personal Access Token을 입력하세요.
(토큰 발급: Figma > Settings > Account > Personal Access Tokens)

```bash
# .env file
FIGMA_TOKEN=your_figma_token_here
```

### 2.2 디펜던시 확인

이 스크립트는 Node.js 기본 모듈(`https`, `fs`, `path`, `readline`)만 사용하므로 별도 `npm install`이 필요 없습니다.

## 3. 사용 방법 (Usage)

### 3.1 코딩 리스트 엑셀/CSV 업데이트

`src/guide/cl.csv` 파일의 **Figma URL** 컬럼에 해당 화면의 Figma 링크를 입력합니다.

- **Link Format:** `https://www.figma.com/design/...?node-id=123-456&...`
- 특정 프레임만 정확히 선택해서 링크를 복사해주세요. (링크에 `node-id`가 포함되어야 합니다.)

### 3.2 스크립트 실행

터미널에서 아래 명령어를 실행합니다.

```bash
npm run figma:sync
```

(또는 `npm run getfigmadata`)

### 3.3 결과 확인

스크립트가 실행되면 CSV를 한 줄씩 읽어 Figma 데이터를 가져오고, HTML 파일이 위치한 폴더에 JSON 파일을 생성합니다.

```text
Processing: FO_Main.html...
  - Fetching node 123-456...
  - Optimized size: 120 KB (Removed 80% noise)
  - Saved: src/pages/Main/FO_Main.json
```
