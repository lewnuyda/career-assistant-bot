export const getOrCreateSessionId = (key = "career_chat_session_id") => {
  const existingId = localStorage.getItem(key);
  if (existingId) return existingId;

  const newId = crypto.randomUUID();
  localStorage.setItem(key, newId);
  return newId;
};
