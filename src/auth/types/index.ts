export type TokenPayload = {
  sub: string;
  iat: number;
  jti: string;
  exp?: number;
  // iss(issuer) : 발급자. 애플리케이션에서 임의로 정의한 문자열 또는 URI 형식
  // aud(audience) : 수신자. 주로 보호된 리소스의 URL을 값으로 설정
  // nbf(not before) : 정의된 시간 이후에 토큰이 활성화됨. UNIX Epoch 시간을 사용
};
