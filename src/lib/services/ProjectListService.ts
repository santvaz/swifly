export const getProjectListByUserId = async (userId: string) => {
  const response = await fetch(
    `http://localhost:4321/api/project-list/${userId}`
  );
  const data = await response.json();
  return data;
};
