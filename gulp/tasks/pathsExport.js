import gulp from 'gulp';
import fs from 'fs';
import path from 'path';
import { destFolder, projectReplacePaths } from '../config/paths.js';

// projectReplacePaths를 JSON 파일로 export하는 task
const pathsExport = (done) => {
  const outputPath = path.join(destFolder, 'guide/assets/scripts/paths-config.json');

  // 디렉토리가 없으면 생성
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // paths.js 기준에서 codinglist.html 기준 상대 경로로 변환
  // codinglist.html은 dist/guide/cl.html에 위치
  const pathsForCodingList = {};

  Object.keys(projectReplacePaths).forEach(key => {
    // dist/pages/main -> ../pages/main 형태로 변환
    pathsForCodingList[key] = '../' + projectReplacePaths[key];
  });

  // JSON 파일로 저장
  fs.writeFileSync(outputPath, JSON.stringify(pathsForCodingList, null, 2));

  console.log('✓ Path mappings exported to:', outputPath);
  done();
};

export { pathsExport };
