// projectService.ts
export const getProjectById = async (projectId: string) => {
  const response = await fetch(`/api/projects/${projectId}`);
  if (!response.ok) {
    throw new Error(`Error fetching project: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

export const updateProjectById = async (
  projectId: string,
  title: string,
  description: string
) => {
  const response = await fetch(`/api/projects/${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });
  if (!response.ok) {
    throw new Error(`Error updating project: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};
