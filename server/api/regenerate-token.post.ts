export default defineEventHandler(async () => {
  // Generate a new mock API token (replace with real auth/DB when backend is ready)
  const prefix = "pk_live_";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 64;
  let token = prefix;
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return { token };
});
