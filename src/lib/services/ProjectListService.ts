// export const getProjectListByUserId = async (userId: string) => {
//   const response = await fetch(
//     `https://swifly-app-git-deploy-santvazs-projects.vercel.app/api/project-list/${userId}`
//   );
//   const data = await response.json();
//   return data;
// };

// ProjectListService.ts
export const getProjectListByUserId = async (userId: string) => {
  const response = await fetch(
    `https://swifly-app-git-deploy-santvazs-projects.vercel.app/api/project-list/${userId}`
  );
  if (!response.ok) {
    throw new Error(`Error fetching project list: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};
