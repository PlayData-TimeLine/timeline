
export default () => ({
    port: parseInt(process.env.PORT, 10) || 4000,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      username: process.env.DATABASE_USERNAME || 'root',
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE
    }
  });

  // 일단 임시로 만듦. 작동은 안함. 객체로 받아가야하는데 상대가 프로바이더 속에 없으면 서비스를 임포트 할 수 없으므로 사용할 수 없음.