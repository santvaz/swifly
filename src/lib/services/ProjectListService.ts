export const getProjectListByUserId = async (userId: string) => {
  const response = await fetch(
    `https://swifly-app-git-deploy-santvazs-projects.vercel.app/api/project-list/${userId}`
  );
  const data = await response.json();
  return data;
};
