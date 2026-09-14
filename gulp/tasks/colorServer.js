import { spawn, exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { __dirname } from '../config/paths.js';

let colorServerProcess = null;

/**
 * 컬러 서버 실행 태스크
 * 관리 도구를 위한 서버를 백그라운드에서 실행합니다.
 */
const colorServer = () => {
  // 이미 실행 중인 프로세스가 있으면 종료
  if (colorServerProcess) {
    colorServerProcess.kill();
    colorServerProcess = null;
    console.log('기존 컬러 서버를 종료했습니다.');
  }

  // 외부에서 실행 중인 컬러 서버 프로세스 종료 (포트 3000 사용 중인 프로세스)
  try {
    const isWindows = process.platform === 'win32';
    const killCommand = isWindows
      ? 'FOR /F "tokens=5" %P IN (\'netstat -ano ^| findstr :3000\') DO taskkill /F /PID %P'
      : "pkill -f 'node.*managers/color_server.js'";

    exec(killCommand, (error, stdout, stderr) => {
      if (error) {
        // 프로세스가 없는 경우 오류가 발생할 수 있으므로 무시 (로그 출력 안 함)
      } else {
        console.log('외부 컬러 서버 프로세스를 종료했습니다.');
      }

      // 프로세스 종료 후 새로운 서버 시작
      startColorServer();
    });
  } catch (error) {
    console.error('외부 프로세스 종료 중 오류 발생:', error);
    // 오류가 발생해도 서버 시작 시도
    startColorServer();
  }
};

/**
 * 컬러 서버 시작 함수
 */
function startColorServer() {
  // 컬러 서버 스크립트 경로
  const colorServerPath = path.resolve(
    __dirname,
    '../../src/guide/assets/scripts/managers/color_server.js'
  );

  // 서버 실행
  colorServerProcess = spawn('node', [colorServerPath], {
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: false,
  });

  // 표준 출력 처리
  colorServerProcess.stdout.on('data', (data) => {
    console.log(`컬러 서버: ${data.toString().trim()}`);
  });

  // 오류 출력 처리
  colorServerProcess.stderr.on('data', (data) => {
    console.error(`컬러 서버 오류: ${data.toString().trim()}`);
  });

  // 프로세스 종료 처리
  colorServerProcess.on('close', (code) => {
    if (code !== 0 && code !== null) {
      console.log(`컬러 서버가 코드 ${code}로 종료되었습니다.`);
    }
    colorServerProcess = null;
  });

  console.log('컬러 서버가 시작되었습니다. (포트: 3000)');

  // 프로세스 종료 시 컬러 서버도 함께 종료
  process.on('exit', () => {
    if (colorServerProcess) {
      colorServerProcess.kill();
    }
  });
}

export { colorServer };
