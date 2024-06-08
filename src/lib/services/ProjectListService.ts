// export const getProjectListByUserId = async (userId: string) => {
//   const response = await fetch(
//     `https://swifly-app-git-deploy-santvazs-projects.vercel.app/api/project-list/${userId}`
//   );
//   const data = await response.json();
//   return data;
// };

// // ProjectListService.ts
// export const getProjectListByUserId = async (userId: string) => {
//   const response = await fetch(
//     `https://swifly-app-git-deploy-santvazs-projects.vercel.app/api/project-list/${userId}`
//   );
//   if (!response.ok) {
//     throw new Error(`Error fetching project list: ${response.statusText}`);
//   }
//   const data = await response.json();
//   return data;
// };
export const getProjectListByUserId = async (
  userId: string,
  userToken: string
) => {
  const response = await fetch(
    `https://swifly-app-git-deploy-santvazs-projects.vercel.app/api/project-list/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
  if (response.status === 401) {
    throw new Error("Unauthorized: Invalid or expired token");
  }
  if (!response.ok) {
    throw new Error(`Error fetching project list: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};
