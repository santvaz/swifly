export const getProjectListByUserId = async (userId: string) => {
  const response = await fetch(
    `https://www.swifly.app/api/project-list/${userId}`
  );
  const data = await response.json();
  return data;
};
