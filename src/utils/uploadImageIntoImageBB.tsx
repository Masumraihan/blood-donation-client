const uploadIntoImageBB = async (formData: FormData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    const icon = await response.json();
    return icon;
  } catch (error) {
    console.log(error);
  }
};

export default uploadIntoImageBB;
