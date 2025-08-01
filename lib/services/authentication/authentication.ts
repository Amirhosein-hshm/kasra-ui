/*/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * FastAPI
 * OpenAPI spec version: 0.1.0
 */
import type {
  BodyLoginTokenPost,
  RefreshTokenRefreshTokenPostParams,
  Token,
  UserInfoResponse,
} from '../../types';

import { api } from '../../axios/mutator';

export const getAuthenticaton = () => {
  /**
   * @summary Login
   */
  const loginTokenPost = (bodyLoginTokenPost: BodyLoginTokenPost) => {
    const formUrlEncoded = new URLSearchParams();
    if (
      bodyLoginTokenPost.grantType !== undefined &&
      bodyLoginTokenPost.grantType !== null
    ) {
      formUrlEncoded.append(`grant_type`, bodyLoginTokenPost.grantType);
    }
    formUrlEncoded.append(`username`, bodyLoginTokenPost.username);
    formUrlEncoded.append(`password`, bodyLoginTokenPost.password);
    if (bodyLoginTokenPost.scope !== undefined) {
      formUrlEncoded.append(`scope`, bodyLoginTokenPost.scope);
    }
    if (
      bodyLoginTokenPost.clientId !== undefined &&
      bodyLoginTokenPost.clientId !== null
    ) {
      formUrlEncoded.append(`client_id`, bodyLoginTokenPost.clientId);
    }
    if (
      bodyLoginTokenPost.clientSecret !== undefined &&
      bodyLoginTokenPost.clientSecret !== null
    ) {
      formUrlEncoded.append(`client_secret`, bodyLoginTokenPost.clientSecret);
    }

    return api<Token>({
      url: `/token`,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: formUrlEncoded,
    });
  };
  /**
   * @summary Refresh Token
   */
  const refreshTokenRefreshTokenPost = (
    params: RefreshTokenRefreshTokenPostParams
  ) => {
    return api<Token>({ url: `/refresh-token`, method: 'POST', params });
  };
  /**
   * @summary Read Users Me
   */
  const readUsersMeUsersMeGet = () => {
    return api<UserInfoResponse>({ url: `/users/me`, method: 'GET' });
  };
  return {
    loginTokenPost,
    refreshTokenRefreshTokenPost,
    readUsersMeUsersMeGet,
  };
};
export type LoginTokenPostResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getAuthenticaton>['loginTokenPost']>>
>;
export type RefreshTokenRefreshTokenPostResult = NonNullable<
  Awaited<
    ReturnType<
      ReturnType<typeof getAuthenticaton>['refreshTokenRefreshTokenPost']
    >
  >
>;
export type ReadUsersMeUsersMeGetResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getAuthenticaton>['readUsersMeUsersMeGet']>
  >
>;
