import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";



export default function BasicCard({ title, amount }) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h4" component="div">
                    {title}
                </Typography>

                <Typography variant="h5">{amount} $</Typography>
            </CardContent>
        </Card>
    );
}
