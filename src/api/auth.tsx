export const makeAuthenticatedRequest = async (url) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // Handle the response
  } catch (error) {
    console.error(error);
  }
};
