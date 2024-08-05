import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { TFunction } from "i18next";

type CardBoxProps = {
  title?: string;
  description?: string;
  image?: string;
  t: TFunction;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
};

const CardBox: React.FC<CardBoxProps> = ({
  title,
  t,
  description,
  image,
  onClickEdit,
  onClickDelete,
}) => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
       
          width={"100%"}
          image={image || "/empty.jpg"}
          alt="image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Button
          onClick={onClickDelete}
          size="small"
          sx={{
            color: "black",
            textTransform: "capitalize",
            ":hover": { border: "1px solid #ababab" },
          }}
        >
          {t("delete")}
        </Button>
        <Button
          onClick={onClickEdit}
          size="small"
          sx={{
            color: "black",
            textTransform: "capitalize",
            ":hover": { border: "1px solid #ababab" },
          }}
        >
          {t("edit")}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardBox;
