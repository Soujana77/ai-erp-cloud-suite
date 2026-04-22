function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function useAuth() {
  const token = localStorage.getItem("token");
  
  const user = token ? parseJwt(token) : null;

  return {
    token,
    user,
    isAdmin: user?.role_id === 1,
    isManager: user?.role_id === 2,
    isEmployee: user?.role_id === 3,
    canCreate: user?.role_id === 1 || user?.role_id === 2,
    canDelete: user?.role_id === 1,
    canEdit: true,
  };
}

export default useAuth;