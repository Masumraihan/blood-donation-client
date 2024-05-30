const uploadIntoImageBB = async (formData: FormData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_IMAGEBB_API_URL}`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default uploadIntoImageBB;
