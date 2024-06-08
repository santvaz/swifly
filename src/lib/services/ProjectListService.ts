export const getProjectListByUserId = async (userId: string) => {
  const response = await fetch(
    `http://localhost:4321/api/project-list/${userId}`
  );

  if (!response.ok) {
    throw new Error(`Error fetching project list: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(data);
  return data;
};
