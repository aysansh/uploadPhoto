import { Button, CircularProgress, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { formContext } from "../../context/FormContext";
import UploadButtons from "./UploadButton";
import { useTranslation } from "react-i18next";

const FormBox = () => {
  const { t } = useTranslation();
  const { createData, editedData, updateData } = useContext(formContext);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [id, setId] = useState<string | number | undefined>(editedData?.id);
  const [myImage, setMyImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    if (editedData) {
      setTitle(editedData.title);
      setDescription(editedData.description);
      setImageUrl(editedData.image);
      setId(editedData.id);
    }
  }, [editedData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMyImage(e.target.files[0]);
    }
  };

  const uploadImage = async (data: FormData) => {
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dzgbpps0q/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const resData = await response.json();
      return resData.secure_url;
    } catch (error) {
      alert("Image upload failed");
      setUploading(false);
      throw error;
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string | number | undefined
  ) => {
    e.preventDefault();
    setUploading(true);

    const data = new FormData(e.target as HTMLFormElement);
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    data.append("file", myImage as Blob);
    data.append("upload_preset", "advertisement");

    let uploadedImageUrl = "";
    if (myImage) {
      uploadedImageUrl = await uploadImage(data);
      setImageUrl(uploadedImageUrl);
    }

    const allFormData = { title, description, image: uploadedImageUrl };
    if (id === undefined) {
      createData(allFormData);
    } else {
      updateData(id, allFormData);
      setId(undefined);
    }

    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setUploading(false);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, id)}>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        name="title"
        label={t("title")}
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        name="description"
        label={t("description")}
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        required
      />
      <UploadButtons handleImageChange={handleImageChange} t={t} />
      <br />

      {uploading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Button
          sx={{
            width: "100%",
            backgroundColor: "black",
            color: "white",
            marginTop: "10px",
            ":hover": { backgroundColor: "rgba(0,0,0,0.7) !important " },
          }}
          variant="contained"
          type="submit"
          disabled={uploading}
        >
          {t("Create")}
        </Button>
      )}
    </form>
  );
};

export default FormBox;
