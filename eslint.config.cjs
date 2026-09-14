module.exports = [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // 브라우저 내장 객체
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        navigator: 'readonly',
        location: 'readonly',
        requestAnimationFrame: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        Event: 'readonly',
        HTMLElement: 'readonly',
        NodeList: 'readonly',
        Element: 'readonly',
        Node: 'readonly',
        MutationObserver: 'readonly',

        // Node.js 환경
        process: 'readonly',

        // 프로젝트 전역 객체
        etUI: 'writable',

        // 외부 라이브러리
        gsap: 'readonly',
        Lenis: 'readonly',
        ScrollTrigger: 'readonly',
        SplitText: 'readonly',
        tabbable: 'readonly',
        Datepicker: 'readonly',
        DateRangePicker: 'readonly',
        lottie: 'readonly',
        Swiper: 'readonly',
        focusTrap: 'readonly',
      },
    },
    files: ['src/assets/scripts/**/*.js', 'src/assets/scripts/**/*.cjs'],
    ignores: [
      'src/assets/scripts/lib/**/*.js',  // 외부 라이브러리 제외
      'src/assets/scripts/lib/**/*.cjs',
      '**/index.cjs',  // 자동 생성되는 index.cjs 파일 제외
    ],
    rules: {
      // 코드 스타일
      indent: 'off',
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'only-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'arrow-parens': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'space-before-blocks': ['error', 'always'],
      'keyword-spacing': ['error', { before: true, after: true }],

      // 베스트 프랙티스
      'prefer-const': 'error',
      'no-var': 'error',
      'no-implicit-globals': 'error',
      'no-undef': 'error',
      'no-console': 'off',
      'no-debugger': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      curly: ['error', 'multi-line', 'consistent'],
      'no-alert': 'warn',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-param-reassign': ['warn', { props: false }],
      'prefer-arrow-callback': 'off',
      'prefer-template': 'warn',

      // 에러 방지
      'no-duplicate-imports': 'error',
      'no-unreachable': 'error',
      'no-unsafe-negation': 'error',
      'valid-typeof': 'error',
      'for-direction': 'error',
      'getter-return': 'error',
      'no-compare-neg-zero': 'error',
    },
  },
];
