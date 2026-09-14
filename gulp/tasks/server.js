import { plugins } from '../config/plugins.js';
import { __dirname, isBuild, destFolder, srcFolder, projectPaths } from '../config/paths.js';
import { colorServer } from './colorServer.js';

const server = () => {
  // 컬러 서버 실행
  colorServer();

  plugins.browserSync.init({
    server: {
      baseDir: `${destFolder}`,
      // index: projectPaths.serverStart,
    },
    middleware: function (req, res, next) {
      if (req.url === '/') {
        res.writeHead(301, { Location: projectPaths.serverStart });
        res.end();
      }

      return next();
    },
    logLevel: 'info',
    cors: true,
    notify: false,
    port: 8888,
    logFileChanges: false,
    open: false,
    // browser: ["chrome"], // , 'firefox'
    // online: true, // online (Local Router)
    tunnel: false, // online (Internet)
    ui: false,
    logConnections: false,
    reloadOnRestart: false, // 이 옵션을 추가하면 깜빡임을 최소화할 수 있습니다.
    // codeSync: false,
    scrollProportionally: false,
    // injectChanges: false,
    ghostMode: false,
    // reloadDebounce: 2000, // 변경된 파일을 더 오래 기다리고 감지
    // files: [ // 감시할 파일 목록을 명시적으로 지정
    //     `${destFolder}/pathPagesMain/main.html`,
    // ],
  });
};

export { server };
