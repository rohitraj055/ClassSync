type AuthErrorShape = {
  name: string;
  code?: string;
};

export function isInvalidRefreshTokenError(error: AuthErrorShape): boolean {
  return (
    error.name === "AuthApiError" &&
    (error.code === "refresh_token_not_found" ||
      error.code === "refresh_token_already_used")
  );
}
